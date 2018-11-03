import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client'

class ChatPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {}

    }
  }
// Instantiate ChatKit ChatManager with instanceLocator, userID from this.props.currentUsername and a custom TokenProvider that points to /authenticate route
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:a18ca6ab-f32d-4c74-b04d-7ce9d86d1673',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate',
      }),
    })
    //Once ChatManager has been initialised, it calls connect .connect happens asynchronously and a Promise is returned.
    chatManager
    .connect()
    .then(currentUser => {
      this.setState({ currentUser })
    })
    .catch(error => console.error('Something went wrong', error))
  }


  render(){
    return (
      <div>
        <h1>Share your Vice</h1>
      </div>
    )
  }
}

export default ChatPanel;