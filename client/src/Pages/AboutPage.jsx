import React from "react";

import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from "../Component/carouselSlide";
import { celebradtyData } from "../Constant/CelebratyData";

import mainImg from "../assets/aboutMainImage.png";

const AboutPage = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col  lg:h-[90%]  w-full items-center justify-between m-auto  sm:pt-20 text-white ">
        <div className="flex flex-col sm:flex-row  sm:h-[90%] h-[50%] my-12  items-center justify-between ">
          <section className="  h-[50%]   flex sm:w-[60%] md:w-[50%] flex-col  w-[90%]  md:px-16 sm:px-10 justify-center space-y-12 ">
            <h1 className=" md:text-5xl text-3xl text-center sm:text-start mt-12 font-semibold text-yellow-500">
              Affordable and quality education
            </h1>
            <p className="sm:text-2xl text-lg text-grey-200 tracking-wide  ">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for aspiring teacher and
              student to share their skills, creativity , knowledge to each
              other to empower and contribute in the growth and wellness of the
              mankind.
            </p>
          </section>
          <section className="sm:w-[40%] w-[70%]  h-[50%]  flex items-center flex-col justify-center">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0)) ",
              }}
              className="drop-shadow-2xl h-[100%]"
              src={mainImg}
              alt="img"
            />
          </section>
        </div>
        {/* //adding carousel  */}
        <div className="carousel  sm:w-[40%] w-[80%] m-auto   mb-3 ">
          {celebradtyData &&
            celebradtyData.map((celebraty) => (
              <CarouselSlide
                {...celebraty}
                key={celebraty.slideNumber}
                totalSlide={celebradtyData.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutPage;
