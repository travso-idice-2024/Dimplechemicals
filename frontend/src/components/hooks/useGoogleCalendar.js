import { useState, useEffect,useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setIsAuthenticated, clearAuth } from '../../redux/googleCalenderAuthSlice';


const CLIENT_ID = '369846641543-at9qrr9at1c3mfg3rqpk1valfoq9rn2t.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const useGoogleCalendar = () => {
  // const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
  // const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.googleCalenderAuth.accessToken);
  const isAuthenticated = useSelector((state) => state.googleCalenderAuth.isAuthenticated);
  const [events, setEvents] = useState([]);

  const calendarTokenClientRef = useRef(null);

// Initialize Google OAuth Token Client for Calendar
  const initializeGis = () => {
    calendarTokenClientRef.current = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        if (tokenResponse.error) {
          console.error('Token Error:', tokenResponse);
          return;
        }
        const expiry = Date.now() + 60 * 60 * 1000; // 1 hour expiry
        dispatch(setAccessToken({ token: tokenResponse.access_token, expiry}));
        dispatch(setIsAuthenticated(true));
      },
    });
  };


   // Initialize once when Google library loads
   useEffect(() => {
    if (window.google && google.accounts && google.accounts.oauth2) {
      initializeGis();
    } else {
      window.onload = initializeGis;
    }
  }, []);


   // Handle access token expiry auto-refresh
   useEffect(() => {
    if (!accessToken) return;

    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const remainingTime = tokenExpiry - Date.now();

    if (remainingTime <= 0) {
      if (calendarTokenClientRef.current) {
        console.log("Access token expired — requesting new one...");
        calendarTokenClientRef.current.requestAccessToken();
      } else {
        console.error("Calendar token client not initialized.");
      }
    } else {
      const timer = setTimeout(() => {
        if (calendarTokenClientRef.current) {
          console.log("Access token about to expire — requesting new one...");
          calendarTokenClientRef.current.requestAccessToken();
        }
      }, remainingTime - 5000); // refresh 5s before expiry

      return () => clearTimeout(timer);
    }
  }, [accessToken]);

   // Login / Consent Flow
   const handleLogin = () => {
    if (calendarTokenClientRef.current) {
      calendarTokenClientRef.current.requestAccessToken();
    } else {
      console.error('Calendar token client not initialized.');
    }
  };

    // Logout / Revoke
    const handleLogout = () => {
      if (accessToken) {
        google.accounts.oauth2.revoke(accessToken, () => {
          dispatch(clearAuth());
          setEvents([]);
        });
      }
    };

  const fetchEvents = async () => {
    //console.log("accessToken",accessToken);
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=100&orderBy=startTime&singleEvents=true',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      //setEvents(data.items || []);
      console.log("events",data);
      if (data?.items) {
        setEvents(data?.items);
      } else {
        console.log("No events found.");
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const createEvent = async (event) => {
    console.log("event added sucessfully");
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    const eventData = {
      summary: event.title,
      location: event.location,
      description: event.description,
      start: {
        dateTime: new Date(event.startDateTime).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(event.endDateTime).toISOString(),
        timeZone: 'UTC',
      },
      attendees: event.attendeesEmails.map((email) => ({ email })),
      reminders: {
        useDefault: true,
      },
    };

    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        fetchEvents(); // Refresh events after creation
      } else {
        const errorData = await response.json();
        console.error('Error creating event:', errorData);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const updateEvent = async (eventId, updatedEvent) => {
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    const eventData = {
      summary: updatedEvent.title,
      location: updatedEvent.location,
      description: updatedEvent.description,
      start: {
        dateTime: new Date(updatedEvent.startDateTime).toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(updatedEvent.endDateTime).toISOString(),
        timeZone: 'UTC',
      },
      attendees: updatedEvent.attendeesEmails.map((email) => ({ email })),
      reminders: {
        useDefault: true,
      },
    };

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        fetchEvents(); // Refresh events after update
      } else {
        const errorData = await response.json();
        console.error('Error updating event:', errorData);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId) => {
    if (!accessToken) {
      console.error('Access token is missing.');
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        fetchEvents(); // Refresh events after deletion
      } else {
        const errorData = await response.json();
        console.error('Error deleting event:', errorData);
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return {
    isAuthenticated,
    events,
    handleLogin,
    handleLogout,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};

export default useGoogleCalendar;
