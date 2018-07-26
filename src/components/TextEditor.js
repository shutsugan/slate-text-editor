import React, {Component, Fragment} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import Plain from 'slate-plain-serializer';
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';
import FormatToolbar from './FormatToolbar';
import ToolbarButton from './ToolbarButton';
import Link from './Link';
import initial_value from '../config/value.json';

import '../css/TextEditor.css';

const existing_value = JSON.parse(localStorage.getItem('content'));

class TextEditor extends Component {
  state = {
      value: Value.fromJSON(existing_value || initial_value)
  }

  onChange = ({value}) => {
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON());
      localStorage.setItem('content', content);

      const content_plain = Plain.serialize(value);
      localStorage.setItem('content_plain', content_plain);
    }

    this.setState({value});
  }

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
      case 's':
        change.toggleMark('strikethrough');
        return true;
      case 'a':
        change.toggleMark('link');
        return true;
      case 'q':
        change.toggleMark('quote');
        return true;
      case 'm':
        change.toggleMark('image');
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
        return <u {...props.attributes}>{props.children}</u>;
      case 'strikethrough':
        return <del {...props.attributes}>{props.children}</del>;
      case 'link':
        return <Link {...props} />
      case 'quote':
        return <blockquote {...props.attributes} >{props.children}</blockquote>;
      case 'image':
        return <img {...props.attributes} src={props.children} />;
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
            <ToolbarButton type="strikethrough" onMarkClick={this.onMarkClick} />
            <ToolbarButton type="quote" onMarkClick={this.onMarkClick} />
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
