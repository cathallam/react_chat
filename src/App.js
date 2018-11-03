import React, { Component } from 'react';
import UsernameForm from './components/UsernameForm';
import ChatPanel from './components/ChatPanel';

// Render UserNameForm and connect to the onUsernameSumitted event handler 
class App extends Component {
  constructor() {
    super()
    this.state= {
      currentUsername: '',
      currentScreen: 'UsernameScreen'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }
// WHen onUsernameSubmitted is called, send a POST request to /users route. If reqest is successful, update this.state.username so it's referenced later
  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
  .then(response => {
    this.setState({
      currentUsername: username,
      currentScreen: 'ChatPanel'
      })
    })
    .catch(error => console.error('Something went wrong', error))
  }

  render() {
    if (this.state.currentScreen === 'UsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
    if (this.state.currentScreen === 'ChatPanel') {
      return <ChatPanel currentUsername={this.state.currentUsername} />
    }

      }
    }
    
    export default App;