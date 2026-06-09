import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedButton({ children, onClick, variant = 'primary' }) {
  const { colors } = useTheme();

  const isPrimary = variant === 'primary';
  const backgroundColor = isPrimary ? colors.primary : 'transparent';
  const color = isPrimary ? colors.primaryText : colors.primary;

  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor,
        color,
        border: `1px solid ${colors.primary}`,
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s',
        marginRight: '0.5rem'
      }}
    >
      {children}
    </button>
  );
}
