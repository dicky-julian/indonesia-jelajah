import React, { forwardRef } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from '@material-ui/core';

const Modal = (
  {
    showModal,
    setShowModal = (() => { }),
    children,
    footerStyle = {},
    closeTitle,
    submitTitle,
    submitAction,
    style
  }) => {
  return (
    <Dialog
      open={showModal}
      keepMounted
      onClose={() => setShowModal(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div style={style}>
        <DialogContent className="p-0">
          {children}
        </DialogContent>
        {submitTitle &&
          <DialogActions style={footerStyle}>
            <Button onClick={() => setShowModal(false)} color="primary">
              {closeTitle}
            </Button>
            <Button onClick={submitAction} color="primary">
              {submitTitle}
            </Button>
          </DialogActions>}
      </div>
    </Dialog>
  )
}

export default Modal;