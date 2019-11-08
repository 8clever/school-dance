import React from "react";
import { observer } from "mobx-react-lite";
import { notifStore } from "../store/NotifStore";
import { Alert } from "reactstrap";
import _ from "lodash";

export const Notification = observer(() => {
  if (_.isEmpty(notifStore.items)) {
    return null;
  }

  return (
    <div style={{
      zIndex: 10000,
      position: "absolute",
      padding: 20,
      left: 0,
      top: 0,
      minWidth: 400,
      maxWidth: 800
    }}>
      {
        _.map(notifStore.items, i => {
          return (
            <Alert 
              className="bg-white"
              toggle={() => {
                notifStore.rmNotif(i.id);
              }}
              color="primary" 
              key={i.id}>
              <b>{i.title}</b>
              <br/>
              {i.message}
            </Alert>
          )
        })
      }
    </div>
  )
})