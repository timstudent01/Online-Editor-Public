import { useState, useEffect } from "react";

const useDebounceValue = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState<T | undefined>(undefined);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounceValue;
