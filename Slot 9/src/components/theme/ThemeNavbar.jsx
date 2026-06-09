import React from 'react';
import { THEME_MODES, THEME_LABELS } from '../../data/themeConfig';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeNavbar() {
  const { mode, resolvedTheme, colors, changeMode } = useTheme();

  return (
    <nav style={{ 
      backgroundColor: colors.surface, 
      padding: '1rem', 
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <h2 style={{ margin: 0, color: colors.text }}>Theme Switcher</h2>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <span style={{ color: colors.textMuted }}>
          Đang áp dụng: <strong>{resolvedTheme === 'dark' ? 'Giao diện Tối' : 'Giao diện Sáng'}</strong>
        </span>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {THEME_MODES.map(m => (
            <button
              key={m}
              onClick={() => changeMode(m)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: `1px solid ${mode === m ? colors.primary : colors.border}`,
                backgroundColor: mode === m ? colors.primary : colors.background,
                color: mode === m ? colors.primaryText : colors.text,
                cursor: 'pointer',
                fontWeight: mode === m ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
            >
              {THEME_LABELS[m]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
