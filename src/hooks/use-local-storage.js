import { useCallback, useEffect, useState } from "react";

export const useLocalstorage = (key, value = {}) => {
  // lazily initialize the hook

  const [state, setState] = useState(() => {
    const valueInLocalStorage = localStorage.getItem(key);

    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage);
    }

    return null;
  });

  const saveDataToLocalStorage = useCallback(() => {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  // const getUserData = useCallback(() => {
  //   setState(localStorage.getItem(key));
  // }, [key]);

  const clearLocalStorage = () => window.localStorage.clear();

  useEffect(() => {
    saveDataToLocalStorage();
    // getUserData();
  }, [saveDataToLocalStorage]);
  return {
    clear: clearLocalStorage,
    save: saveDataToLocalStorage,
    userData: state,
    updateUserData: setState,
  };
};

export default useLocalstorage;
