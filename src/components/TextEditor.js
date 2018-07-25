import React, {Component} from 'react';
import {Editor} from 'slate-react';
import {Value} from 'slate';
import initial_value from '../config/value.json';

import '../css/TextEditor.css';

class TextEditor extends Component {
  state = {
      value: Value.fromJSON(initial_value),
  }

  onChange = ({value}) => this.setState({value});

  render() {
    return(
      <div className="TextEditor">
        <Editor value={this.state.value} onChange={this.onChange} />
      </div>
    );
  }
}

export default TextEditor;
