import React from "react";
import NavBar from "./NavBar";
import Wrapper, { WrapperVarient } from "./wrapper";

interface LayoutProps {
  varient: WrapperVarient;
}

export const Layout: React.FC<LayoutProps> = ({ children, varient }) => {
  return (
    <>
      <NavBar />
      <Wrapper varient={varient}>{children}</Wrapper>
    </>
  );
};
