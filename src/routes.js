import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/Home';
import GameCreator from './Components/GameCreator'
import Scoreboard from './Components/Scoreboard'
import Login from './Components/Login'
import UserHome from './Components/UserHome'

export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/gamecreator' component={GameCreator} />
        <Route path='/scoreboard' component={Scoreboard}/>
        <Route path='/login' component={Login}/>
        <Route path='/userhome' component={UserHome}/>
    </Switch>
)