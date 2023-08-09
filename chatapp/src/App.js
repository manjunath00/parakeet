import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import GroupHistory from './components/GroupHistory';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const allMessages = [
  {
    message: 'Hello World',
    createdAt: new Date(2023, 7, 1, 7).toISOString(),
    username: 'john',
    isUser: false,
    messageId: 1,
  },
  {
    message: 'Intro Computer Science',
    createdAt: new Date(2023, 7, 2, 15).toISOString(),
    username: 'Jane',
    isUser: false,
    messageId: 2,
  },
  {
    message: 'Hello World',
    createdAt: new Date(2023, 7, 1, 7).toISOString(),
    username: 'john',
    isUser: false,
    messageId: 1,
  },
  {
    message: 'Intro Computer Science',
    createdAt: new Date(2023, 7, 2, 15).toISOString(),
    username: 'Jane',
    isUser: false,
    messageId: 2,
  },
  {
    message: 'Hello World',
    createdAt: new Date(2023, 7, 1, 7).toISOString(),
    username: 'john',
    isUser: false,
    messageId: 1,
  },
  {
    message: 'Intro Computer Science',
    createdAt: new Date(2023, 7, 2, 15).toISOString(),
    username: 'Jane',
    isUser: false,
    messageId: 2,
  },
  {
    message: 'Hello World',
    createdAt: new Date(2023, 7, 1, 7).toISOString(),
    username: 'john',
    isUser: false,
    messageId: 1,
  },
  {
    message: 'Intro Computer Science',
    createdAt: new Date(2023, 7, 2, 15).toISOString(),
    username: 'Jane',
    isUser: false,
    messageId: 2,
  },
  {
    message: 'Intro hello world',
    createdAt: new Date(2023, 7, 3, 17).toISOString(),
    username: 'You',
    isUser: true,
    messageId: 3,
  },
];

function App() {
  const [messages, setMessages] = useState(allMessages);
  const [socket, setSocket] = useState(null);
  
  useEffect(() => {
    const newSocket = io('http://localhost:6500');
    setSocket(newSocket);

    const onNewMessageReceived = (message) =>  {
      const allMessages = [...messages, message];

      setMessages(allMessages)
    };

    if (socket) {
      socket.on('on_new_message_receive', onNewMessageReceived);
    }

    return () => socket && socket.close()
  }, [])

  const onNewsMessageSubmit = (message) => {
    const obj = {
      message,
      createdAt: new Date().toISOString(),
      username: 'You',
      isUser: true,
      messageId: new Date().getTime(),
    };

    const newMsgArray = [...messages, ...[obj]];

    if (socket){ 
      socket.emit('on_new_message_send', obj)
    }

    setMessages(newMsgArray);
  };

  return (
    <div>
      <GroupHistory
        messages={messages}
        onNewMessageSubmit={onNewsMessageSubmit}
      />
    </div>
  );
}

export default App;
