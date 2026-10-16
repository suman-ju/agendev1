import React, { useEffect, useMemo, useState } from 'react';

const TODOS_KEY = 'daylist-todos';
const FILTERS = ['All', 'Active', 'Completed'];

function readTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch {
    return [];
  }
}

export default function TodoPage({ onLogout }) {
  const [todos, setTodos] = useState(readTodos);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  }, [todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = useMemo(() => todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  }), [todos, filter]);

  function addTodo(event) {
    event.preventDefault();
    const title = newTodo.trim();
    if (!title) return;
    setTodos((currentTodos) => [...currentTodos, { id: crypto.randomUUID(), title, completed: false }]);
    setNewTodo('');
  }

  function toggleTodo(id) {
    setTodos((currentTodos) => currentTodos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  const today = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <main className="todo-page">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Daylist home"><span className="brand-mark" aria-hidden="true">✓</span><span>daylist</span></a>
        <div className="topbar-right"><span className="user-chip"><span className="avatar">S</span><span>Student</span></span><button className="button button-quiet" onClick={onLogout}>Log out <span aria-hidden="true">↗</span></button></div>
      </header>
      <section className="todo-content">
        <div className="welcome-row"><div><p className="eyebrow">{today}</p><h1>Your day, <span>your pace.</span></h1><p className="muted">A clear mind starts with a clear list.</p></div><div className="day-badge" aria-hidden="true"><span>✳</span><small>TAKE IT<br />ONE STEP AT A TIME</small></div></div>
        <form className="add-form" onSubmit={addTodo}>
          <span className="add-icon" aria-hidden="true">+</span>
          <label className="sr-only" htmlFor="new-todo">Add a new todo</label>
          <input id="new-todo" value={newTodo} onChange={(event) => setNewTodo(event.target.value)} placeholder="What needs your attention?" />
          <button className="button button-primary" type="submit">Add task <span aria-hidden="true">→</span></button>
        </form>
        <section className="list-card" aria-label="Your todo list">
          <div className="list-header"><div><h2>Tasks</h2><span className="task-count">{todos.length} {todos.length === 1 ? 'task' : 'tasks'}</span></div><div className="filters" role="group" aria-label="Filter todos">{FILTERS.map((item) => <button key={item} type="button" className={`filter-button ${filter === item ? 'selected' : ''}`} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          {visibleTodos.length > 0 ? <ul className="todo-list">{visibleTodos.map((todo) => <li className={`todo-item ${todo.completed ? 'completed' : ''}`} key={todo.id}><button type="button" className="todo-check" aria-label={`Mark ${todo.title} ${todo.completed ? 'active' : 'completed'}`} aria-pressed={todo.completed} onClick={() => toggleTodo(todo.id)}>{todo.completed && <span aria-hidden="true">✓</span>}</button><span className="todo-title">{todo.title}</span><button type="button" className="delete-button" aria-label={`Delete ${todo.title}`} onClick={() => deleteTodo(todo.id)}><span aria-hidden="true">×</span></button></li>)}</ul> : <div className="empty-state"><span className="empty-icon">{filter === 'Completed' ? '✧' : '✳'}</span><h3>{filter === 'Completed' ? 'Nothing completed yet' : filter === 'Active' ? 'You’re all caught up' : 'A fresh start'}</h3><p>{filter === 'Completed' ? 'Your finished tasks will feel right at home here.' : filter === 'Active' ? 'Enjoy the breathing room, or add another task.' : 'Add a task above and make today yours.'}</p></div>}
          <footer className="list-footer"><span className="remaining-dot" />{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} left to do</footer>
        </section>
        <p className="bottom-note"><span>✳</span> Small steps still move you forward.</p>
      </section>
    </main>
  );
}
