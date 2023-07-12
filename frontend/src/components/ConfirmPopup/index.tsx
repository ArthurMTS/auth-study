import React from "react";
import { Drawer } from "@material-ui/core";
import { Check, Clear } from "@mui/icons-material";

interface ConfirmationPopupProps {
  message: string;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  message,
  open,
  onConfirm,
  onCancel,
}) => {

  return (
    <Drawer className="" anchor="bottom" open={open}>
      <div className="">
        <div className="">
          <h2>{message}</h2>
          <div className="">
            <button className="" onClick={onConfirm}><Check/></button>
            <button className="" onClick={onCancel}><Clear/></button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};