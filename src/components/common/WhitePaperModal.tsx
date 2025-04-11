import React from 'react';
import styled from 'styled-components';

interface WhitePaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  background: rgba(245, 230, 211, 0.95);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.boxShadow.lg};
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.accent};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.header};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  /* Removed cursor: pointer to maintain the feather cursor */
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const ModalContent = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
`;

const WhitePaperModal: React.FC<WhitePaperModalProps> = ({ isOpen, onClose }) => {
  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>White Paper</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          {/* You can add your white paper content here later */}
          <p>White paper content will be added here.</p>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default WhitePaperModal;