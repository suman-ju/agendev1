import React, { useState } from 'react';

const DEMO_EMAIL = 'student@example.com';
const DEMO_PASSWORD = 'password123';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError('Please enter both your email and password.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
    } else if (normalizedEmail !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError('That email and password do not match the demo account.');
    } else {
      setError('');
      onLogin();
    }
  }

  return (
    <main className="login-layout">
      <section className="login-card" aria-labelledby="login-title">
        <a className="brand" href="#home" aria-label="Daylist home">
          <span className="brand-mark" aria-hidden="true">✓</span>
          <span>daylist</span>
        </a>
        <div className="login-copy">
          <p className="eyebrow">A little more organized</p>
          <h1 id="login-title">Good things start<br />with a plan.</h1>
          <p className="muted">Sign in to make space for what matters today.</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
          <div className="password-label">
            <label htmlFor="password">Password</label>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary login-submit" type="submit">Sign in <span aria-hidden="true">→</span></button>
        </form>
        <p className="demo-hint"><span className="hint-dot" />Demo account <strong>student@example.com</strong> · <strong>password123</strong></p>
      </section>
      <aside className="login-art" aria-label="A calm space to plan your day">
        <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
        <div className="art-note note-back"><span className="note-check">✓</span><span>Take a proper lunch break</span></div>
        <div className="art-note note-front"><span className="note-check">✓</span><span>Finish the project proposal</span></div>
        <div className="art-sun" />
        <div className="art-caption"><span className="caption-line" /><p>One thing at a time.</p><span>Make today yours.</span></div>
        <span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✧</span>
      </aside>
    </main>
  );
}
