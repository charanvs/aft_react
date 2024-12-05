import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react"; // Ensure FullCalendar is installed
import dayGridPlugin from "@fullcalendar/daygrid"; // For the day grid view
import interactionPlugin from "@fullcalendar/interaction"; // For date click handling
import axios from "axios";
import "./CalendarComponent.css"; // Import custom styles

const CalendarComponent: React.FC = () => {
  const [causeListEvents, setCauseListEvents] = useState([]);

  useEffect(() => {
    // Fetch cause list events
    axios
      .get("http://localhost:8000/api/cause-list") // Replace with your actual API endpoint
      .then((response) => {
        setCauseListEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cause list events:", error);
      });
  }, []);

  // Function to handle date click
  const handleDateClick = (info: any) => {
    const clickedDate = new Date(info.dateStr); // Get the clicked date as a Date object
    const day = clickedDate.getDate(); // Get day without padding
    const month = clickedDate.toLocaleString("en-US", { month: "short" }); // Get first three characters of the month
    const year = String(clickedDate.getFullYear()).slice(-2); // Get last two characters of the year

    // Generate the PDF URL
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
      // Prevent action on weekends
      alert("Saturdays and Sundays are holidays!");
      return;
    }
    handleDateClick(info); // Proceed with regular click handling
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h6 className="mb-0">Cause List Calendar</h6>
      </div>
      <div className="card-body">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]} // Add interactionPlugin for date clicks
          initialView="dayGridMonth"
          events={causeListEvents}
          height={500} // Adjust height for better appearance
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          dayMaxEventRows={3} // Limit events per day
          dateClick={handleDateClickWithHolidayCheck} // Attach the updated date click handler
          dayCellClassNames={dayCellClassNames} // Add custom classes for weekends
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
