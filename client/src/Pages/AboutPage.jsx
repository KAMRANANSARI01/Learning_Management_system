import React from "react";
import HomeLayout from "../Layouts/HomeLayout";
import mainImg  from "../assets/aboutMainImage.png";

const AboutPage = () => {
  return (
    <HomeLayout>
      <div className="flex flex-col bg-red-600 h-[90vh] w-[100%] sm:pl-20 sm:pt-20 text-white ">
        <div className="flex  items-center justify-around gap-5 m-10">
          <section className=" w-[50%] h-[50%] bg-slate-500 space-y-12 ">
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
          <section className="w-[1/2] bg-slate-400">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0)) ",
              }}
              className="drop-shadow-2xl"
              src={mainImg}
              alt="img"
            />
          </section>
        </div>

      </div>
    </HomeLayout>
  );
};

export default AboutPage;
