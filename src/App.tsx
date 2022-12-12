import { useState } from 'react'
import './App.scss'

type User = {
  userId: number;
  userName: string;
};

type LocalStorageType = <T>(key: string, initialValue: T) => [
  value: T,
  setValue: (value: T) => void,
];

const useLocalStorage: LocalStorageType = <T extends unknown>(
  key: string,
  initialValue: T,
) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const save = (item: T) => {
    setValue(item);
    localStorage.setItem(
      key,
      JSON.stringify(item),
    );
  };

  return [value, save];
};

function App() {
  const [todos, setTodos] = useLocalStorage<User[]>('todos', []);

  const increase = () => setTodos([
    {
      userId: 20,
      userName: 'Gigel',
    },
  ]);

  const decrease = () => setTodos([
    {
      userId: 20,
      userName: 'Gigel',
    },
    {
      userId: 10,
      userName: 'Ionel',
    },
  ]);

  return (
    <div className="App">
      <h1>React</h1>
      <div className="card">
        <button onClick={increase}>
          +
        </button>
      </div>
      <div className="card">
        <ul>
          {todos.map((user) => (
            <li key={user.userId}>
              User ID: {user.userId}, User name: {user.userName}
            </li>
          ))}
        </ul>
      </div>
      <div className="card">
        <button onClick={decrease}>
          -
        </button>
      </div>
    </div>
  )
}

export default App
