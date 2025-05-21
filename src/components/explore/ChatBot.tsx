import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; // ADDED - Allow ChatContainer to fill available space in ExplorePageContainer
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  overflow: hidden; // Keep this to manage internal scrolling of messages

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    // height: 70vh; // REMOVED
    // max-height: none; // REMOVED
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
    if (!inputElement) return;

    let isFocused = false;

    const adjustInputPosition = () => { // Renamed for clarity
      if (!inputElement || !window.visualViewport || !isFocused) return;

      setTimeout(() => {
        if (!inputElement || !window.visualViewport || !isFocused) return;

        const visualViewport = window.visualViewport;
        const inputContainer = inputElement.parentElement; // Assuming InputField is directly in InputContainer

        if (inputContainer) {
          // We want the InputContainer to be positioned just above the keyboard.
          // The visualViewport.height is the height of the viewport excluding the keyboard.
          // visualViewport.offsetTop is the offset of the visual viewport from the layout viewport origin,
          // which can be non-zero when the keyboard is up.
          
          // Calculate the available height for the chat content (MessagesContainer)
          // This is roughly the visual viewport height minus the input container height and any header.
          // This part is more about ensuring the InputContainer itself is positioned correctly.
          
          // The main goal is to adjust the bottom of the ChatContainer or InputContainer
          // so it aligns with the top of the keyboard (visualViewport.height).
          // This might involve setting the `bottom` style of the InputContainer dynamically
          // or adjusting padding/margins, rather than scrolling the whole window.

          // For a full-screen chat, we primarily want to ensure the InputContainer
          // is not obscured by the keyboard. The MessagesContainer should then use the remaining space.
          
          // Let's try to adjust the bottom padding of the ChatContainer or a similar approach
          // to effectively 'push up' the InputContainer.
          // This specific logic might need to be in ChatContainer's styled component or via direct style manipulation.
          
          // Given the new full-screen approach, direct window scrolling is less desirable.
          // The ChatContainer itself is now the main scrollable area (for messages).
          // The InputContainer should ideally stick to the bottom of the ChatContainer,
          // and the ChatContainer's height should adjust when the keyboard appears.

          // Let's simplify: The ExplorePageContainer is 100vh minus navbar.
          // ChatContainer is flex-grow: 1. InputContainer is at the bottom of ChatContainer.
          // When keyboard appears, visualViewport.height shrinks.
          // We need to ensure InputContainer is visible.
          // The most straightforward might be to adjust the padding-bottom of the ChatContainer
          // or the height of the MessagesContainer dynamically.

          // For this iteration, I will remove the window.scrollBy part.
          // The full-screen nature with overflow:hidden on ExplorePageContainer
          // means scrolling the window is not the right approach.
          // The internal layout of ChatBot (MessagesContainer, InputContainer) needs to adapt.
        }
      }, 100); // Short delay
    };

    const handleFocus = () => {
      isFocused = true;
      if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) && window.visualViewport) {
        // adjustInputPosition(); // Initial attempt on focus - might not be needed if resize handles it
        window.visualViewport.addEventListener('resize', adjustInputPosition);
      }
    };

    const handleBlur = () => {
      isFocused = false;
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustInputPosition);
      }
    };

    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);

    return () => {
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
      if (typeof window !== 'undefined' && window.visualViewport) {
        window.visualViewport.removeEventListener('resize', adjustInputPosition);
      }
    };
  }, []); // Dependencies: inputRef (implicitly)

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