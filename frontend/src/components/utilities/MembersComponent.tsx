import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const MembersComponent: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch team members data from the API
    axios
      .get("http://localhost:8000/api/teams") // Replace with your actual API endpoint
      .then((response) => {
        setTeamMembers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
      });
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const interval = setInterval(() => {
        if (
          scrollContainer.scrollTop >=
          scrollContainer.scrollHeight / 2
        ) {
          // Reset scroll to the start of the first batch
          scrollContainer.scrollTop = 0;
        } else {
          // Scroll down by 1 pixel
          scrollContainer.scrollTop += 1;
        }
      }, 50); // Adjust speed (lower number = faster scroll)

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [teamMembers]);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h6 className="mb-0">Chairperson and Members</h6>
      </div>
      <div
        className="card-body text-center"
        ref={scrollContainerRef}
        style={{
          maxHeight: "400px", // Fixed height for scrollable content
          overflowY: "hidden", // Hide scrollbar for auto-scroll
        }}
      >
        {teamMembers.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Original members list */}
            {teamMembers.map((member: any) => (
              <div
                key={`original-${member.id}`}
                style={{
                  marginBottom: "20px", // Add space between members
                }}
              >
                <img
                  src={`/images/members/${member.image}`} // Adjust path based on your API
                  alt={member.name}
                  className="img-fluid rounded-circle mb-2"
                  style={{ maxWidth: "150px" }}
                />
                <p className="fw-bold">{member.name}</p>
                <p>{member.salutation}</p>
                <hr /> {/* Add a divider between members */}
              </div>
            ))}
            {/* Duplicate the list for seamless scrolling */}
            {teamMembers.map((member: any) => (
              <div
                key={`duplicate-${member.id}`}
                style={{
                  marginBottom: "20px", // Add space between members
                }}
              >
                <img
                  src={`/images/members/${member.image}`} // Adjust path based on your API
                  alt={member.name}
                  className="img-fluid rounded-circle mb-2"
                  style={{ maxWidth: "150px" }}
                />
                <p className="fw-bold">{member.name}</p>
                <p>{member.salutation}</p>
                <hr /> {/* Add a divider between members */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default MembersComponent;
