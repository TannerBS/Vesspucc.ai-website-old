import React from 'react'
import styled from 'styled-components'
import { Theme } from '../../styles/theme'

interface AgentFilterProps {
  filter: string;
  setFilter: (filter: string) => void;
}

interface Category {
  id: string;
  name: string;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

interface FilterButtonProps {
  active: boolean;
  theme?: Theme;
}

const FilterButton = styled.button<FilterButtonProps>`
  background-color: ${({ active, theme }) => 
    active ? theme.colors.accent : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.white : theme.colors.secondary};
  border: 1px solid ${({ active, theme }) => 
    active ? theme.colors.accent : theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-weight: 600;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ active, theme }) => 
      active ? theme.colors.accent : `${theme.colors.secondary}20`};
  }
`;

const AgentFilter: React.FC<AgentFilterProps> = ({ filter, setFilter }) => {
  const categories: Category[] = [
    { id: 'all', name: 'All Agents' },
    { id: 'research', name: 'Research' },
    { id: 'data', name: 'Data Analysis' },
    { id: 'creative', name: 'Creative' },
    { id: 'development', name: 'Development' },
    { id: 'finance', name: 'Finance' },
    { id: 'education', name: 'Education' },
  ];
  
  return (
    <FilterContainer>
      {categories.map(category => (
        <FilterButton 
          key={category.id}
          active={filter === category.id}
          onClick={() => setFilter(category.id)}
        >
          {category.name}
        </FilterButton>
      ))}
    </FilterContainer>
  );
};

export default AgentFilter;