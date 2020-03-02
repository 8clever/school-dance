import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";

interface Props {
  children?: React.ReactNode
}

export const Base = observer((props: Props) => {

  React.useEffect(() => {
    userStore.isLoggedin();
  }, [])

  return (
    <div 
      style={{ height: "100vh" }}>
      <div 
        className="d-md-h-100"
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        <Header />
        <div style={{
          position: "relative",
          height: "100%",
        }}>
          {props.children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  )
})