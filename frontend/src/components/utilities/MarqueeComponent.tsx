import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MarqueeComponent.css";

const MarqueeComponent: React.FC = () => {
  const [marqueeItems, setMarqueeItems] = useState<string[]>([]);

  useEffect(() => {
    const fetchMarqueeItems = async () => {
      try {
        const response = await axios.get("/marquee-items.json"); // Fetch from public folder
        setMarqueeItems(response.data);
      } catch (error) {
        console.error("Failed to fetch marquee items:", error);
      }
    };

    fetchMarqueeItems();
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee">
        {marqueeItems.map((item, index) => (
          <span key={index} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeComponent;