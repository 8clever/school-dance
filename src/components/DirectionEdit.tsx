import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore as directionStoreGlobal, DirectionStore } from "../store/DirectionStore";
import { ImagePreview } from "./ImagePreview";
import { SubmenuType } from "../../server/models/Direction";
import _ from "lodash";
import { Select } from "./Select";
import { typeMap } from "../pages/Direction";
import { Icon } from "./Icon";


interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

interface SubtypeOption {
  label: string;
  value: string;
}

const directionStore = new DirectionStore();
export const DirectionEdit = observer((props: DirectionEditProps) => {

  directionStore.defaults();

  const [ subtypeOptions, setSubtypeOptions ] = React.useState<SubtypeOption[]>([]);
  const [ tabId, setTabId ] = React.useState("");
  const type = typeMap[directionStore.item.submenu.type];

  React.useEffect(() => {
    directionStore.create();
    if (!(props.visible && props._id)) return;

    directionStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  React.useEffect(() => {
    if (!props.visible) return;
    
    type.loadItems({}, { name: 1, fullName: 1, title: 1 }).then(() => {
      const options = type.getItems().map(i => {
        return {
          value: i._id,
          label: i.title
        }
      });
      setSubtypeOptions(options);
    });
  }, [type, props.visible]);

  return (
    <Modal 
      size="xl"
      toggle={props.toggle} 
      isOpen={props.visible}>
      <ModalHeader>
        {
          directionStore.item._id ? 
          "Редактирование направления" : 
          "Создание направления"
        }
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col md={6}>
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
              <Label>Краткое наименование</Label>
              <Input 
                placeholder={"Текст..."}
                value={directionStore.item.shortName}
                onChange={e => {
                  const v = e.target.value;
                  if (v.length > 5) return;
                  directionStore.item.shortName = v;
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
                    <Col md={6} key={idx}>
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
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Выбор списка</Label>
              <Input 
                onChange={(e) => {
                  directionStore.item.submenu.type = e.target.value as SubmenuType;
                  directionStore.item.submenu.items = [];
                  directionStore.item.schedule = [];
                }}
                value={directionStore.item.submenu.type} 
                type="select">
                <option value="teachers">Педагоги</option>
                <option value="artists">Артисты</option>
                <option value="performance">Спектакли</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Отображать в списке</Label>
              
              <Select
                placeholder="Выбор..."
                isMulti
                onChange={(options: SubtypeOption[]) => {
                  options = options || [];
                  directionStore.item.submenu.items = options.map(o => o.value);
                }}
                value={directionStore.item.submenu.items.map((_id) => {
                  const item = _.find(subtypeOptions, _.matches({ value: _id }));
                  return item;
                })}
                key={directionStore.item.submenu.type}
                options={subtypeOptions}
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <a 
                  target="_blank" 
                  href="https://crontab.guru/#00_12-14_*_*_1,3,5">
                  Настройка расписания*
                </a>
              </Label>
            </FormGroup>

            <Nav tabs>
              {
                directionStore.item.submenu.items.map(i => {
                  const item = _.find(subtypeOptions, _.matches({ value: i }));
                  if (!item) return null;
                  return (
                    <NavItem 
                      style={{
                        cursor: "pointer"
                      }}
                      key={item.value}>
                      <NavLink
                        className={tabId === item.value ? "active" : ""}
                        onClick={() => {
                          setTabId(item.value)
                        }}>
                        {item.label}
                      </NavLink>
                    </NavItem>
                  )
                })
              } 
            </Nav>
            <TabContent activeTab={tabId}>
              <div className="mb-3" />
              {
                directionStore.item.submenu.items.map(i => {
                  const item = _.find(subtypeOptions, _.matches({ value: i }));
                  if (!item) return null;

                  const schedules = _.filter(directionStore.item.schedule, _.matches({ _id: item.value }));

                  return (
                    <TabPane
                      tabId={item.value} 
                      key={item.value}>
                      {
                        schedules.map((s, idx) => {
                          return (
                            <FormGroup key={idx}>
                              <Input 
                                onChange={e => {
                                  s.cron = e.target.value;
                                }}
                                value={s.cron}
                              />
                            </FormGroup>
                          )
                        })
                      }

                      <Button 
                        onClick={() => {
                          directionStore.item.schedule.push({
                            _id: item.value,
                            cron: "00 12-14 * * 1,3,5"
                          })
                        }}
                        color="primary">
                        <Icon type="plus" /> Добавить Расписание
                      </Button>
                    </TabPane>
                  )
                })
              }
            </TabContent>
          </Col>
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