import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useGoogleCalendar from "../../components/hooks/useGoogleCalendar";
import EventDetailModal from "./EventDetailModal";
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
           title: "Meeting Sheduled",
           location: "Indore",
           description: "Test meeting via Zoom",
           startDateTime: "2025-05-01T06:30:00", // ISO dateTime format
           endDateTime: "2025-05-01T06:45:00",
           attendeesEmails: [
                "nikhilpatankar74@gmail.com",
                "umasharma0821@gmail.com",
				"nikhil02.1998@gmail.com"
             ],
        };
        createEvent(event);
      };


  // Convert Google Calendar events to FullCalendar format
const eventsData = events.map((event) => ({
id: event.id,
title: event.summary,
start: event.start.dateTime,
end: event.end.dateTime,
extendedProps: {
description: event.description,
location: event.location,
},
}));


const [selectedEvent, setSelectedEvent] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const handleEventClick = (info) => {
  setSelectedEvent(info.event);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};




  return (
 <>
  {!isAuthenticated ? (
    <div className="flex justify-center items-center min-h-screen bg-gray-400">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white border-none px-5 py-2 cursor-pointer rounded text-lg"
      >
        Sign In with Google
      </button>
    </div>
  ) : (
    <div className="bg-black text-white p-4 min-h-screen">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white border-none px-5 py-2 cursor-pointer rounded text-lg mb-5"
      >
        Sign Out with Google
      </button>

      {events?.length > 0 ? (
        <div className="w-full">
          <h2 className="text-xl font-bold mb-4">📅 My Google Calendar Events</h2>
          <div className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={eventsData}
              dateClick={(info) => openModalForNewEvent(info.dateStr)}
              eventClick={handleEventClick}
              height="auto"
            />
          </div>
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  )}

  <EventDetailModal
    isOpen={isModalOpen}
    onClose={closeModal}
    event={selectedEvent}
  />
</>

  
  )
}

export default Calender