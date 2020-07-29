import { useState } from "react";
import { Workspace } from "pages";

export interface LocalStorageSchema {
  workspace: Workspace;
  workspaceTitle: string;
}

export const useLocalStorage = <T extends keyof LocalStorageSchema>(
  key: T,
  initialValue: LocalStorageSchema[T]
): [LocalStorageSchema[T], (value: LocalStorageSchema[T]) => void] => {
  const [storedValue, setStoredValue] = useState<LocalStorageSchema[T]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: LocalStorageSchema[T]) => {
    try {
      const valueToStore =
        (value as unknown) instanceof Function
          ? ((value as unknown) as Function)(storedValue)
          : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
