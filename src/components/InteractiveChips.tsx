"use client";

import { useEffect, useState, useRef } from "react";

const CHIPS = [
  "Summarize This Document",
  "Extract Key Business Fields",
  "What Are the Key Findings?",
  "Find Trends in This Data",
  "Check Data Quality Issues",
];

interface InteractiveChipsProps {
  className?: string;
}

export default function InteractiveChips({ className }: InteractiveChipsProps) {
  const [activeIndex, setActiveIndex] = useState(1); // Default to "Extract Key Business Fields" (Variant 1)
  const [prevIndex, setPrevIndex] = useState(1);
  const [isInViewport, setIsInViewport] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Set up the dynamic transition timer matching Figma prototype timings:
  // - Variant 5 to Default (index 0 -> 1) is a 300ms Ease-Out transition.
  // - Other variant transitions are 1200ms Ease-In-And-Out.
  const startTimer = (currentIndex: number) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    const delay = currentIndex === 0 ? 300 : 1200;

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => {
        setPrevIndex(prev);
        const next = (prev + 1) % CHIPS.length;
        startTimer(next);
        return next;
      });
    }, delay);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  // Intersection Observer to track viewport entry/exit
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      stopTimer();
    };
  }, []);

  // Manage timer based on visibility state
  useEffect(() => {
    if (isInViewport) {
      startTimer(activeIndex);
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isInViewport]);

  const handleChipClick = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(index);
    if (isInViewport) {
      startTimer(index); // Reset the timer starting from the clicked index
    }
  };

  // Determine if this is the wrap-around transition from Variant 5 (index 0) to Default (index 1)
  const isWrapTransition = prevIndex === 0 && activeIndex === 1;

  // Calculate distance from active index (taking wrapping into account)
  const getDistance = (index: number, active: number) => {
    const d = Math.abs(index - active);
    return Math.min(d, CHIPS.length - d);
  };

  // Calculate translateY offset to keep the active index centered
  const translateY = activeIndex === 0 ? 64 : 60 - activeIndex * 56;

  return (
    <div ref={containerRef} className={`chips-overlay ${className ?? ""}`}>
      <div
        className={`chips-carousel-track ${
          isWrapTransition ? "transition-wrap" : "transition-normal"
        }`}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        {CHIPS.map((chip, index) => {
          const distance = getDistance(index, activeIndex);
          let chipClass = "inactive-far";
          if (distance === 0) {
            chipClass = "active";
          } else if (distance === 1) {
            chipClass = "inactive-adjacent";
          }

          return (
            <button
              key={chip}
              type="button"
              className={`chip-btn ${chipClass}`}
              onClick={() => handleChipClick(index)}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}


