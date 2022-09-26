import { Task } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { FormEvent, useState } from 'react';
import { prisma } from '../lib/primsa';

type TaskProps = {
  data: Task[];
}

export default function App({ data }: TaskProps) {
  const [newTask, setNewTaks] = useState('');

  async function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    fetch('http://localhost:3000/api/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ title: newTask}),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return (
    <div>
      <ul>
        {data.map(task => <li className='text-4xl' key={task.id}>{task.title}</li>)}
      </ul>
      <form onSubmit={handleCreateTask}>
        <input value={newTask} onChange={e => setNewTaks(e.target.value)} type="text" />
        <button type="submit">Cadastrar Task</button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tasks = await prisma.task.findMany();

  const data = tasks.map((task) => ({ 
    id: task.id,
    title: task.title,
    isDone: task.isDone,
    date: task.createdAt.toISOString(),
  }));


  return {
    props: {
      data
    }
  }
}
