import React, { Component } from 'react';
import routes from './routes';
import './reset.css'
import './App.css';
import Menu from './Components/Menu'
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <header className='App-header'>
            <Menu/>
          </header>
          <main>
            {routes}
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
