import { useEffect, useState } from "react";

export function useBottomReached() {
  const [isBottomReached, setIsBottomReached] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const isReached =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight;
      setIsBottomReached(isReached);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isBottomReached;
}
