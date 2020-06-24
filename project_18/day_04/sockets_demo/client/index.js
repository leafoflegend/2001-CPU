import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

const app = document.querySelector('#app');

const socket = io();

class ChatApp extends React.Component {
  constructor() {
    super();

    this.state = {
      chats: [],
      message: '',
    }

    this.handleMessage = this.handleMessage.bind(this);
    this.submitChat = this.submitChat.bind(this);
  }

  componentDidMount() {
    socket.on('chat', (chat) => {
      console.log('Received Event!', chat);

      this.setState({
        chats: this.state.chats.concat([chat]),
      }, () => {
        console.log(this.state);
      });
    });
  }

  componentDidUpdate() {
    const chatBox = document.querySelector('#chat_box');

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  submitChat() {
    const { message } = this.state;

    socket.emit('chat', { message });
    this.handleMessage('');
  }

  handleMessage(message) {
    this.setState({
      message,
    });
  }

  render() {
    const { chats, message } = this.state;

    return (
      <React.Fragment>
        <div
          id={'chat_box'}
          style={{
            maxHeight: '500px',
            overflowY: 'scroll',
          }}
        >
            {
              chats.map((chat) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2em' }}> {chat.user} </p>
                    <p style={{ margin: 0 }}> {chat.message} </p>
                  </div>
                )
              })
            }
        </div>
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              this.submitChat();
            }
          }}
        >
          <input
            onChange={(e) => this.handleMessage(e.target.value)}
            value={message}
          />
          <button
            onClick={this.submitChat}
          >
            Send
          </button>
        </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <ChatApp />,
  app,
  () => {
    console.log('Application rendered!');
  },
);

// TODO: Did not work as expected.
// const ChatApp = () => {
//   const [chats, setChats] = useState([]);
//   const [message, handleMessage] = useState('');
//
//   useEffect(() => {
//     socket.on('chat', (chat) => {
//       console.log('Received Event!', chat);
//
//       setChats([...chats, chat]);
//
//       console.log(chats);
//     });
//   }, []);
//
//   const submitChat = () => {
//     socket.emit('chat', { message });
//     handleMessage('');
//   }
//
//   return (
//     <div>
//       <ul>
//         {
//           chats.map(chat => {
//             <li>
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                 }}
//               >
//                 <h5> {chat.user} </h5>
//                 <p> {chat.message} </p>
//               </div>
//             </li>
//           })
//         }
//       </ul>
//       <input
//         onChange={(e) => handleMessage(e.target.value)}
//         value={message}
//       />
//       <button
//         onClick={submitChat}
//       >
//         Send
//       </button>
//     </div>
//   )
// }
