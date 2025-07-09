import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);

  const totalVideos = 4;
  const upComingVideoIndex = (currentIndex % totalVideos) + 1;

  const nextVideoRef = useRef(null);

  const handleVideoLoaded = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  const handleMiniVideoClick = () => {
    setCurrentIndex(upComingVideoIndex);
    setIsClicked(true);
  };

  useEffect(() => {
    if (loadedVideo === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideo]);

  useGSAP(
    () => {
      if (isClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(18% 0, 69% 0, 90% 85%, 0% 100%)",
      borderRadius: "0 0 20% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="w-screen h-dvh flex flex-center absolute z-[100] overflow-hidden bg-violet-100">
          <div className="loader"></div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative h-dvh w-screen overflow-hidden z-10 bg-blue-100 rounded-lg"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute size-64 overflow-hidden z-50 cursor-pointer rounded-lg ">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100  "
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upComingVideoIndex)}
                id="current-video"
                onLoadedData={handleVideoLoaded}
                className="size-64 origin-center object-cover object-center scale-150"
                loop
                muted
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            id="next-video"
            loop
            muted
            className="object-cover object-center size-64 absolute absolute-center z-20 invisible "
            onLoadedData={handleVideoLoaded}
          />

          <video
            src={getVideoSrc(
              currentIndex == totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="object-cover object-center absolute left-0 top-0 size-full "
            onLoadedData={handleVideoLoaded}
          />
        </div>
        <h1 className="hero-heading absolute bottom-5 right-5 z-40 text-blue-50">
          Gaming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className=" hero-heading text-blue-100">redefine</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame
              <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex flex-center  gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="hero-heading absolute bottom-5 right-5 text-black">
        Gaming
      </h1>
    </div>
  );
};

export default Hero;
