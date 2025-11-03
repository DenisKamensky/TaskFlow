// 📁 src/shared/hooks/useToggle.demo.tsx
import React from 'react';
import {useToggle} from './useToggle';

export const ToggleDemo: React.FC = () => {
  const { value, toggle, setTrue, setFalse } = useToggle(false);
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      maxWidth: '400px',
      margin: '20px auto'
    }}>
      <h3>🔘 useToggle Demo</h3>
      
      <div style={{ margin: '15px 0' }}>
        <strong>Статус:</strong> 
        <span style={{ 
          color: value ? 'green' : 'red',
          fontWeight: 'bold',
          marginLeft: '10px'
        }}>
          {value ? 'ВКЛЮЧЕНО' : 'ВЫКЛЮЧЕНО'}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={toggle}
          style={buttonStyle}
        >
          🔄 Переключить
        </button>
        <button 
          onClick={setTrue}
          style={{...buttonStyle, backgroundColor: '#10b981'}}
        >
          ✅ Включить
        </button>
        <button 
          onClick={setFalse}
          style={{...buttonStyle, backgroundColor: '#ef4444'}}
        >
          ❌ Выключить
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#3b82f6',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px'
};