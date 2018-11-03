import React, { Component } from 'react';

class UsernameForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
}
this.onSubmit = this.onSubmit.bind(this)
this.onChange = this.onChange.bind(this)
  }

onSubmit(e) {
  e.preventDefault()
  this.props.onSubmit(this.state.username)
}

onChange(e) {
  this.setState({ username: e.target.value})
}

render() {
  return (
    <div>
      <h3>Enter your username?</h3>
      <form onSubmit={this.onSubmit}>
      <input
      type='text'
      placeholder='Enter your full name'
      onChange={this.onChange}
      />
      </form>
    </div>
  )
}
}

export default UsernameForm;
 