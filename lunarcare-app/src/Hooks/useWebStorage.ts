import { useState, useEffect } from "react";

export function useWebStorage(
  key: string,
  initialValue: string,
  storageObject: Storage = localStorage // Specify type of storageObject explicitly
): [string, (value: string) => void] {  // Define return type of the hook
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = storageObject.getItem(key);
      console.log("Item get first:", item, key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string): void => {
    try {
      setStoredValue(value);
      storageObject.setItem(key, JSON.stringify(value));
      console.log("Item set first:", value, key);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useWebStorage;