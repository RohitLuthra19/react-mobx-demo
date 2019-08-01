import React from 'react';

import "./Spinner.css";

export const Spinner = (props: Props) => {
  const { left, top, fontSize, visible } = props;
  const style = {
    left,
    top,
    fontSize,
    display: visible ? 'block' : 'none',
  }

  return (
    <div className="spinner" style={style}>
      <span className="fa fa-circle-o-notch fa-spin"></span>
    </div>
  )
}

export default Spinner;