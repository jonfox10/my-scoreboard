import React, { Component } from 'react';
// import './App.css';
import './Home.css'
import utVdnScore from '../images/utvdnscore.png'


class Home extends Component {

  render() {
    
    return (
      <div className='home-container'>
        <div className="home-body">
          <h3>WELCOME TO <br/> MY SCOREBOARD APP</h3>
          <p>Please create an account and start keeping score for your games today!</p>
          <img src={utVdnScore} alt='scoreboard app screenshot'/>
        </div>
      </div>
    );
  }
}

export default Home;