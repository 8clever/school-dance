import React from "react";
import { Row, Col, Button } from "reactstrap";
import { imageStore } from "../store/ImageStore";
import { Icon } from "./Icon";

interface ImagePreviewProps {
  onRemove?: () => void;
  _id: string;
}

export const ImagePreview = (props: ImagePreviewProps) => {
  return (
    <Row>
      <Col md={4}>
        <img
          width={200} 
          src={`${imageStore.endpoint}/${props._id}`} />
      </Col>
      <Col md={8} className="text-right">
        {
          props.onRemove ?
          <Button 
            onClick={props.onRemove}
            color="danger">
            <Icon type="trash" /> Удалить
          </Button> : null
        }
      </Col>
    </Row>
  )
}