"use client";

import { useEffect, useRef, useState, RefObject } from "react";

function useInView(
  threshold = 0.12,
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );

    const element = ref.current;

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export { useInView };
