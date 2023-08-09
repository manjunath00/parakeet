import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Form from './Form';

const NameHeader = styled.div`
  display: flex;
  font-weight: bold;
  padding-bottom: 4px;
  font-size: 1.1rem;
`;

const MessageText = styled.div`
  padding: 3px 0;
`;

const MessageHeader = styled.div``;

const Time = styled.div`
  text-align: right;
  font-size: 12px;
  color: grey;
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.right ? 'flex-end' : 'flex-start')};
  margin: 0 1rem;
`;

const MessageWrapper = styled.div`
  padding: 5px;
  max-width: max-content;
  background-color: white;
  margin: 10px 0;
  border-radius: 5px;
  padding: 12px 12px;
`;

const Message = (props) => {
  const { item: message } = props;

  const time = new Date(message.createdAt)

  return (
    <MessageContainer right={message.isUser}>
      <MessageWrapper>
        <NameHeader>
          <div>{message.username}</div>
        </NameHeader>
        <MessageHeader>
          <MessageText>
            <div>{message.message}</div>
          </MessageText>
          <Time>
            <div>
              {time.getHours()}:
              {time.getMinutes() > 9
                ? time.getMinutes() > 9
                : `${time.getMinutes()}0`}
            </div>
          </Time>
        </MessageHeader>
      </MessageWrapper>
    </MessageContainer>
  );
};

const HistoryContainer = styled.div`
  background-color: grey;
  padding: 1rem;
  margin: 0 auto;
  width: 500px;
  height: 700px;
  grid-template-rows: auto auto;
`;

const History = styled.div`
  overflow: scroll;
  height: 100%;
  height: 100%;
`;

const GroupName = styled.div`
  font-size: 1.5rem;
  padding: 10px 0;
  background-color: white;
  z-index: 100;
`;

const GroupHistory = (props) => {
  const { messages, onNewMessageSubmit } = props;

  return (
    <HistoryContainer>
      <GroupName>History Group</GroupName>
      <History>
        {messages.map((item) => (
          <Message item={item} key={item.messageId} />
        ))}
      </History>
      <Form onSubmit={onNewMessageSubmit} />
    </HistoryContainer>
  );
};

export default GroupHistory;
