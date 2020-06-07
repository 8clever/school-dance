import React from 'react';
import { i18nStore, I18nStore } from '../store/i18nStore';
import { observer } from 'mobx-react-lite';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label, InputGroup, InputGroupAddon, InputProps } from 'reactstrap';
import { i18n } from '../../server/models/I18n';
import { Icon } from "../components/Icon";
import { toJS } from 'mobx';

export const getI18nText = (key: string) => {
  const locale = i18nStore.translates[key];
  if (locale && locale[i18nStore.lang]) {
    return locale[i18nStore.lang]
  }
  return key;
}

interface I18nTextProps {
  text: string;
}

export const I18nText = observer((props: I18nTextProps): JSX.Element => {

  const isEditMode = i18nStore.mode === "EDIT";

  const [ visibleEdit, setVisibleEdit ] = React.useState(false);

  const locale = i18nStore.translates[props.text]

  const localText = React.useMemo(() => {
    return getI18nText(props.text);
  }, [ 
    props.text,
    i18nStore.lang,
    locale 
  ]);

  return (
    <>
      <span 
        onClick={e => {
          if (isEditMode) {
            e.preventDefault();
            e.stopPropagation();
            setVisibleEdit(true);
          }
        }}
        style={{
          background: isEditMode ? "yellow" : null,
          cursor: isEditMode ? "pointer" : null
        }}>
        {
          isEditMode ?
          props.text :
          localText
        }
      </span>

      {
        isEditMode ?
        <I18nEdit
          visible={visibleEdit}
          toggle={() => setVisibleEdit(false)}
          text={props.text}
        /> : null
      }
    </>
  );
});

interface I18nEditProps {
  toggle: () => void;
  visible: boolean;
  text: string;
}

export const I18nEdit = observer((props: I18nEditProps) => {

  const store = React.useMemo(() => new I18nStore(), [ props.visible ]);

  React.useEffect(() => {
    if (!props.text) return;
    (async () => {
      const items = await store.getItems({
        key: props.text,
      }, { key: 1 }, 1);
      if (items.count) {
        store.item = items.list[0]
      }
      store.item.key = props.text;
    })();
  }, [ props.visible ]);

  return (
    <Modal 
      isOpen={props.visible}>
      <ModalHeader>Редактирование ключей переводов</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Ключ</Label>
          <Input
            disabled
            value={props.text} 
            type="textarea"
          />
        </FormGroup>
        {i18n.langs.map(l => {
          return (
            <FormGroup key={l}>
              <Label>{i18n.Languages[l]}</Label>
              <Input 
                onChange={e => {
                  store.item.tr[l] = e.target.value
                }}
                value={store.item.tr[l]}
                type="textarea"
              />
            </FormGroup>
          )
        })}        
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.toggle}>
          Отмена
        </Button>
        <Button 
          color="primary"
          onClick={async () => {
            await store.saveItem();
            i18nStore.translates[props.text] = toJS(store.item.tr, { recurseEverything: true });
            props.toggle();
          }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
});

interface I18nInputProps extends InputProps {}

export const I18nInput = (props: I18nInputProps) => {
  const { ...inputProps } = props;

  const [ visibleEdit, setVisibleEdit ] = React.useState(false);

  return (
    <>
      <InputGroup>
        <Input 
          {...inputProps} 
        />
        <InputGroupAddon addonType="append">
          <Button
            onClick={() => {
              setVisibleEdit(true);
            }}
            style={{
              height: inputProps.type === "textarea" ? null : "85%"
            }}>
            <Icon 
              style={{
                marginTop: inputProps.type === "textarea" ? null : -2
              }}
              size={"2x"}
              type="language" 
            />
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <I18nEdit
        text={inputProps.value as string}
        visible={visibleEdit}
        toggle={() => setVisibleEdit(false)}
      />
    </>
  )
}