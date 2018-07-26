import React from 'react';

import '../css/Link.css';

const Link = props => {
  const link = props.text;
  return <a className="Link" href={link}>{link}</a>;
};

export default Link;
