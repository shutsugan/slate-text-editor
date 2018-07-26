import React, {Component, Fragment} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import FormatToolbar from './FormatToolbar';
import ToolbarButton from './ToolbarButton';
import initial_value from '../config/value.json';

import '../css/TextEditor.css';

class TextEditor extends Component {
  state = {
      value: Value.fromJSON(initial_value),
  }

  onChange = ({value}) => this.setState({value});

  onKeyDown = (event, change) => {
    if (!event.ctrlKey) return;

    event.preventDefault();
    switch(event.key) {
      case 'b':
        change.toggleMark('bold');
        return true;
      case 'i':
        change.toggleMark('italic');
        return true;
      case 'c':
        change.toggleMark('code');
        return true;
      case 'l':
        change.toggleMark('list');
        return true;
      case 'u':
        change.toggleMark('underline');
        return true;
      default:
        change.toggleMark('bold');
        return true;
    }
  }

  onMarkClick = (event, type) => {
    event.preventDefault();

    const {value} = this.state;
    const change = value.change().toggleMark(type);

    this.onChange(change);
  }

  renderMark = props => {
    switch(props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
      case 'italic':
        return <ItalicMark {...props} />;
      case 'code':
        return <code {...props.attributes}>{props.children}</code>;
      case 'list':
        return <ul {...props.arrtibutes}><li>{props.children}</li></ul>;
      case 'underline':
        return <u {...props.attributes}>{props.children}</u>
      default:
        return <BoldMark {...props} />;
    }
  }

  render() {
    return(
      <div className="TextEditor">
        <Fragment>
          <FormatToolbar>
            <ToolbarButton type="bold" onMarkClick={this.onMarkClick} />
            <ToolbarButton type="italic" onMarkClick={this.onMarkClick} />
            <ToolbarButton type="code" onMarkClick={this.onMarkClick} />
            <ToolbarButton type="list" onMarkClick={this.onMarkClick} />
            <ToolbarButton type="underline" onMarkClick={this.onMarkClick} />
          </FormatToolbar>
          <Editor
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            renderMark={this.renderMark}
          />
        </Fragment>
      </div>
    );
  }
}

export default TextEditor;
