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
    <Drawer anchor="bottom" open={open}>
      <div>
        <div>
          <h2>{message}</h2>
          <div>
            <button onClick={onConfirm}><Check/></button>
            <button onClick={onCancel}><Clear/></button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};