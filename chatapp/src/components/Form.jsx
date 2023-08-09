import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineSend } from 'react-icons/ai';

const Button = styled.button`
  border: none;
  background-color: white;
`;

const Input = styled.input`
  padding: 20px 10px;
  border-radius: 5px;
  outline: none;
  background-color: white;
  margin-right: 10px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 10px;
`;

const Form = (props) => {
  const { onSubmit: onMsgSubmit } = props;
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ message });
    onMsgSubmit(message);
    setMessage('');
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={onSubmit}>
        <Container>
          <Input
            type='text'
            name='message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button>
            <AiOutlineSend size={30} />
          </Button>
        </Container>
      </form>
    </div>
  );
};

export default Form;
