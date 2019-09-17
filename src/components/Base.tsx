import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { userStore } from "../store/UserStore";

interface Props {
  children?: React.ReactNode
}

export const Base = (props: Props) => {

  React.useEffect(() => {
    userStore.isLoggedin();
  }, [])

  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  )
}