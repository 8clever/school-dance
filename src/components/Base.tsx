import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

interface Props {
  children?: React.ReactNode
}

export const Base = (props: Props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}