import { createContext, useContext } from "react";

export const SessionModalContext = createContext(() => {});

export const useOpenCreateSession = () => useContext(SessionModalContext);
