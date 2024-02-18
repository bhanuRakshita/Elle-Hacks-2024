import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MyContext = createContext();

export function MyProvider({ children }) {
  const [state, setState] = useState();
  const [readyToNavigate, setReadyToNavigate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (readyToNavigate) {
      router.push('/place');
      // Reset navigation trigger
      setReadyToNavigate(false);
    }
  }, [readyToNavigate, router]);

  const updateState = (newState) => {
    setState(newState);
    // Instead of navigating immediately, set a flag to indicate readiness to navigate
    setReadyToNavigate(true);
  };

  return (
    <MyContext.Provider value={{ state, updateState }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
