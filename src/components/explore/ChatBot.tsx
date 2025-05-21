import React, { useState, useRef, useEffect } from 'react';
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
  min-width: 0; // Allows the input to shrink below its content size if necessary
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}50`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-right: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.8);
  font-size: 16px; // Explicitly set for mobile to prevent zoom/pan issues

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem; // Can revert to 1rem or other preferred size on desktop
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.accent}30`};
  }
`;

const SendButton = styled.button`
  flex-shrink: 0; // Prevents the button from shrinking
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // Adjusted padding for smaller screens
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-weight: 600;
  white-space: nowrap; // Prevents text from wrapping

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`}; // Restore original padding for larger screens
  }
  
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
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of messages when new messages are added
  useEffect(() => {
    if (messages.length > 0) { 
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Adjust scroll on input focus for mobile to keep input visible
  useEffect(() => {
    const inputElement = inputRef.current;
    const chatContainerElement = chatContainerRef.current;
    if (!inputElement) return;

    let isFocused = false;

    const adjustScrollForKeyboard = () => {
      if (!inputElement || !chatContainerElement || !window.visualViewport || !isFocused) return;

      // Delay to allow layout to settle after resize event or focus
      setTimeout(() => {
        if (!inputElement || !chatContainerElement || !window.visualViewport || !isFocused) return; // Re-check after timeout

        const inputRect = inputElement.getBoundingClientRect();
        const visualViewport = window.visualViewport;
        const bufferAboveKeyboard = 20; // Space between input and keyboard

        const desiredInputBottomRelativeToViewport = visualViewport.height - bufferAboveKeyboard;
        let scrollDeltaY = inputRect.bottom - desiredInputBottomRelativeToViewport;

        const estimatedHeaderHeight = 70; // IMPORTANT: Adjust to your actual fixed site header's height
        const chatContainerRect = chatContainerElement.getBoundingClientRect();

        // If scrolling by scrollDeltaY would push the ChatContainer top under the site header
        if (chatContainerRect.top - scrollDeltaY < estimatedHeaderHeight) {
          scrollDeltaY = chatContainerRect.top - estimatedHeaderHeight;
        }
        
        // Only scroll if a significant adjustment is needed (e.g., more than 5px)
        // And only scroll if the input is currently below its desired position (scrollDeltaY > 0) 
        // or if it's slightly above but we need to ensure it's not cut by header (covered by above logic)
        if (Math.abs(scrollDeltaY) > 5) {
          window.scrollBy({
            top: scrollDeltaY,
            behavior: 'smooth' // Can try 'instant' if 'smooth' feels laggy
          });
        }
      }, 200); // Delay in ms. Tune if needed.
    };

    const handleFocus = () => {
      isFocused = true;
      if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.visualViewport) {
        adjustScrollForKeyboard(); // Initial attempt on focus
        window.visualViewport.addEventListener('resize', adjustScrollForKeyboard);
      }
    };

    const handleBlur = () => {
      isFocused = false;
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustScrollForKeyboard);
      }
    };

    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);

    return () => {
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustScrollForKeyboard);
      }
    };
  }, []); // Runs once on mount

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      text: inputValue,
      isUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        text: `Echo: ${newMessage.text}`,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <ChatContainer ref={chatContainerRef}>
      <MessagesContainer>
        {messages.map((msg, index) => (
          <Message key={index} $isUser={msg.isUser}>
            <MessageBubble $isUser={msg.isUser}>
              {msg.text}
            </MessageBubble>
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <InputField
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatBot;