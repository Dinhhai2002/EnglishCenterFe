import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner-cv1.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner-cv2.png?alt=media",
  "https://firebasestorage.googleapis.com/v0/b/uploadimage-aa334.appspot.com/o/banner-cv3.png?alt=media",
];

function SlideImage() {
  return (
    <Zoom scale={0.7} indicators={true} autoplay>
      {images.map((each, index) => (
        <div
          key={index}
          style={{ width: "100%", height: "300px", marginTop: "40px" }}
        >
          <img
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
            alt="Slide Image"
            src={each}
          />
        </div>
      ))}
    </Zoom>
  );
}

export default SlideImage;
