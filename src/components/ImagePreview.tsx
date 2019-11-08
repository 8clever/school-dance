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
    <div className="image-preview mb-2">
      <img 
        width={"100%"}
        src={`${imageStore.endpoint}/${props._id}`} 
      />
      <div className="absolute-container hovered text-right">
        {
          props.onRemove ?
          <Button 
            size="sm"
            onClick={props.onRemove}
            color="primary">
            <Icon type="times" />
          </Button> : null
        }
      </div>
    </div>
  )
}