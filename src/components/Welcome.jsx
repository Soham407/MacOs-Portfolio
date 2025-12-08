import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const containerRect = container.getBoundingClientRect();
    const x = e.clientX - containerRect.left;

    letters.forEach((letter) => {
      const letterRect = letter.getBoundingClientRect();
      const letterCenter =
        letterRect.left - containerRect.left + letterRect.width / 2;
      const distance = Math.abs(x - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / 2000);

      const weight = min + (max - min) * intensity;
      animateLetter(letter, weight, 0.1); // Faster duration for smoother effect
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);
  return () => {
   container.removeEventListener("mousemove", handleMouseMove);
   container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanupSubtitle = setupTextHover(subtitleRef.current, "subtitle");
    const cleanupTitle = setupTextHover(titleRef.current, "title");

    return () => {
      cleanupSubtitle?.();
      cleanupTitle?.();
    };
  });

  return (
    <section id="welcome">
      <p ref={subtitleRef} className="flex">
        {renderText(
          "Hey, I'm Soham! Welcome to My",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 ref={titleRef} className="mt-7 flex">
        {renderText("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is only designed for Desktop/tablet screen only</p>
      </div>
    </section>
  );
};

export default Welcome;
