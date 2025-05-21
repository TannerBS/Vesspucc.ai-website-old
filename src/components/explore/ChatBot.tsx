import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh; // Adjusted height for mobile
  max-height: 500px; // Max height to prevent taking too much screen
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 70vh;
    max-height: none; // Remove max-height for larger screens
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md}; // Adjusted padding
  overflow-y: auto;
  background: rgba(245, 230, 211, 0.3);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Message = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => $isUser ? 'flex-end' : 'flex-start'};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // Adjusted margin

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%; // Allow slightly wider bubbles on mobile
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // Adjusted padding
  border-radius: ${({ theme, $isUser }) => 
    $isUser ? 
    `${theme.borderRadius.md} ${theme.borderRadius.md} 0 ${theme.borderRadius.md}` : 
    `${theme.borderRadius.md} ${theme.borderRadius.md} ${theme.borderRadius.md} 0`};
  background-color: ${({ $isUser, theme }) => 
    $isUser ? theme.colors.secondary : 'rgba(255, 255, 255, 0.7)'};
  color: ${({ $isUser, theme }) => 
    $isUser ? theme.colors.white : theme.colors.darkText};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  font-size: 0.9rem; // Adjust font size for messages

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 70%;
    padding: ${({ theme }) => theme.spacing.md};
    font-size: 1rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.sm}; // Adjusted padding
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.4);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const InputField = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}50`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-right: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.8);
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.accent}30`};
  }
`;

const SendButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-weight: 600;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        text: inputValue,
        isUser: true
      };
      
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: `I'm your Captain Gonzalo Coelho You said: "${inputValue}"`,
          isUser: false
        }]);
      }, 1000);
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} $isUser={message.isUser}>
            <MessageBubble $isUser={message.isUser}>
              {message.text}
            </MessageBubble>
          </Message>
        ))}
      </MessagesContainer>
      
      <InputContainer>
        <InputField 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBot;