import React, { PureComponent } from "react";
import { TextField } from 'material-ui';

export default class CustomTextField extends PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    const { label, error, type, value, ...props } = this.props;

    return (
      <TextField
        hintText={label}
        type={type}
        value={value}
        errorText={error}
        {...props}
      />
    );
  }
}
