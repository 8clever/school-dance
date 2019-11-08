import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, Row, Col } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore as directionStoreGlobal, DirectionStore } from "../store/DirectionStore";
import { Icon } from "./Icon";
import { ImagePreview } from "./ImagePreview";
import { SubmenuType } from "../../server/models/Direction";
import { artistStore } from "../store/ArtistStore";
import { performanceStore } from "../store/PerformanceStore";
import { teacherStore } from "../store/TeacherStore";
import _ from "lodash";

interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const directionStore = new DirectionStore();
export const DirectionEdit = observer((props: DirectionEditProps) => {

  React.useEffect(() => {
    directionStore.create();
    if (!(props.visible && props._id)) return;

    directionStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  React.useEffect(() => {
    artistStore.loadItems();
    performanceStore.loadItems();
    teacherStore.loadItems();
  }, [])

  if (!directionStore.item) return null;

  directionStore.item.submenu = directionStore.item.submenu || {
    type: "performance",
    items: []
  }

  const subtypeOptions: Array<{ value: string, label: string }> = [];

  switch(directionStore.item.submenu.type) {
    case "teachers" :
      teacherStore.itemList.forEach(t => {
        subtypeOptions.push({
          value: t._id as string,
          label: t.fullName
        });
      });
      break;
    case "artists" :
      artistStore.itemList.forEach(a => {
        subtypeOptions.push({
          value: a._id as string,
          label: a.name
        })
      });
      break;
    case "performance" :
      performanceStore.itemList.forEach(a => {
        subtypeOptions.push({
          value: a._id as string,
          label: a.name
        })
      });
      break;
  }

  return (
    <Modal toggle={props.toggle} isOpen={props.visible}>
      <ModalHeader>
        {
          directionStore.item._id ? 
          "Редактирование направления" : 
          "Создание направления"
        }
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Наименование</Label>
          <Input 
            placeholder={"Текст..."}
            value={directionStore.item.name}
            onChange={e => {
              directionStore.item.name = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Лейбл</Label>
          <Input 
            placeholder={"Текст..."}
            value={directionStore.item.shortName}
            onChange={e => {
              directionStore.item.shortName = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>Описание</Label>
          <Input 
            type="textarea"
            rows={4}
            placeholder={"Текст..."}
            value={directionStore.item.desc}
            onChange={e => {
              directionStore.item.desc = e.target.value;
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label>
            <a 
              target="_blank" 
              href="https://crontab.guru/#00_12-14_*_*_1,3,5">
              Расписание*
            </a>
          </Label>
          <div>
            {
              directionStore.item.schedule.map((s, idx) => {
                return (
                  <InputGroup 
                    key={idx}
                    className="mb-2">
                    <Input 
                      value={s}
                      onChange={e => {
                        directionStore.item.schedule[idx] = e.target.value;
                      }}
                    />
                    <InputGroupAddon
                      addonType={"append"}
                    >
                      <Button 
                        onClick={() => {
                          directionStore.item.schedule.splice(idx, 1);
                        }}
                        size="sm">
                        <Icon 
                          className="text-danger"
                          type="trash" 
                        />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                )
              })
            }
          </div>
          <Button 
            onClick={() => {
              directionStore.item.schedule.push("00 12-14 * * 1,3,5")
            }}
            color="primary"
            size="sm">
            <Icon type="plus" />
          </Button>
        </FormGroup>

        <FormGroup>
          <Label>Тип</Label>
          <Input 
            onChange={(e) => {
              directionStore.item.submenu.type = e.target.value as SubmenuType;
              directionStore.item.submenu.items = [];
            }}
            value={directionStore.item.submenu.type} 
            type="select">
            <option value="teachers">Педагоги</option>
            <option value="artists">Артисты</option>
            <option value="performance">Спектакли</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <select 
            className="form-control"
            multiple={true}
            onChange={(e) => {
              directionStore.item.submenu.items = _.map(e.target.selectedOptions, (o => o.value));
            }}
            value={directionStore.item.submenu.items as string[]}>
              {
                subtypeOptions.map((o, idx) => {
                  return (
                    <option key={idx} value={o.value}>{o.label}</option>
                  )
                })
              }
          </select>
        </FormGroup>

        <FormGroup>
          <Label>Фотографии</Label>
          <Input 
            type="file" 
            accept={".jpg, .png, .jpeg"} 
            multiple
            onChange={(e) => {
              Object.keys(e.target.files).forEach(key => {
                const file = e.target.files[key];
                if (file) directionStore.newImages.push(file);
              });
            }
          }/>
        </FormGroup>

        <Row>
          {
            directionStore.item.images.map((i, idx) => {
              return (
                <Col>
                  <ImagePreview 
                    _id={i as string}
                    onRemove={() => {
                      directionStore.item.images.splice(idx, 1);
                    }}
                  />  
                </Col>
              )
            })
          }
        </Row>
        
      </ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={props.toggle}>
          Отмена
        </Button>
        <Button color={"primary"} onClick={async () => {
          await directionStore.save();
          await directionStoreGlobal.loadItems({});
          if (props._id) {
            await directionStoreGlobal.loadItem(props._id);
          }
          props.toggle();
        }}>
          Сохранить
        </Button>
      </ModalFooter>
    </Modal>
  )
})