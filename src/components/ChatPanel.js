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
              <h2>Active Users</h2>
           </aside>
           <section style={styles.chatListContainer}>
                <h2></h2>
            </section>
           </div>
        </div>
      )
        }
      }
      

export default ChatPanel;