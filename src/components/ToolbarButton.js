import React from 'react';
import Icon from 'react-icons-kit';
import {bold} from 'react-icons-kit/feather/bold';
import {italic} from 'react-icons-kit/feather/italic';
import {code} from 'react-icons-kit/feather/code';
import {list} from 'react-icons-kit/feather/list';
import {underline} from 'react-icons-kit/feather/underline';
import {minus} from 'react-icons-kit/feather/minus';
import {link2} from 'react-icons-kit/feather/link2';
import {ic_format_quote} from 'react-icons-kit/md/ic_format_quote';
import {image} from 'react-icons-kit/feather/image';

import '../css/ToolbarButton.css';

const ToolbarButton = props => (
  <button
    className="ToolbarButton"
    onPointerDown={event => props.onMarkClick(event, props.type)}
  >
    <Icon icon={toggleType(props.type)} />
  </button>
);

function toggleType(type) {
  switch(type) {
    case 'bold':
      return bold;
    case 'italic':
      return italic;
    case 'code':
      return code;
    case 'list':
      return list;
    case 'underline':
      return underline;
    case 'strikethrough':
      return minus;
    case 'link':
      return link2;
    case 'quote':
      return ic_format_quote;
      case 'image':
        return image;
    default:
      return bold;
  }
}

export default ToolbarButton;
