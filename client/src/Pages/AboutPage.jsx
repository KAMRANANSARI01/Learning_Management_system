import React from "react";

import HomeLayout from "../Layouts/HomeLayout";
import CarouselSlide from "../Component/carouselSlide";
import { celebradtyData } from "../Constant/CelebratyData";

import mainImg from "../assets/aboutMainImage.png";

const AboutPage = () => {
  return (
    <HomeLayout>
      <div className="flex  bg-red-500 flex-col lg:h-[90%]  w-full items-center justify-between m-auto  sm:pt-20 text-white ">
        <div className="flex h-[50%]  bg-slate-600 items-center justify-between  m-auto">
          <section className="  h-[100%]  bg-yellow-300 flex  flex-col    justify-center space-y-12 ">
            <h1 className=" text-5xl font-semibold text-yellow-500">
              Affordable and quality education
            </h1>
            <p className="text-xl text-grey-200 tracking-wide  ">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for aspiring teacher and
              student to share their skills, creativity , knowledge to each
              other to empower and contribute in the growth and wellness of the
              mankind.
            </p>
          </section>
          <section className="w-[40%] bg-orange-400 h-[100%]  flex items-center flex-col justify-center">
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
        <div className="carousel  bg-green-300 w-[40%] m-auto   mb-3 ">
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
