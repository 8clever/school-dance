import React from "react";
import { observer } from "mobx-react-lite";
import { DirectionMenu } from "./Direction";
import { Base } from "../components";

export const Directions = observer(() => {
  return (
    <Base flex>
      <DirectionMenu />
    </Base>
  )
})