import React, { useState, useEffect, useRef } from "react";
import useGoogleCalendar from "../../components/hooks/useGoogleCalendar";

const Calender = () => {
    const {
        isAuthenticated,
        events,
        handleLogin,
        handleLogout,
        fetchEvents,
        createEvent,
      } = useGoogleCalendar();
    
      useEffect(() => {
        if (isAuthenticated) {
          fetchEvents(); // Fetch events when authenticated
        }
      }, [isAuthenticated]);
    
      const handleAddEvent = () => {
        const event = {
           title: "Test Event",
           location: "Zoom",
           description: "Test meeting via Zoom",
           startDateTime: "2025-04-29T10:00:00", // ISO dateTime format
           endDateTime: "2025-04-29T11:00:00",
        };
        createEvent(event);
      };
  return (
    <div style={{ backgroundColor: 'black', color: 'white' }}>
    {!isAuthenticated ? (
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#4285F4', // Google Blue
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '5px',
          fontSize: '16px',
        }}
      >
        Login with Google
      </button>
    ) : (
      <div>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#FF5B5B', // Red
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            marginRight: '10px',
          }}
        >
          Logout
        </button>
        <button
          onClick={handleAddEvent}
          style={{
            backgroundColor: '#34A853', // Green
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        >
          Add Event
        </button>
  
        <h3 style={{ color: 'white' }}>Upcoming Events</h3>
        {events?.length > 0 ? (
          <ul>
            {events?.map((event) => (
              <li key={event.id} style={{ color: 'white' }}>
                {event?.summary} - {new Date(event?.start.dateTime).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'white' }}>No events found.</p>
        )}
      </div>
    )}
  </div>
  
  )
}

export default Calender