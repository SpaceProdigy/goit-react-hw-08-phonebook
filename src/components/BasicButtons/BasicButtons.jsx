import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import css from './BasicButtons.module.css';

export default function BasicButtons({ disabled, text }) {
  return (
    <div className={css.wrapper}>
      <Button disabled={disabled} className={css.btn} type="submit">
        {text}
      </Button>
    </div>
  );
}

BasicButtons.propTypes = {
  disabled: PropTypes.bool,
};
