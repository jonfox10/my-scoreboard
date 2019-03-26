import React, { Component } from 'react';
// import routes from './routes';
import './reset.css'
import './App.css';
import Menu from './Components/Menu'
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from './Components/Home';
import GameCreator from './Components/GameCreator'
import Scoreboard from './Components/Scoreboard'
import Login from './Components/Login'
import UserHome from './Components/UserHome'


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    };
  }


  updateUser = (user) => {
    this.setState({
      user,
    });
  }


  render() {
    const { user } = this.state
    return (
      <HashRouter>
        <div className='App'>
          <header className='App-header'>
            <Menu user={user} updateUser={this.updateUser}/>
          </header>
          <main>
            <Switch>
              <Route exact path='/' render={(props) => <Home {...props} user={user} updateUser={this.updateUser}/>} />
              <Route path='/gamecreator' render={(props) => <GameCreator {...props} user={user} updateUser={this.updateUser} />}/>
              <Route path='/scoreboard' render={(props) => <Scoreboard {...props} user={user} updateUser={this.updateUser}/>} />
              <Route path='/login' render={(props) => <Login {...props} user={user} updateUser={this.updateUser}/>} />
              <Route path='/userhome' render={(props) => <UserHome {...props} user={user} updateUser={this.updateUser}/>} />
            </Switch>
          </main>
        </div>
      </HashRouter>
    );
  }
}

export default App;
