import React, {Component} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import BoldMark from './BoldMark';
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
    }
  }

  renderMark = props => {
    switch(props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />;
    }
  }

  render() {
    return(
      <div className="TextEditor">
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </div>
    );
  }
}

export default TextEditor;
