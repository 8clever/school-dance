import React from 'react';
import { i18nStore } from '../store/i18nStore';
import { observer } from 'mobx-react-lite';

interface I18nTextProps {
  text: string;
}

export const I18nText = observer((props: I18nTextProps): JSX.Element => {
  return (
    <span 
      onClick={e => {
        if (i18nStore.mode === "EDIT") {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      style={{
        background: i18nStore.mode === "EDIT" ? "yellow" : null,
        cursor: i18nStore.mode === "EDIT" ? "pointer" : null
      }}>
      {props.text}
    </span>
  );
})