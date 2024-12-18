import React, { useState } from "react";
import "./Home.css";
import CalendarComponent from "../../components/utilities/CalendarComponent";
import GalleryComponent from "../../components/utilities/GalleryComponent";
import MembersComponent from "../../components/utilities/MembersComponent";

type ActiveComponentType = "welcome" | "calendar" | "gallery";

const Home: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ActiveComponentType>("welcome");

  // Handle navigation click events
  const handleLinkClick = (component: ActiveComponentType) => {
    setActiveComponent(component);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Left Column: Useful Links */}
        <aside className="col-lg-3 col-md-4 mb-4 left-column">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">Useful Links</h6>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("calendar");
                  }}
                  className="text-decoration-none text-dark"
                >
                  <i className="icon-calendar me-2"></i> Daily Cause List
                </a>
              </li>
              <li className="list-group-item">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("gallery");
                  }}
                  className="text-decoration-none text-dark"
                >
                  <i className="icon-gallery me-2"></i> Gallery
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Middle Column: Dynamic Content */}
        <main className="col-lg-6 col-md-8 mb-4 middle-column">
          {(() => {
            switch (activeComponent) {
              case "calendar":
                return <CalendarComponent />;
              case "gallery":
                return <GalleryComponent />;
              default:
                return (
                  <div className="card shadow-sm border-0">
                    <div className="card-body">
                      <header className="text-center mb-4">
                        <h1 className="text-primary">Welcome to the Armed Forces Tribunal</h1>
                      </header>
                      <section>
                        <h2 className="text-secondary">Highlights</h2>
                        <p>Content will be dynamically displayed here.</p>
                      </section>
                    </div>
                  </div>
                );
            }
          })()}
        </main>

        {/* Right Column: Team Section */}
        <aside className="col-lg-3 col-md-4 mb-4 right-column">
          <MembersComponent />
        </aside>
      </div>
    </div>
  );
};

export default Home;
