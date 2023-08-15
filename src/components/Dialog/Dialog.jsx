import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import css from './Dialog.module.css';

export default function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button className={css.btn} onClick={handleClickOpen('paper')}>
        More info
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle className={css.dialog} id="scroll-dialog-title">
          <p className={css.title}>About phonebook</p>
        </DialogTitle>
        <DialogContent className={css.dialog} dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <p className={css.text}>
              A simple and convenient application "PhoneBook Pro" is designed
              for organizing and managing your contacts. Easily add and delete
              contacts, as well as perform searches by name. "PhoneBook Pro"
              allows you to keep your contacts under control and always have
              access to the necessary information.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={css.dialog}>
          <Button className={css.btnClose} onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
