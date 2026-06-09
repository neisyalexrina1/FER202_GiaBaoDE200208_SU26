import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemedCard({ title, children }) {
  const { colors } = useTheme();

  return (
    <div style={{
      backgroundColor: colors.surface,
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1rem',
      color: colors.text
    }}>
      {title && <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}
