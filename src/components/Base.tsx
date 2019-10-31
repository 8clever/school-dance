import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { userStore } from "../store/UserStore";
import { FlexCol } from "./Flex";
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
      <FlexCol column justify="between">
        <div>
          <Header />
          {props.children}
        </div>
        <div>
          <Footer />
        </div>
      </FlexCol>
    </div>
  )
})