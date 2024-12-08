import exp from "constants";
import { useState, useEffect } from "react";

export function useWebStorage(
  key: string,
  initialValue: string,
  storageObject = localStorage
) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storageObject.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      storageObject.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useWebStorage;