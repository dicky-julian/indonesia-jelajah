import React from 'react';
import { Dialog as Dialogs } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Dialog = (props) => {
  const { open, onClose, title, children, fullwidth } = props;
  return (
    <Dialogs
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="responsive-dialog-title"
      className={fullwidth ? 'fullwidth' : ''}
    >
      <div className="p-3 custom-dialog" style={fullwidth && { maxWidth: '80vw', width: '80vw' }}>
        <div className="d-flex justify-content-between">
          {title ? <h5 className="mb-0">{title}</h5> : <span></span>}
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