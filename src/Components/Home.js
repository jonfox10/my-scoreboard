import React, { Component } from 'react';
// import './App.css';
import './Home.css'
import GameCreator from './GameCreator';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-body">
          <div className="home-header">
            <h2>MY SCOREBOARD APP</h2>
            <GameCreator/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;