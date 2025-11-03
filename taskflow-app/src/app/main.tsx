import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'

import './styles/global.css';
import './styles/variables.css';
import App from './App';
import { TaskCard } from '@/entities/task/ui/TaskCard/TaskCard';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskCard
      onDelete={() => {}}
      onToggleComplete={() => {}}
      task={{
        id: '1',
        title: 'demoTask',
        completed: false,
        description: 'lorem ipsum'
      }}
    />
  </StrictMode>,
)
