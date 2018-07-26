import React from 'react';

import '../css/FormatToolbar.css';

const FormatToolbar = props => (
  <div className="FormatToolbar">
    {props.children}
  </div>
);

export default FormatToolbar;
