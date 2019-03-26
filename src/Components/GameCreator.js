import React, { Component } from 'react'
// import './App.css';
import './GameCreator.css'
import Scoreboard from './Scoreboard'
import axios from 'axios'
import buzzer from '../sounds/Door Buzzer-SoundBible.com-1567875395.mp3'



class GameCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamOne: 'HOME',
            teamTwo: 'AWAY',
            minutes: 0,
            seconds: '00',
            visible: false,
            clockStarted: false,
            clockStopped: true,
            clockRunning: false,
            periodMinutes: '',
            sport: 'basketball',
            user: {},
            game_id: 0,

        }
        
    }

    addGame = () => {
        // const { sport, teamOne, teamTwo, periodMinutes} = this.state;
        axios
            .post('/api/game', this.state)
            .catch(error => { 
                console.log(error.response.request.response);
                // alert(error.response.request.response)
            })

            
    }


    handleStartGame = () => {
        this.setState({
            visible: true,
            minutes: this.state.periodMinutes
        });
        // if(session.user){ 
        // }
        this.addGame();

    }

    handleStartSavedGame = (id) => {
        let userGame = this.props.userGames.filter(game => game.game_id === id);
        // console.log(this.props.userGames.filter(game => game.game_id === id));
            // console.log(userGame[0].team_one);
            this.setState({
                teamOne: userGame[0].team_one,
                teamTwo: userGame[0].team_two,
                periodMinutes: userGame[0].minutes_per_period,
                minutes: userGame[0].minutes_per_period,
                visible: true,
            });    
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    handleClear = () => {
        this.setState({
            teamOne: 'HOME',
            teamTwo: 'AWAY',
            minutes: 0,
            seconds: '00',
            visible: false,
            clockStarted: false,
            periodMinutes: '', 
        })
    }


    closeScoreboard = () => {
        const endGameConfirm = window.confirm('This will end your current game, do you wish to continue?');
        if(endGameConfirm){
            this.setState({
                visible: false
            })
            this.handleClear();
            this.handleClockStop();
        }
    }
    



    tick = () => {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);

        this.setState({
            minutes: min,
            seconds: sec
        })
        
        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                minutes: "0" + min,
            })
        }
        
        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
        }

        
        
        this.secondsRemaining--
        
    }

    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.secondsRemaining = time * 60;
        this.setState({
            clockStarted: true, clockStopped: false
        })
        console.log(this.state)
    }
    contCountDown = () => {
        if(this.state.minutes === 0 && this.state.seconds === '00'){
            console.log('does not work in current state');
        } else if(this.state.clockStarted && this.state.clockStopped){
            this.intervalHandle = setInterval(this.tick, 1000);
            this.setState({
                clockStopped: false, clockRunning: true
            })
        }
        console.log(this.state)
    }


    handleClockStop = () => {
        clearInterval(this.intervalHandle);
        this.setState({
            clockStopped: true,
            clockRunning: false
            
        })
        console.log(this.state)
    }
    newQtr = () => {
        if(this.state.clockStarted) {
            if(this.state.minutes < 1) {
                if(this.state.seconds === '00'){
                    this.setState({
                        clockStarted: false,
                        clockStopped: true,
                        clockRunning: false,
                        minutes: this.state.periodMinutes
                    })
                }
            }
            
        }
        console.log(this.state)
    }


    buzzer = () => {
        if(this.state.clockStarted && this.state.clockRunning){
            if(this.state.minutes === 0 && this.state.seconds === '00') {
                return (
                    <audio autoplay>
                        <source src={buzzer} type='audio/mp3'/>
                    </audio>
                )
            }
        }
    }

    


  render() {
    let userGames = this.props.userGames.map((game, index) => {
        return (
            <div
            key={`games${index}`}
            >
                <div className='startForm'>
                    <h3>SAVED GAME</h3>
                    <>
                        <div> 
                            <div>
                            team one: <span style={{color: '#D53900', fontSize: '4vmin'}}>{game.team_one}</span>
                            </div>              
                            {/* <input 
                                    type='text' 
                                    className='frmInput'
                                    name='team_one'
                                    placeholder={game.team_one}
                                    value={this.state.team_one}
                                    onChange={this.handleEditInput}
                                    maxLength='4'
                                    /> */}
                        </div> 
                        <div>
                            team two: <span style={{color: '#D53900', fontSize: '4vmin'}}>{game.team_two}</span>
                            {/* <input 
                                    type='text' 
                                    className='frmInput'
                                    name='team_two'
                                    value={this.state.team_two}
                                    placeholder={game.team_two}
                                    onChange={this.handleInputChange}
                                    maxLength='4'
                                    /> */}
                        </div> 
                        <div>
                        {/* <br/> */}
                        min per period: <span style={{color: '#D53900', fontSize: '4vmin'}}>{game.minutes_per_period}</span>
                        {/* <input 
                                type='number'
                                required
                                className='frmInput'
                                min='1'
                                max='60'
                                name='minutes_per_period'
                                // placeholder={game.minutes_per_period}
                                // defaultValue={game.minutes_per_period}
                                value={this.state.minutes_per_period}
                                onChange={this.handleInputChange}
                                /> */}
                        </div>
                        <div>
                            <button id='btnL' className='frmBtn' onClick={() => this.handleStartSavedGame(game.game_id)}>START GAME</button>
                            {/* <button className='frmBtn' onClick={() => this.handleEdit(game.game_id)}>EDIT</button> */}
                            <button id='btnR' className='frmBtn' onClick={() => this.props.deleteGame(game.game_id)}>DELETE</button>
                        </div>
                    </>
                </div>
            </div>
        )
    })
    return (
      <div className='gameCreator-container'>
          {!this.state.visible ? (
            <>
                <div className='startForm'>
                    <h3>NEW GAME</h3>
                    {/* <br/> */}
                    <>
                        <div>               
                            team one:
                            <input 
                                    type='text' 
                                    className='frmInput'
                                    name='teamOne'
                                    value={this.state.teamOne}
                                    onChange={this.handleInputChange}
                                    maxLength='4'
                                    />
                        </div> 
                        <div>
                            team two: 
                            <input 
                                    type='text' 
                                    className='frmInput'
                                    name='teamTwo'
                                    value={this.state.teamTwo}
                                    onChange={this.handleInputChange}
                                    maxLength='4'
                                    />
                        </div> 
                        <div>
                        {/* <br/> */}
                        Minutes Per Period: <input 
                                type='number'
                                required
                                className='frmInput'
                                min='1'
                                max='60'
                                name='periodMinutes'
                                placeholder='0'
                                value={this.state.periodMinutes}
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div>
                            <button id='btnL' className='frmBtn' onClick={this.handleStartGame}>START GAME</button>
                            <button id='btnR'className='frmBtn' onClick={this.handleClear}>CLEAR</button>
                        </div>
                    </>
                </div>
                {userGames}
            </>

          ) : (
            
            <Scoreboard 
                team1={this.state.teamOne}
                team2={this.state.teamTwo}
                visible={this.state.visible}
                minutes={this.state.minutes}
                seconds={this.state.seconds}
                startCountDown={this.startCountDown}
                handleClockStop={this.handleClockStop}
                contCountDown={this.contCountDown}
                clockStarted={this.state.clockStarted}
                clockStopped={this.state.clockStopped}
                clockRunning={this.state.clockRunning}
                newQtr={this.newQtr}
                closeScoreboard={this.closeScoreboard}
                buzzer={this.buzzer}
                />
            

          )
        }

      </div>
    );
  }
}

export default GameCreator;