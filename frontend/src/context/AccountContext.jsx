import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext(null);

export const useAccountContext = () => {
  return useContext(AccountContext);
};

export const AccountContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
