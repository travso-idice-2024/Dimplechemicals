import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setgmailAccessToken,
  setgmailisAuthenticated,
  clearAuth,
} from "../../redux/googleGmailAuthSlice";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";

const CLIENT_ID =
  "369846641543-at9qrr9at1c3mfg3rqpk1valfoq9rn2t.apps.googleusercontent.com";

const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.modify",
].join(" ");

const useGmailAuth = () => {
  const dispatch = useDispatch();
  const gmailAccessToken = useSelector(
    (state) => state.googleGmailAuth.gmailAccessToken
  );
  const gmailisAuthenticated = useSelector(
    (state) => state.googleGmailAuth.gmailisAuthenticated
  );

  const [userProfile, setUserProfile] = useState(null);
  const [labels, setLabels] = useState([]);

  const gmailTokenClientRef = useRef(null);

  // Initialize OAuth Token Client for Gmail
  const initializeGmailGis = () => {
    gmailTokenClientRef.current = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        if (tokenResponse.error) {
          console.error("Token Error:", tokenResponse);
          return;
        }

        const expiry = Date.now() + 60 * 60 * 1000;
        dispatch(
          setgmailAccessToken({ token: tokenResponse.access_token, expiry })
        );
        dispatch(setgmailisAuthenticated(true));
        localStorage.setItem("gmailAccessToken", tokenResponse.access_token);
        localStorage.setItem("gmailtokenExpiry", expiry);
        localStorage.setItem("gmailisAuthenticated", "true");

        fetchUserProfile(tokenResponse.access_token);
      },
    });
  };

  // Initialize once when Google SDK loads
  useEffect(() => {
    if (window.google && google.accounts && google.accounts.oauth2) {
      initializeGmailGis();
    } else {
      const interval = setInterval(() => {
        if (window.google && google.accounts && google.accounts.oauth2) {
          initializeGmailGis();
          clearInterval(interval);
        }
      }, 500);
    }
  }, []);

  // Load token from localStorage if present
  useEffect(() => {
    const storedToken = localStorage.getItem("gmailAccessToken");
    const isAuth = localStorage.getItem("gmailisAuthenticated");

    if (storedToken && isAuth === "true") {
      dispatch(
        setgmailAccessToken({
          token: storedToken,
          expiry: localStorage.getItem("gmailtokenExpiry"),
        })
      );
      dispatch(setgmailisAuthenticated(true));
      fetchUserProfile(storedToken);
    }
  }, []);

  // Token expiry auto-refresh
  useEffect(() => {
    if (!gmailAccessToken) return;

    const tokenExpiry = localStorage.getItem("gmailtokenExpiry");
    const remainingTime = tokenExpiry - Date.now();

    if (remainingTime <= 0) {
      if (gmailTokenClientRef.current) {
        console.log("Gmail token expired — requesting new one...");
        gmailTokenClientRef.current.requestAccessToken();
      }
    } else {
      const timer = setTimeout(() => {
        if (gmailTokenClientRef.current) {
          console.log("Gmail token about to expire — requesting new one...");
          gmailTokenClientRef.current.requestAccessToken();
        }
      }, remainingTime - 5000);

      return () => clearTimeout(timer);
    }
  }, [gmailAccessToken]);

  const fetchUserProfile = async (gmailAccessToken) => {
    //console.log("gmailAccessToken",gmailAccessToken);
    try {
      const response = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
          },
        }
      );

      const user = await response.json();
      setUserProfile(user);
      console.log("User Profile:", user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  // Login function using GIS
  const signIn = async () => {
    if (!gmailTokenClientRef.current) {
      initializeGmailGis();
    }

    gmailTokenClientRef.current.requestAccessToken();
  };

  // Logout function
  const signOut = () => {
    if (gmailAccessToken) {
      google.accounts.oauth2.revoke(gmailAccessToken, () => {
        dispatch(clearGmailAuth());
        localStorage.removeItem("gmailAccessToken");
        localStorage.removeItem("gmailtokenExpiry");
        localStorage.removeItem("gmailisAuthenticated");
      });
    }
  };

  // Fetch Inbox Messages Function
  // const fetchInboxMessages = async (label = "INBOX") => {
  //   try {
  //     if (!gmailAccessToken) {
  //       throw new Error("User not authenticated");
  //     }

  //     // Build query parameters
  //     const queryParams = new URLSearchParams({
  //       maxResults: "10",
  //     });

  //     if (label) {
  //       queryParams.append("labelIds", label);
  //     } else {
  //       queryParams.append("labelIds", "INBOX");
  //     }

  //     // Fetch the list of messages from Gmail
  //     const response = await fetch(
  //       `https://gmail.googleapis.com/gmail/v1/users/me/messages?${queryParams.toString()}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${gmailAccessToken}`,
  //         },
  //       }
  //     );

  //     const data = await response.json();
  //     const messages = data.messages || [];

  //     // Fetch message details for each message
  //     const messageDetails = await Promise.all(
  //       messages.map(async (msg) => {
  //         const messageResponse = await fetch(
  //           `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${gmailAccessToken}`,
  //             },
  //           }
  //         );

  //         const messageData = await messageResponse.json();
  //         const headers = messageData.payload.headers;

  //         // Extract necessary headers
  //         const getHeader = (name) =>
  //           headers.find((h) => h.name === name)?.value || "";

  //         const from = getHeader("From");
  //         const to = getHeader("To");
  //         const subject = getHeader("Subject");
  //         const date = getHeader("Date");
  //         const snippet = messageData.snippet;
  //         const time = new Date(
  //           parseInt(messageData.internalDate)
  //         ).toLocaleTimeString([], {
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         });

  //         // Decode plain text body if available
  //         let body = "";
  //         let attachments = [];
  //         const parts = messageData.payload.parts;

  //         if (parts && parts.length) {
  //           const part = parts.find((p) => p.mimeType === "text/plain");
  //           if (part?.body?.data) {
  //             body = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
  //           }

  //           // Attachments (images or files)
  //           if (part.filename && part.body?.attachmentId) {
  //             const attachmentResponse = await fetch(
  //               `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}/attachments/${part.body.attachmentId}`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${gmailAccessToken}`,
  //                 },
  //               }
  //             );

  //             const attachmentData = await attachmentResponse.json();
  //             const base64Data = attachmentData.data
  //               .replace(/-/g, "+")
  //               .replace(/_/g, "/");

  //             // For images, generate data URL
  //             if (part.mimeType.startsWith("image/")) {
  //               attachments.push({
  //                 filename: part.filename,
  //                 mimeType: part.mimeType,
  //                 dataUrl: `data:${part.mimeType};base64,${base64Data}`,
  //               });
  //             } else {
  //               attachments.push({
  //                 filename: part.filename,
  //                 mimeType: part.mimeType,
  //                 base64Data,
  //               });
  //             }
  //             // If nested parts
  //             if (part.parts && part.parts.length) {
  //               await processParts(part.parts);
  //             }
  //           }
  //         } else if (messageData.payload.body?.data) {
  //           body = atob(
  //             messageData.payload.body.data
  //               .replace(/-/g, "+")
  //               .replace(/_/g, "/")
  //           );
  //         }

  //         return {
  //           id: msg.id,
  //           from,
  //           to,
  //           subject,
  //           date,
  //           snippet,
  //           time,
  //           body,
  //           attachments,
  //         };
  //       })
  //     );

  //     //console.log("Inbox messages:", messageDetails);
  //     return messageDetails;
  //   } catch (error) {
  //     console.error("Failed to fetch inbox messages:", error);
  //     throw error;
  //   }
  // };


  const fetchInboxMessages = async (label = "INBOX") => {
    try {
      if (!gmailAccessToken) throw new Error("User not authenticated");
  
      const queryParams = new URLSearchParams({
        maxResults: "10",
        labelIds: label,
      });
  
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
          },
        }
      );
  
      const data = await response.json();
      const messages = data.messages || [];
  
      const messageDetails = await Promise.all(
        messages.map(async (msg) => {
          const messageResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
            {
              headers: {
                Authorization: `Bearer ${gmailAccessToken}`,
              },
            }
          );
  
          const messageData = await messageResponse.json();
          const headers = messageData.payload.headers;
  
          const getHeader = (name) =>
            headers.find((h) => h.name === name)?.value || "";
  
          const from = getHeader("From");
          const to = getHeader("To");
          const subject = getHeader("Subject");
          const date = getHeader("Date");
          const snippet = messageData.snippet;
          const time = new Date(
            parseInt(messageData.internalDate)
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
  
          // Decode plain text body
          let body = "";
          let attachments = [];
  
          const parts = messageData.payload.parts || [];
  
          for (let part of parts) {
            // Text body
            if (part.mimeType === "text/plain" && part.body?.data) {
              body = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
            }
  
            // Attachments
            if (part.filename && part.body?.attachmentId) {
              const attachmentResponse = await fetch(
                `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}/attachments/${part.body.attachmentId}`,
                {
                  headers: {
                    Authorization: `Bearer ${gmailAccessToken}`,
                  },
                }
              );
  
              const attachmentData = await attachmentResponse.json();
              const base64Data = attachmentData.data.replace(/-/g, "+").replace(/_/g, "/");
  
              const dataUrl = `data:${part.mimeType};base64,${base64Data}`;
  
              attachments.push({
                filename: part.filename,
                mimeType: part.mimeType,
                dataUrl,
              });
            }
          }
  
          // If message has no parts, check body.data directly
          if (!parts.length && messageData.payload.body?.data) {
            body = atob(
              messageData.payload.body.data.replace(/-/g, "+").replace(/_/g, "/")
            );
          }
  
          return { id: msg.id, from, to, subject, date, snippet, time, body, attachments };
        })
      );
  
      return messageDetails;
    } catch (error) {
      console.error("Failed to fetch inbox messages:", error);
      throw error;
    }
  };
  
  

  const fetchLabels = async () => {
    try {
      if (!gmailAccessToken) {
        throw new Error("User not authenticated");
      }

      const res = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/labels",
        {
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          console.warn("Token expired or unauthorized — requesting new one...");
          gmailTokenClientRef.current.requestAccessToken();
          return;
        }
        throw new Error(`Error fetching labels: ${res.status}`);
      }

      const data = await res.json();
      setLabels(data.labels); // Assuming `setLabels` is a state update function in your component
    } catch (err) {
      console.error("Error fetching labels:", err);
    }
  };

  // ✅ Create Label Function
  const createLabel = async (labelName) => {
    try {
      if (!gmailAccessToken) throw new Error("User not authenticated");

      const response = await fetch(
        "https://gmail.googleapis.com/gmail/v1/users/me/labels",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: labelName,
            labelListVisibility: "labelShow",
            messageListVisibility: "show",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create label");
      }

      const data = await response.json();
      console.log("Label created successfully:", data);

      // Refresh label list after creation
      fetchLabels();
    } catch (error) {
      console.error("Error creating label:", error);
      throw error;
    }
  };

  //get message details
  // const getMessageDetail = async (messageId) => {
  //   try {
  //     if (!gmailAccessToken) throw new Error("User not authenticated");

  //     const response = await fetch(
  //       `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${gmailAccessToken}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch message details");
  //     }

  //     const data = await response.json();
  //     console.log("message details", data);
  //     return data; // Return the message details
  //   } catch (error) {
  //     console.error("Error fetching message detail:", error);
  //     throw error;
  //   }
  // };

  const getMessageDetail = async (messageId) => {
    try {
      if (!gmailAccessToken) throw new Error("User not authenticated");
  
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch message details");
      }
  
      const data = await response.json();
  
      const attachments = [];
  
      const parts = data.payload.parts || [];
  
      // Process attachments
      for (const part of parts) {
        if (part.filename && part.body?.attachmentId) {
          const attachmentResponse = await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/attachments/${part.body.attachmentId}`,
            {
              headers: {
                Authorization: `Bearer ${gmailAccessToken}`,
              },
            }
          );
  
          if (!attachmentResponse.ok) {
            console.warn(
              `Failed to fetch attachment: ${part.filename}`,
              await attachmentResponse.text()
            );
            continue;
          }
  
          const attachmentData = await attachmentResponse.json();
          const base64Data = attachmentData.data.replace(/-/g, "+").replace(/_/g, "/");
  
          // Convert to Data URL for images
          if (part.mimeType.startsWith("image/")) {
            attachments.push({
              filename: part.filename,
              mimeType: part.mimeType,
              dataUrl: `data:${part.mimeType};base64,${base64Data}`,
            });
          } else {
            attachments.push({
              filename: part.filename,
              mimeType: part.mimeType,
              base64Data,
            });
          }
        }
      }
  
      // Attach attachments array to data
      data.attachments = attachments;
  
      return data;
    } catch (error) {
      console.error("Error fetching message detail:", error);
      throw error;
    }
  };
  

  //get message by sender

  const getMessagesBySender = async (gmailAccessToken, senderEmail) => {
    const query = `from:${senderEmail}`;
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(
      query
    )}&maxResults=10`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${gmailAccessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }

      const data = await response.json();
      console.log("Messages by sender:", data);
      return data.messages || [];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  };

  //applyLabelto message

  const applyLabelToMessage = async (gmailAccessToken, messageId, labelId) => {
    try {
      if (!gmailAccessToken) throw new Error("User not authenticated");

      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            addLabelIds: [labelId],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to apply label to message");
      }

      console.log("Label applied successfully");
    } catch (error) {
      console.error("Error applying label to message:", error);
      throw error;
    }
  };

  const handleRemoveLabel = async (labelId) => {
    try {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/labels/${labelId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedLabels = labels.filter((label) => label.id !== labelId);
      setLabels(updatedLabels);
      //alert("Label removed successfully!");
    } catch (error) {
      console.error("Error removing label:", error);
      //alert("Failed to remove label.");
    }
  };

  return {
    gmailisAuthenticated,
    gmailAccessToken,
    userProfile,
    signIn,
    signOut,
    fetchInboxMessages,
    fetchLabels,
    labels,
    createLabel,
    getMessageDetail,
    getMessagesBySender,
    applyLabelToMessage,
    handleRemoveLabel,
  };
};

export default useGmailAuth;
