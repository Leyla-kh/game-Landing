import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="w-screen min-h-screen ">
      <div className="flex flex-col items-center gap-5 mt-36 ">
        <h2 className="font-general uppercase text-sm md:text-[10] ">
          Welcome to Zentry
        </h2>
        <AnimatedTitle
          containerClass="mt-5 !text-black text-center"
          title="Discover the world's <br/> largest shared adventure"
        />

        <div className="about-subtext">
          <p>The game of Games , Begins-your life now an epic MMORPG</p>
          <p className="text-gray-700">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
        <div id="clip" className="w-screen h-dvh">
          <div className="mask-clip-path about-image">
            <img
              src="/public/img/about.jpg"
              className="absolute left-0 top-0 size-full object-cover"
              alt="background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
