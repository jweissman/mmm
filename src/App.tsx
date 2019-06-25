import React from 'react';
import RecipeMaker from './components/RecipeMaker';
import './App.css';

const App: React.FC = () => {
  let message = "let's organize your recipes together!";
  return (
    <div className="App">
      <header className="App-header">
        <h1>mmmlang</h1>
        <h4>a tiny language for recipes</h4>
      </header>
      <main className="App-main">
        <h3>hello there</h3>
        <p>
          {message}
        </p>
        <RecipeMaker />
      </main>
    </div>
  );
}

export default App;
