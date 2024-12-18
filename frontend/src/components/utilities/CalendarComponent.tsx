import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Ensure FullCalendar is installed
import dayGridPlugin from "@fullcalendar/daygrid"; // For the day grid view
import interactionPlugin from "@fullcalendar/interaction"; // For date click handling
import apiClient from "../../apiClient"; // Import the centralized apiClient
import "./CalendarComponent.css"; // Import custom styles

interface CauseListEvent {
  title: string;
  start: string; // Event start date in ISO format
}

const CalendarComponent: React.FC = () => {
  const [causeListEvents, setCauseListEvents] = useState<CauseListEvent[]>([]);

  useEffect(() => {
    // Fetch cause list events
    const fetchCauseListEvents = async () => {
      try {
        const response = await apiClient.get<CauseListEvent[]>("/cause-list");
        setCauseListEvents(response.data);
      } catch (error) {
        console.error("Error fetching cause list events:", error);
      }
    };

    fetchCauseListEvents();
  }, []);

  // Function to handle date click
  const handleDateClick = (info: any) => {
    const clickedDate = new Date(info.dateStr); // Get the clicked date as a Date object
    const day = clickedDate.getDate(); // Get day without padding
    const month = clickedDate.toLocaleString("en-US", { month: "short" }); // Month abbreviation
    const year = String(clickedDate.getFullYear()).slice(-2); // Last two characters of the year

    // Generate the PDF URL dynamically
    const pdfUrl = `https://aftdelhi.nic.in/dailycauselist/2024/${day}_${month}_${year}.pdf`;

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");
  };

  // Add custom class names for weekends
  const dayCellClassNames = (date: any) => {
    const day = date.date.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
    if (day === 0) return "sunday-holiday"; // Sunday
    if (day === 6) return "saturday-holiday"; // Saturday
    return "clickable-day"; // Add class for clickable days
  };

  // Prevent clicking on Saturdays and Sundays
  const handleDateClickWithHolidayCheck = (info: any) => {
    const day = new Date(info.dateStr).getDay(); // Get the day of the week
    if (day === 0 || day === 6) {
      alert("Saturdays and Sundays are holidays!");
      return;
    }
    handleDateClick(info);
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h6 className="mb-0">Cause List Calendar</h6>
      </div>
      <div className="card-body">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={causeListEvents} // Dynamic events fetched from the backend
          height={500}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          dayMaxEventRows={3}
          dateClick={handleDateClickWithHolidayCheck}
          dayCellClassNames={dayCellClassNames}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
