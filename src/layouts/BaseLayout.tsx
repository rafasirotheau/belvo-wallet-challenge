import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import ContainerContent from "./ContainerContent";

const BaseLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <AppHeader />
      <ContainerContent component="main" sx={{ paddingTop: 3 }}>
        {children}
      </ContainerContent>
    </>
  );
};

export default BaseLayout;
