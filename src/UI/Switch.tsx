import { ReactNode, createContext, useContext } from "react";

const SwitchContext = createContext({ case_key: "" });

export default function Switch({
  case_key,
  children
}: {
  case_key: string;
  children: ReactNode;
}) {
  return (
    <SwitchContext.Provider value={{ case_key }}>
      {children}
    </SwitchContext.Provider>
  );
}

function Case({
  case_value,
  children
}: {
  case_value: string[];
  children: ReactNode;
}) {
  const { case_key } = useContext(SwitchContext);
  // console.log({ case_key, case_value });

  return case_value.find((value) => value === case_key) ? children : <></>;
}

Switch.Case = Case;
