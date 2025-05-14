import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '55383078377-kpkl3r1n0qo8937ltrskk3ane2cvmoge.apps.googleusercontent.com';

const SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/gmail.modify'
].join(' ');

const useGmailAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [labels, setLabels] = useState([]);

  // Initialize gapi
 useEffect(() => {
  function start() {
    gapi.client.init({
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(() => {
      const googleAuth = gapi.auth2.getAuthInstance();
      if (googleAuth.isSignedIn.get()) {
        const googleUser = googleAuth.currentUser.get();
        const token = googleUser.getAuthResponse().access_token;
        setIsAuthenticated(true);
        setAccessToken(token);
        setUserProfile(googleUser.getBasicProfile());
        console.log("User already signed in:", googleUser);
      }

      // Optionally listen to auth changes
      googleAuth.isSignedIn.listen(isSignedIn => {
        setIsAuthenticated(isSignedIn);
        if (isSignedIn) {
          const googleUser = googleAuth.currentUser.get();
          const token = googleUser.getAuthResponse().access_token;
          setAccessToken(token);
          setUserProfile(googleUser.getBasicProfile());
        } else {
          setAccessToken(null);
          setUserProfile(null);
        }
      });
    });
  }

  gapi.load('client:auth2', start);
}, []);


  // Login Function
  const signIn = async () => {
    try {
      const googleAuth = gapi.auth2.getAuthInstance();
      const googleUser = await googleAuth.signIn();

      if (googleUser.isSignedIn()) {
        const token = googleUser.getAuthResponse().access_token;
        setIsAuthenticated(true);
        setAccessToken(token);
        setUserProfile(googleUser.getBasicProfile());
        console.log("Login successful:", googleUser);
      }
    } catch (error) {
      if (error.error === "popup_closed_by_user") {
        alert("Login popup closed. Please try again.");
      } else {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  // Logout Function
  const signOut = () => {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signOut().then(() => {
      setIsAuthenticated(false);
      setAccessToken(null);
      setUserProfile(null);
      console.log("User signed out.");
    });
  };
  
  // Fetch Inbox Messages Function
  const fetchInboxMessages = async (label = "INBOX") => {
    console.log("this message funtion is calling",label );
    console.log("label",label);
  try {
    if (!accessToken) {
      throw new Error("User not authenticated");
    }

    await gapi.client.load("gmail", "v1"); // Load Gmail API

    // List messages
    const response = await gapi.client.gmail.users.messages.list({
      userId: "me",
      labelIds:label,
      maxResults: 10,
    });

    const messages = response.result.messages;

    if (!messages || messages.length === 0) {
      console.log("No messages found.");
      return [];
    }

    // Fetch message details for each message
    const messageDetails = await Promise.all(
      messages.map(async (msg) => {
        const res = await gapi.client.gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "full",
        });

        const headers = res.result.payload.headers;

        const getHeader = (name) =>
          headers.find((h) => h.name === name)?.value || "";

        const from = getHeader("From");
        const to = getHeader("To");
        const subject = getHeader("Subject");
        const date = getHeader("Date");
        const snippet = res.result.snippet;
        const time = new Date(parseInt(res.result.internalDate)).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Decode plain text body if available
        let body = "";
        const parts = res.result.payload.parts;

        if (parts && parts.length) {
          const part = parts.find((p) => p.mimeType === "text/plain");
          if (part?.body?.data) {
            body = atob(part.body.data.replace(/-/g, "+").replace(/_/g, "/"));
          }
        } else if (res.result.payload.body?.data) {
          body = atob(res.result.payload.body.data.replace(/-/g, "+").replace(/_/g, "/"));
        }

        return { id: msg.id, from, to, subject, date, snippet, time, body };
      })
    );

    //console.log("Inbox messages:", messageDetails);
    return messageDetails;
  } catch (error) {
    console.error("Failed to fetch inbox messages:", error);
    throw error;
  }
};


const fetchLabels = async (accessToken) => {
    try {
      const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/labels", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setLabels(data.labels);
    } catch (err) {
      console.error("Error fetching labels:", err);
    }
  };

// ✅ Create Label Function
  const createLabel = async (labelName) => {
    try {
      if (!accessToken) throw new Error("User not authenticated");

      await gapi.client.load("gmail", "v1");

      const response = await gapi.client.gmail.users.labels.create({
        userId: 'me',
        resource: {
          name: labelName,
          labelListVisibility: "labelShow",
          messageListVisibility: "show"
        }
      });

      console.log("Label created successfully:", response);
      // Refresh label list after creation
      fetchLabels(accessToken);

    } catch (error) {
      console.error("Error creating label:", error);
      throw error;
    }
  };


  return {
    isAuthenticated,
    accessToken,
    userProfile,
    signIn,
    signOut,
    fetchInboxMessages,
    fetchLabels,
    labels,
    createLabel
  };
};

export default useGmailAuth;
