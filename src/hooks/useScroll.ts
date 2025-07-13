import { RefObject, useEffect, useRef } from "react";

export const useScroll = (
  parentRef: RefObject<HTMLElement | null>,
  childRef: RefObject<HTMLElement | null>,
  callback: () => void
) => {
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (!parentRef.current || !childRef.current) return;
    const parentNode = parentRef.current;
    const childNode = childRef.current;

    const options = {
      root: parentNode,
      rootMargin: "0px",
      threshold: 1,
    };

    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        console.log("intersecting");
      }
    }, options);

    observer.current.observe(childNode);

    return () => {
      if (observer.current) {
        observer.current.unobserve(childNode);
      }
    };
  }, [callback, childRef, parentRef]);
};
