
import React from 'react';
import {useToggle} from '@/shared/hooks/useToggle';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task,
  onToggleComplete,
  onDelete 
}) => {
  const {value: isExpanded, toggle: toggleExpanded } = useToggle(false);
  return (
    <div className="task-card" style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* Заголовок задачи */}
      <div 
        className="task-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={toggleExpanded}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <input 
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            onClick={(e) => e.stopPropagation()}
            style={{ width: '18px', height: '18px' }}
          />
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#6b7280' : '#1f2937',
            fontWeight: '500'
          }}>
            {task.title}
          </span>
        </div>
        
        <span style={{ fontSize: '12px', color: '#6b7280' }}>
          {isExpanded ? '▲ Свернуть' : '▼ Подробнее'}
        </span>
      </div>
      
      {/* Детали задачи (раскрывающиеся) */}
      {isExpanded && (
        <div className="task-details" style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}>
          {task.description && (
            <p style={{ 
              color: '#4b5563',
              marginBottom: '12px',
              lineHeight: '1.5'
            }}>
              {task.description}
            </p>
          )}
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => onToggleComplete(task.id)}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                backgroundColor: '#f3f4f6',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {task.completed ? '❌ Отменить' : '✅ Выполнить'}
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              style={{
                padding: '6px 12px',
                border: '1px solid #fca5a5',
                borderRadius: '4px',
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🗑️ Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};