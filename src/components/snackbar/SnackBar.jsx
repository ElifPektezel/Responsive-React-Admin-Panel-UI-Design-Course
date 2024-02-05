// SnackBar.jsx
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackBar = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar open={open} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={onClose}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              width: 'auto',
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
