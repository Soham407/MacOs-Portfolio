import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import gsap from "gsap";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const windowData = windows[windowKey];
    const ref = useRef(null);
    const isOpeningRef = useRef(false);

    if (!windowData) {
      console.warn(
        `WindowWrapper: No window data found for key "${windowKey}"`
      );
      return null;
    }

    // Helper function to get dock icon position relative to window
    const getDockIconOffset = () => {
      const iconButton = document.querySelector(
        `button[data-window-id="${windowKey}"]`
      );
      const el = ref.current;

      if (!iconButton || !el) return null;

      const iconRect = iconButton.getBoundingClientRect();
      const windowRect = el.getBoundingClientRect();

      // Calculate offset from window center to icon center
      return {
        x:
          iconRect.left +
          iconRect.width / 2 -
          (windowRect.left + windowRect.width / 2),
        y:
          iconRect.top +
          iconRect.height / 2 -
          (windowRect.top + windowRect.height / 2),
      };
    };

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      // Kill any running tweens to prevent overlapping animations
      gsap.killTweensOf(el);
      isOpeningRef.current = false;

      // Set transform origin for dock-style scaling
      el.style.transformOrigin = "center bottom";

      if (windowData?.isOpen && !isOpeningRef.current) {
        // Opening animation - macOS style from dock icon
        isOpeningRef.current = true;
        el.style.display = "block";

        // Small delay to ensure DOM is ready for position calculation
        requestAnimationFrame(() => {
          const dockOffset = getDockIconOffset();

          const fromVars = {
            scale: 0.1,
            opacity: 0,
            filter: "blur(20px)",
            boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
          };

          const toVars = {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete: () => {
              isOpeningRef.current = false;
            },
          };

          if (dockOffset) {
            fromVars.x = dockOffset.x;
            fromVars.y = dockOffset.y;
            toVars.x = 0;
            toVars.y = 0;
          }

          gsap.fromTo(el, fromVars, toVars);
        });
      } else if (!windowData?.isOpen) {
        // Closing animation - macOS style to dock icon
        const dockOffset = getDockIconOffset();

        const closeVars = {
          scale: 0.1,
          opacity: 0,
          filter: "blur(20px)",
          boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
            // Reset position for next opening
            gsap.set(el, { x: 0, y: 0 });
            isOpeningRef.current = false;
          },
        };

        if (dockOffset) {
          closeVars.x = dockOffset.x;
          closeVars.y = dockOffset.y;
        }

        gsap.to(el, closeVars);
      }
    }, [windowData?.isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const [instance] = Draggable.create(el, {
        onPress: () => focusWindow(windowKey),
      });
      return () => instance.kill();
    }, []);

    useLayoutEffect(() => {
      const el = ref.current;
      if (!el) return;

      // Set initial state without animation
      if (!windowData?.isOpen) {
        el.style.display = "none";
        el.style.filter = "blur(20px)";
        el.style.boxShadow = "0 0 0px rgba(0, 0, 0, 0)";
      } else {
        el.style.filter = "blur(0px)";
        el.style.boxShadow = "0 10px 40px rgba(0, 0, 0, 0.3)";
      }
    }, []);

    return (
      <section id={windowKey} ref={ref} style={{ zIndex: windowData?.zIndex }} className="absolute">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${
    Component.displayName || Component.name || "Component"
  })`;

  return Wrapped;
};

export default WindowWrapper;
