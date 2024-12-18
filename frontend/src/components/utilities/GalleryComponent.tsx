import React, { useEffect, useState } from "react";
import apiClient from "../../apiClient"; // Import the centralized apiClient

interface GalleryImage {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

const GalleryComponent: React.FC = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    // Fetch gallery images from the API
    const fetchGalleryImages = async () => {
      try {
        const response = await apiClient.get<GalleryImage[]>("/gallery");
        setGalleryImages(response.data);
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white">
        <h6 className="mb-0">Gallery</h6>
      </div>
      <div className="card-body">
        {galleryImages.length > 0 ? (
          <div
            id="galleryCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            {/* Indicators */}
            <div className="carousel-indicators">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#galleryCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Carousel Inner */}
            <div className="carousel-inner">
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={`/images/gallery/${image.image}`} // Adjust the image path based on your setup
                    className="d-block w-100"
                    alt={image.title || `Gallery Image ${index + 1}`}
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>{image.title || "Untitled Image"}</h5>
                    <p>{image.description || "No description available"}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#galleryCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-muted">No images available in the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryComponent;
