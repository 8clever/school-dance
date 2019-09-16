import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Notification } from "./Notification"

interface Props {
  children?: React.ReactNode
}

export const Base = (props: Props) => {
  return (
    <>
      <Header />
      <Notification />
      {props.children}
      <Footer />
    </>
  )
}