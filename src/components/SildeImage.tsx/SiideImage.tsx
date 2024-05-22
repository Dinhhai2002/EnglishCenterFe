import authenticationApiService from "@/services/API/AuthenticationApiService";
import bannerApiService from "@/services/API/BannerApiService";
import { Banner } from "@/types/Banner";
import { LIMIT_DEFAULT, PAGE_DEFAULT } from "@/utils/Constant";
import { StatusEnum } from "@/utils/enum/StatusEnum";
import { useEffect, useState } from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function SlideImage() {
  const [listBanner, setListBanner] = useState([]);

  useEffect(() => {
    authenticationApiService
      .getAllBanner(StatusEnum.ON, PAGE_DEFAULT, LIMIT_DEFAULT / 2)
      .then((data: any) => {
        setListBanner(data.data.list);
      })
      .catch((error) => {});
  }, []);
  return (
    <Zoom scale={0.7} indicators={true} autoplay>
      {listBanner.map((item: Banner, index) => (
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
            src={item.url}
          />
        </div>
      ))}
    </Zoom>
  );
}

export default SlideImage;
