import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { observer } from "mobx-react-lite";
import { directionStore as directionStoreGlobal, DirectionStore } from "../store/DirectionStore";
import { ImagePreview } from "./ImagePreview";
import { DirectionSection, SubmenuItem, directionSectionMap } from "../../server/models/Direction";
import _ from "lodash";
import { Icon } from "./Icon";
import { imageStore } from "../store/ImageStore";
import { toJS } from "mobx";
import { I18nInput } from "./Localization";

interface DirectionEditProps {
  _id?: string;
  visible: boolean;
  toggle: () => void;
}

const sectionOptions: { value?: DirectionSection, label: string }[] = [
  {
    label: "Не выбрано"
  },
  {
    value: "projects",
    label: "Проекты"
  }
]

const directionStore = new DirectionStore();
export const DirectionEdit = observer((props: DirectionEditProps) => {

  const [ submenuEdit, setSubmenuEdit ] = React.useState({
    visible: false,
    idx: -1,
    newImages: [] as Blob[],
    item: {
      name: "",
      description: "",
      images: []
    } as SubmenuItem
  })

  directionStore.defaults();

  React.useEffect(() => {
    directionStore.create();
    if (!(props.visible && props._id)) return;

    directionStore.loadItem(props._id);
  }, [ props.visible, props._id ]);

  let dragIdx = -1;

  return (
    <>
      <Modal 
        size="xl"
        toggle={props.toggle} 
        isOpen={props.visible}>
        <ModalHeader>
          {
            directionStore.item._id ? 
            "Редактирование раздела" : 
            "Создание раздела"
          }
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Наименование</Label>
                <I18nInput
                  text={directionStore.item.name} 
                  placeholder={"Текст..."}
                  value={directionStore.item.name}
                  onChange={e => {
                    directionStore.item.name = e.target.value;
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Адрес [a-z_0-9]</Label>
                <Input 
                  placeholder={"Текст..."}
                  value={directionStore.item.url || ""}
                  onChange={e => {
                    if (/[^a-z_0-9]/.test(e.target.value)) return;
                    directionStore.item.url = e.target.value;
                  }}
                />
              </FormGroup>

              <FormGroup>
                <Label>Описание</Label>
                <I18nInput 
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
                <Label>Привязка к разделу</Label>
                <Input 
                  type="select"
                  options={sectionOptions}
                  value={directionStore.item.section}
                  onChange={e => {
                    directionStore.item.section = e.target.value as DirectionSection;
                  }}
                  placeholder="Выбор...">
                  <option value="">Не выбрано</option>
                  {_.map(directionSectionMap, (v, k) => {
                    return <option key={k} value={k}>{v}</option>
                  })}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label>Список</Label>
                
                <ListGroup flush>
                  {
                    directionStore.item.submenu.map((sub,idx) => {

                      let counter = 0;

                      return (
                        <ListGroupItem 
                          className="dropzone"
                          onDragOver={e => {
                            e.preventDefault();
                          }}
                          onDragStart={(e) => {
                            dragIdx = idx;
                          }}
                          onDragEnter={e => {
                            counter++;
                            e.currentTarget.classList.toggle("dragged", true);
                          }}
                          onDragLeave={e => {
                            counter--
                            if (counter === 0) {
                              e.currentTarget.classList.toggle("dragged", false);
                            }
                          }}
                          onDrop={e => {
                            counter = 0;
                            e.currentTarget.classList.toggle("dragged", false);
                            const submenu = toJS(directionStore.item.submenu, { recurseEverything: true });
                            const i = submenu[dragIdx];
                            submenu.splice(dragIdx, 1)
                            submenu.splice(idx, 0, i);
                            directionStore.item.submenu = submenu;
                          }}
                          style={{ cursor: "move" }}
                          draggable={true}
                          key={idx}>
                          <Row>
                            <Col>
                              {idx + 1}. {sub.name}
                            </Col>
                            <Col className="text-right">
                              <Icon 
                                onClick={() => {
                                  setSubmenuEdit({
                                    visible: true,
                                    idx,
                                    newImages: [],
                                    item: _.cloneDeep(sub)
                                  })
                                }}
                                style={{ cursor: "pointer" }}
                                className="ml-3" 
                                type="pencil-alt" 
                              />
                              <Icon 
                                onClick={() => {
                                  directionStore.item.submenu.splice(idx, 1);
                                }}
                                style={{ cursor: "pointer" }}
                                className="ml-3" 
                                type="trash" 
                              />
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )
                    })
                  }
                </ListGroup>

                <div style={{ marginTop: 10 }}>
                  <Button 
                    onClick={() => {
                      setSubmenuEdit({
                        visible: true,
                        newImages: [],
                        idx: -1,
                        item: {
                          url: "",
                          name: "",
                          description: "",
                          images: []
                        }
                      })
                    }}
                    size="sm"
                    color="primary">
                    <Icon type="plus" />
                  </Button>
                </div>
              </FormGroup>
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

      <Modal 
        size="xl"
        toggle={() => setSubmenuEdit({ ...submenuEdit, visible: false })} 
        isOpen={submenuEdit.visible}>
        <ModalHeader>
          Редактирование элемента списка
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Наименование</Label>
            <I18nInput 
              placeholder={"Текст..."}
              value={submenuEdit.item.name}
              onChange={e => {
                setSubmenuEdit({
                  ...submenuEdit,
                  item: {
                    ...submenuEdit.item,
                    name: e.target.value
                  }
                })
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Адрес [a-z_0-9]</Label>
            <Input 
              placeholder={"Текст..."}
              value={submenuEdit.item.url || ""}
              onChange={e => {
                if (/[^a-z_0-9]/.test(e.target.value)) return;
                setSubmenuEdit({
                  ...submenuEdit,
                  item: {
                    ...submenuEdit.item,
                    url: e.target.value
                  }
                })
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label>Описание</Label>
            <I18nInput 
              type="textarea"
              rows={4}
              placeholder={"Текст..."}
              value={submenuEdit.item.description}
              onChange={e => {
                setSubmenuEdit({
                  ...submenuEdit,
                  item: {
                    ...submenuEdit.item,
                    description: e.target.value
                  }
                })
              }}
            />
          </FormGroup>

          <FormGroup key={String(submenuEdit.visible)}>
            <Label>Фотографии</Label>
            <Input 
              type="file" 
              accept={".jpg, .png, .jpeg"} 
              multiple
              onChange={(e) => {
                Object.keys(e.target.files).forEach(key => {
                  const file = e.target.files[key];
                  if (file) submenuEdit.newImages.push(file);
                });
              }
            }/>
          </FormGroup>

          <Row>
            {
              submenuEdit.item.images.map((i, idx) => {
                return (
                  <Col md={6} key={idx}>
                    <ImagePreview 
                      _id={i as string}
                      onRemove={() => {
                        const images = submenuEdit.item.images.concat();
                        images.splice(idx, 1);
                        setSubmenuEdit({
                          ...submenuEdit,
                          item: {
                            ...submenuEdit.item,
                            images
                          }
                        })
                      }}
                    />  
                  </Col>
                )
              })
            }
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color={"secondary"} onClick={() => {
            setSubmenuEdit({
              ...submenuEdit,
              visible: false
            })
          }}>
            Отмена
          </Button>
          <Button color={"primary"} onClick={async () => {
            for(const image of submenuEdit.newImages) {
              const _idimage = await imageStore.upload(image);
              submenuEdit.item.images.push(_idimage);
            }

            if (submenuEdit.idx === -1) {
              directionStore.item.submenu.push(submenuEdit.item);
            } else {
              directionStore.item.submenu.splice(submenuEdit.idx, 1, submenuEdit.item);
            }

            setSubmenuEdit({
              ...submenuEdit,
              visible: false,
              newImages: []
            })
          }}>
            Сохранить
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
})