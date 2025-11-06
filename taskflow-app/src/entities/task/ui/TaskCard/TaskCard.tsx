
import React from 'react';
import {useToggle} from '@/shared/hooks/useToggle';
import Button from '@/shared/ui/button';
import {Task} from '../../model/task-types';

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
      border: '1px solid var(--primary-variant)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-md)',
      marginBottom: '12px',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px var(--shadowColor)',
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
            <Button
              onClick={() => onToggleComplete(task.id)}
            >
              {task.completed ? '❌ Отменить' : '✅ Выполнить'}
            </Button>
            <Button
              onClick={() => onDelete(task.id)}
              type='danger'
            >
              🗑️ Удалить
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};