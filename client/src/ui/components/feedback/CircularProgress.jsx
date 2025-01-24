import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Progress() {
  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <CircularProgress size="3rem" />
    </Stack>
  );
}
