import { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = "55383078377-kpkl3r1n0qo8937ltrskk3ane2cvmoge.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar";

const useGoogleCalendar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);

  // Load the Google API client
  const loadGoogleApi = async () => {
    try {
      await new Promise((resolve) => {
        gapi.load("client:auth2", resolve);
      });

      await gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      });

      const authInstance = gapi.auth2.getAuthInstance();
      setIsAuthenticated(authInstance.isSignedIn.get());
      authInstance.isSignedIn.listen(setIsAuthenticated);
    } catch (error) {
      console.error("Error initializing Google API:", error);
    }
  };

  useEffect(() => {
    loadGoogleApi();
  }, []);

  // Handle Google login
  const handleLogin = async () => {
    try {
      const googleUser = await gapi.auth2.getAuthInstance().signIn();

      if (googleUser.isSignedIn()) {
        console.log("Login successful:", googleUser);
        setIsAuthenticated(true);
      } else {
        console.error("Login failed: User not signed in.");
      }
    } catch (error) {
      if (error.error === "popup_closed_by_user") {
        alert("Login popup was closed. Please try again.");
      } else {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      }
    }
  };

  // Handle Google logout
  const handleLogout = async () => {
    try {
      await gapi.auth2.getAuthInstance().signOut();
      setIsAuthenticated(false);
      setEvents([]);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Get Google Calendar events
  const fetchEvents = async () => {
    try {
      //const timeMin = new Date().toISOString(); // current time — fetch upcoming events

      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        //timeMin,
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 100, // optional, fetch up to 100 events — adjust as needed
      });

      console.log(response.result.items);


      console.log("Fetched events response:", response);

      if (response?.result?.items) {
        setEvents(response.result.items);
      } else {
        console.log("No events found.");
      }
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  // Create an event on Google Calendar
  
   const createEvent = async (event) => {
  const newEvent = {
    summary: event.title,
    location: event.location,
    description: event.description,
    start: {
      dateTime: new Date(event.startDateTime).toISOString(), // ensure proper ISO format
      timeZone: "UTC",
    },
    end: {
      dateTime: new Date(event.endDateTime).toISOString(), // ensure proper ISO format
      timeZone: "UTC",
    },
    attendees: event.attendeesEmails.map(email => ({ email })),
    reminders: {
      useDefault: true,
    },
  };

  try {
    await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: newEvent,
      sendUpdates: "all"
    });
    fetchEvents(); // Refresh events after creating
  } catch (error) {
    console.error("Error creating event:", error);
  }
};

//update event
const updateGoogleEvent = (eventId, event) => {
  gapi.client.calendar.events.update({
    calendarId: 'primary',
    eventId: eventId,
    resource: {
      summary: event.title,
      location: event.location,
      description: event.description,
      start: {
        dateTime: event.start,
        timeZone: 'UTC',
      },
      end: {
        dateTime: event.end,
        timeZone: 'UTC',
      },
    },
  }).then(response => {
    console.log('Event updated:', response);
  });
};


const deleteGoogleEvent = (eventId) => {
  gapi.client.calendar.events.delete({
    calendarId: 'primary',
    eventId: eventId,
  }).then(response => {
    console.log('Event deleted:', response);
  });
};



  return {
    isAuthenticated,
    events,
    handleLogin,
    handleLogout,
    fetchEvents,
    createEvent,
  };
};

export default useGoogleCalendar;
