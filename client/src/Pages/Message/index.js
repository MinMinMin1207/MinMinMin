import React, { Component, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Message.module.scss';

const cx = classNames.bind(styles);

// class Message extends Component 
//   state = {
//     messages: [],
//     newMessage: '',
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   fetchData = () => {
//     // fetch('YOUR_API_URL')
//     //   .then(response => response.json())
//     //   .then(data => this.setState({ messages: data }));
//     //   .catch(error => console.log(error));
//   };

//   handleChange = (event) => {
//     this.setState({ newMessage: event.target.value });
//   };



  function Message() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const handleSubmit = () => {
        fetch('YOUR_API_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: this.state.newMessage }),
        })
          .then(response => response.json())
          .then(data => {
    
            this.setState(prevState => ({
              messages: [...prevState.messages, data],
              newMessage: '',
            }));
          })
          .catch(error => console.log(error));
      };

    return (
      <div className={cx("message-container")}>
        <div className={cx("message-list")}>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div className={cx("message-input")}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      </div>
      
    );
  }

export default Message;