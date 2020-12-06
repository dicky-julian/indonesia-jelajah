import React from 'react';
import { Dialog as Dialogs } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Dialog = (props) => {
  const { open, onClose, title, children } = props;
  return (
    <Dialogs
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <div className="p-3 custom-dialog">
        <div className="d-flex justify-content-between">
          <h5 className="mb-0">{title}</h5>
          <div onClick={() => onClose(false)}>
            <Close
              className="cursor-pointer"
            />
          </div>
        </div>
        <hr />
        {children}
      </div>
    </Dialogs>
  )
}

export {
  Dialog
}