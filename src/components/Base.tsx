import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { userStore } from "../store/UserStore";
import { observer } from "mobx-react-lite";
import { FlexCol } from "./Flex";

interface Props {
  children?: React.ReactNode;
}

const Main = (props: Props) => (
  <>
    <Header />
    <div 
      className="flex-fill"
      style={{
        position: "relative",
      }}>
      {props.children}
    </div>
    <div>
      <Footer />
    </div>
  </>
)

export const Base = observer((props: Props) => {

  React.useEffect(() => {
    userStore.isLoggedin();
  }, [])

  return (
    <div 
      style={{ height: "100vh" }}>
      <FlexCol justify="between" column>
        <Main children={props.children} />
      </FlexCol>
    </div>
  )
})