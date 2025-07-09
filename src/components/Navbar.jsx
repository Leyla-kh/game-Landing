import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { gsap } from "gsap/gsap-core";

const Navbar = () => {
  const navItem = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  // Refs for audio and navigation container
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  //
  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setlastScrollY] = useState(0);
  const [navIsVisisble, setnavIsVisisble] = useState(true);

  //toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // manage audio plaback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setnavIsVisisble(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setnavIsVisisble(false);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setnavIsVisisble(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setlastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: navIsVisisble ? 0 : -100,
      opacity: navIsVisisble ? 1 : 0,
      duration: 0.4,
    });
  }, [navIsVisisble]);

  return (
    <div className="fixed inset-x-0 top-10 z-50 y-16 border-none transition-all duration-700 sm:inset-x-6 ">
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav
          ref={navContainerRef}
          className="flex size-full items-center justify-between p-4"
        >
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-500 md:flex hidden item-center justify-center gap-1 "
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItem.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${
                    isIndicatorActive ? "active" : ""
                  }`}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
