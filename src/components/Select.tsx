import React from "react";
import ReactSelect, { Props,  } from "react-select";

const $gray300 = "#eceeef";
const $gray400 = "#ced4da";
const $gray500 = "#adb5bd";

export const Select = (props: Props) => {
  return (
    <ReactSelect 
      {...props}
      styles={{
        menu: styles => {
          return {
            ...styles,
            borderRadius: 0
          }
        },
        container: styles => {
          return {
            ...styles,
            ":focus": {
              outline: "none"
            }
          }
        },
        control: (styles, state) => {
          return {
            ...styles,
            minHeight: 45, 
            backgroundColor: 'white',
            borderRadius: 0,
            borderColor: $gray400,
            boxShadow: state.isFocused ? `0 0 0 1px ${$gray500}` : "none",
            "&:hover": {
              borderColor: $gray500
            }
          }
        },
        option: (styles, state) => {
          return {
            ...styles,
            backgroundColor: 
              state.isSelected ? $gray400 :
              state.isFocused ? $gray300 : undefined,
            ":active": {
              backgroundColor: $gray400
            },
            color: "black"
          };
        }
      }}
    />
  )
}