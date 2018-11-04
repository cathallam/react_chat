import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../components/MessageList';
import SendMessageForm from '../components/SendMessageForm';
import TypingIndicator from '../components/TypingIndicator';
import WhosOnlineList from '../components/WhosOnlineList';


class ChatPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {},
      currentRoom: {},
      messages: [],
      usersWhoAreTyping: [],
    }

    // When the SendMessageForm is submitted, we access this.state.currentUser and call sendMessage (note, most interactions happen on currentUser)
    this.sendMessage = this.sendMessage.bind(this)
    this.sendTypingEvent = this.sendTypingEvent.bind(this)
  }
  
  sendTypingEvent() {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .catch(error => console.error('error', error))
    }

  sendMessage(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    })
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

    /*Once ChatManager has been initialised, it calls connect .connect happens asynchronously and a Promise is returned.
    Once you connect to ChatKit you get a currentUser object representing current connected user. Call subscribeToRoom on currentUser. subscribeToRoom takes an event handler called onMessage, that is called in real-time each time a new message arrives. Refreshing the page shows 100 recent messages*/
    
    chatManager
    .connect()
    .then(currentUser => {
      this.setState({ currentUser })
      return currentUser.subscribeToRoom({
        roomId: "19372721",
        messageLimit: 100,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message],
            })
          },
          // Calling currentUser.userIsTyping when the current user starts typing; then,listening to userStartedTyping and userStoppedTyping events
          onUserStartedTyping: user => {
            this.setState({
              usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
            })
          },
            onUserStoppedTyping: user => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                username => username !== user.name
                  ),
                })
              },
            onPresenceChange: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          },
          })
        })
    .then(currentRoom => {
      this.setState({ currentRoom })
    })
    .catch(error => console.error('Something went wrong', error))
  }

  render() {
    const styles = {
      container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        },
        chatContainer: {
        display: 'flex',
        flex: 1,
        },
        whosOnlineListContainer: {
        width: '300px',
        flex: 'none',
        padding: 20,
        backgroundColor: '#2c303b',
        color: 'white',
        },
        chatListContainer: {
        padding: 20,
        width: '85%',
        display: 'flex',
        flexDirection: 'column',
        },
      }
      
     return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
        <aside style={styles.whosOnlineListContainer}>
        <WhosOnlineList
        currentUser={this.state.currentUser}
        users={this.state.currentRoom.users}
        />
        </aside>
        <section style={styles.chatListContainer}>
          <MessageList
            messages={this.state.messages}
            style={styles.chatList}
            />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm onSubmit={this.sendMessage} 
            onChange={this.sendTypingEvent}
            />
            </section>
           </div>
        </div>
      )
  }
  }
      
export default ChatPanel;