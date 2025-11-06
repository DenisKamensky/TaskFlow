
import type {Meta, StoryObj} from '@storybook/react-vite';
import {fn} from 'storybook/test';
import {TaskCard} from "./TaskCard";

const meta = {
  title: 'Entities/Task/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onToggleComplete: fn(),
    onDelete: fn(),
  },
} satisfies Meta<typeof TaskCard>;

export default meta;

const mockTask = {
  id: '1',
  title: 'Изучить Storybook тестирование',
  description: 'Написать комплексные тесты для всех компонентов',
  completed: false,
  priority: 'high' as const,
  dueDate: new Date('2024-12-31'),
  tags: ['testing', 'storybook'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-15'),
};

type Story = StoryObj<typeof meta>;

const completedTask = {
  ...mockTask,
  id: '2',
  title: 'Завершенная задача',
  completed: true,
};

export const Default: Story = {
  args: {
    task: mockTask,
  },
};

export const Completed: Story = {
  args: {
    task: completedTask,
  },
};

export const WithoutDescription: Story = {
  args: {
    task: {
      ...mockTask,
      id: '3',
      description: undefined,
    },
  },
};

export const WithLongTitle: Story = {
  args: {
    task: {
      ...mockTask,
      id: '4',
      title: 'Очень длинное название задачи которое может занимать несколько строк и должно корректно отображаться в интерфейсе без поломки верстки',
    },
  },
};

export const ToggleCompletion: Story = {
  args: {
    task: mockTask,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Находим чекбокс и кликаем
    const checkbox = canvas.getByRole('checkbox');
    await userEvent.click(checkbox);
    
    // Проверяем, что обработчик вызван
    await expect(args.onToggleComplete).toHaveBeenCalledWith('1');
    await expect(args.onToggleComplete).toHaveBeenCalledTimes(1);
  },
};

export const ExpandAndCollapse: Story = {
  args: {
    task: mockTask,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Проверяем, что детали скрыты изначально
    const details = canvas.queryByText(mockTask.description!);
    expect(details).not.toBeInTheDocument();
    
    // Кликаем на заголовок для раскрытия
    const header = canvas.getByText(mockTask.title);
    await userEvent.click(header);
    
    // Проверяем, что детали появились
    const visibleDetails = canvas.getByText(mockTask.description!);
    await expect(visibleDetails).toBeVisible();
    
    // Кликаем снова для сворачивания
    await userEvent.click(header);
    
    // Проверяем, что детали скрылись
    expect(visibleDetails).not.toBeVisible();
  },
};

export const DeleteTask: Story = {
  args: {
    task: mockTask,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Сначала раскрываем детали
    const header = canvas.getByText(mockTask.title);
    await userEvent.click(header);
    
    // Находим и кликаем кнопку удаления
    const deleteButton = canvas.getByRole('button', { name: /удалить/i });
    await userEvent.click(deleteButton);
    
    // Проверяем вызов обработчика
    await expect(args.onDelete).toHaveBeenCalledWith('1');
    await expect(args.onDelete).toHaveBeenCalledTimes(1);
  },
};

export const HighPriority: Story = {
  args: {
    task: {
      ...mockTask,
      id: '5',
      priority: 'high',
      title: 'СРОЧНАЯ задача',
    },
  },
};

export const MediumPriority: Story = {
  args: {
    task: {
      ...mockTask,
      id: '6',
      priority: 'medium',
      title: 'Обычная задача',
    },
  },
};

export const LowPriority: Story = {
  args: {
    task: {
      ...mockTask,
      id: '7',
      priority: 'low',
      title: 'Несрочная задача',
    },
  },
};

export const WithMultipleTags: Story = {
  args: {
    task: {
      ...mockTask,
      id: '8',
      tags: ['urgent', 'backend', 'api', 'refactoring', 'testing'],
    },
  },
};

export const OverdueTask: Story = {
  args: {
    task: {
      ...mockTask,
      id: '9',
      dueDate: new Date('2023-01-01'), // Прошедшая дата
      title: 'Просроченная задача',
    },
  },
};

export const HoverStates: Story = {
  args: {
    task: mockTask,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const FocusState: Story = {
  args: {
    task: mockTask,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    checkbox.focus();
  },
};

export const DarkMode: Story = {
  args: {
    task: mockTask,
  },
  parameters: {
    themes: {
      default: 'dark',
    },
  },
};

export const InTaskList: Story = {
  args: {
    task: mockTask,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h3>Список задач</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Story />
          <Story />
          <Story />
        </div>
      </div>
    ),
  ],
};

export const MultipleCards: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <TaskCard 
        {...args} 
        task={{
          ...mockTask,
          id: '1',
          title: 'Первая задача',
          completed: false,
        }}
      />
      <TaskCard 
        {...args} 
        task={{
          ...mockTask,
          id: '2',
          title: 'Вторая задача',
          completed: true,
        }}
      />
      <TaskCard 
        {...args} 
        task={{
          ...mockTask,
          id: '3',
          title: 'Третья задача с очень длинным описанием',
          description: 'Это очень длинное описание задачи которое должно корректно отображаться в карточке без поломки верстки и с правильным переносом текста',
        }}
      />
    </div>
  ),
};

export const EmptyTask: Story = {
  args: {
    task: {
      id: '10',
      title: '',
      description: '',
      completed: false,
      priority: 'low',
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
};

export const VeryLongContent: Story = {
  args: {
    task: {
      ...mockTask,
      id: '11',
      title: 'A'.repeat(200),
      description: 'B'.repeat(1000),
      tags: ['very-long-tag-name'.repeat(5)],
    },
  },
};

export const SpecialCharacters: Story = {
  args: {
    task: {
      ...mockTask,
      id: '12',
      title: 'Задача с спецсимволами 🚀 ✅ ❌',
      description: 'HTML: <div>Test</div> & JavaScript: console.log("hello")',
      tags: ['emoji🎯', 'html<div>', 'js&script'],
    },
  },
};


export const CompleteWorkflow: Story = {
  args: {
    task: mockTask,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 1. Раскрываем детали
    const header = canvas.getByText(mockTask.title);
    await userEvent.click(header);
    
    // 2. Отмечаем как выполненную через кнопку
    const completeButton = canvas.getByRole('button', { name: /выполнить/i });
    await userEvent.click(completeButton);
    await expect(args.onToggleComplete).toHaveBeenCalledWith('1');
    
    // 3. Пробуем удалить
    const deleteButton = canvas.getByRole('button', { name: /удалить/i });
    await userEvent.click(deleteButton);
    await expect(args.onDelete).toHaveBeenCalledWith('1');
    
    // 4. Сворачиваем обратно
    await userEvent.click(header);
  },
};
