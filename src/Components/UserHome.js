import React, { Component } from 'react'
import './UserHome.css';
import GameCreator from './GameCreator'
import axios from 'axios'



class UserHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userGames: [],
            newGameToggle: true
            

        }    
    }

    async componentDidMount(){
        let res = await axios.get(`/api/games`);
        this.setState({userGames: res.data})
        console.log(this.state);
    }

    toggleHandler = () => {
        this.setState({
            newGameToggle: !this.state.newGameToggle
        })
        console.log(this.state);
    }

    render(){
        let games = this.state.userGames.map((game, index) => {
            return (
                <div
                key={`games${index}`}
                >
                    <h3>{game.team_one}</h3>
                    <h3>{game.team_two}</h3>
                    <h5>{game.minutes_per_period}</h5>
                    <button>start game</button>
                    <button>delete game</button>
                </div>
            )
        })
        let newGame = null;
        if (!this.state.newGameToggle){
            newGame = (
                <>
                    <button onClick={this.toggleHandler}>new game</button>
                    <GameCreator/>
                </>
            )
        } else {
            newGame = (
                <>
                </>
            )
        };



        return(
            <div className='user-container'>
                <div>
                    <h3>USER HOME</h3>
                    <button onClick={this.toggleHandler}>new game</button>
                    {/* <button>new game</button> */}
                    {newGame}
                </div>
                {/* <GameCreator/> */}
                {games}
            </div>
        )
    }
}

export default UserHome;