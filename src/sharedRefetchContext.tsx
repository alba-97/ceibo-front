import { createContext, ReactNode, useState } from "react";

export const SharedRefetchContext = createContext({
  refetch: false,
  triggerRefetch: () => {},
});

interface ISharedRefetchProviderProps {
  children: ReactNode;
}

export const SharedRefetchProvider = ({
  children,
}: ISharedRefetchProviderProps) => {
  const [refetch, setRefetch] = useState(false);

  const triggerRefetch = () => {
    setRefetch((prevState) => !prevState);
  };

  return (
    <SharedRefetchContext.Provider value={{ refetch, triggerRefetch }}>
      {children}
    </SharedRefetchContext.Provider>
  );
};
