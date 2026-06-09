import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedInput({ placeholder }) {
  const { colors } = useTheme();

  return (
    <input 
      placeholder={placeholder} 
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        padding: '0.5rem',
        borderRadius: '4px',
        width: '100%',
        boxSizing: 'border-box',
        marginBottom: '1rem'
      }}
    />
  );
}
