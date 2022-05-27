import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SnackbarContent from '@mui/material/SnackbarContent';
import Snackbar from '@mui/material/Snackbar';

import theme from 'utils/theme';
import { useRoot } from 'context/RootContext';
import { SNACKBAR_TYPES } from 'utils/constants/common';
import { Notification } from 'utils/types';

type Props = {
  items: Array<Notification>;
};

export const CustomSnackbar = ({ items }: Props) => {
  const [open, setOpen] = useState(false);
  const { clearNotification } = useRoot();

  const closeSnackbar = () => {
    setOpen(false);
    clearNotification();
  };

  useEffect(() => {
    if (items.length > 0) {
      setOpen(true);
    }
  }, [items.length]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={5000}
      onClose={closeSnackbar}
    >
      <div role="button" tabIndex={0} onClick={closeSnackbar}>
        {items.map(({ message, type }, index) =>
          Array.isArray(message) ? (
            /*eslint-disable */ //TODO: Fix lint issue
            message.map((item) => <SnackbarContainer marginb="10px" message={item} type={type} key={index} />)
          ) : (
            <SnackbarContainer message={message} type={type} key={index} />
          )
        )}
      </div>
    </Snackbar>
  );
};

const colorPicker = (type: string) => {
  switch (type) {
    case SNACKBAR_TYPES.error:
      return theme.colors.error;
    case SNACKBAR_TYPES.success:
      return theme.colors.success;
    case SNACKBAR_TYPES.info:
      return theme.colors.primary;
    default:
      return theme.colors.default;
  }
};

const SnackbarContainer = styled(SnackbarContent)<{ marginb?: string; type: string }>`
  &&& {
    background-color: ${(props) => colorPicker(props.type)};
    margin-bottom: ${(props) => props.marginb};
  }
`;
