import swiss1 from "../images/swiss1.jpg";
import swiss2 from "../images/swiss2.jpg";
import swiss3 from "../images/swiss3.jpg";

import { Carousel } from "antd";

const BoxStyle = (image) => {
  return {
    minHeight: "800px",
    width: "100%",
    boxShadow: "inset 0 0 0 2000px rgb(0,0,0, 0.5)",
    backgroundSize: "cover",
    backgroundImage: `url(${image})`,
    color: "#FFFFFF",
  };
};

function About() {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <>
      <h1>About Page</h1>
      <Carousel dotPosition="left" arrows fade>
        {/* ຮູບທີ 1 */}
        <div>
          <div style={BoxStyle(swiss1)}>
            <h3>Swiss 1</h3>
            <p>ສະຖານທີ່ທ່ອງທ່ຽວອັນໜ້າປະທັບໃຈ</p>
          </div>
        </div>

        {/* ຮູບທີ 2 */}
        <div>
          <div style={BoxStyle(swiss2)}>
            <h3>Swiss 2</h3>
          </div>
        </div>

        {/* ຮູບທີ 3 */}
        <div>
          <div style={BoxStyle(swiss3)}>
            <h3>Swiss 3</h3>
          </div>
        </div>
      </Carousel>
    </>
  );
}

export default About;
