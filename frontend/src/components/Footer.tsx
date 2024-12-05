import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-center mt-4 p-3" style={{ backgroundColor: "#34495e", color: "#f8f9fa" }}>
      <p>© {new Date().getFullYear()} Armed Forces Tribunal Portal</p>
    </footer>
  );
};

export default Footer;
