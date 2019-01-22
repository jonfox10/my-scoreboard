import React, { Component } from 'react'
// import './App.css';
import './GameCreator.css'
import Scoreboard from './Scoreboard'

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
            periodMinutes: ''
        }
        
    }

    handleStartGame = (event) => {
        this.setState({
            visible: true,
            minutes: this.state.periodMinutes
        })
    }

    closeScoreboard = (event) => {
        this.setState({
            visible: false
        })
    }
    

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClear = (event) => {
        this.setState({
            teamOne: '',
            teamTwo: '',
            minutes: 0,
            seconds: 0
        })
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
        // if (min < 10) {
        //     this.setState({
        //         minutes: "0" + min,
        //     })
        // }
        
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
    }
    contCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({
            clockStopped: false, clockRunning: true
        })
    }

    handleClockStop = () => {
        clearInterval(this.intervalHandle);
        this.setState({
            clockStopped: true,
            clockRunning: false
            
        })
    }
    newQtr = () => {
        if(this.state.clockStarted) {
            if(this.state.minutes === 0) {
                if(this.state.seconds === 0){
                    this.setState({
                        clockStarted: false,
                        clockStopped: true,
                        clockRunning: false,
                        minutes: this.state.periodMinutes
                    })
                }
            }
            
        }
    }






  render() {
    //   const teamOne = this.state.teamOne;
    //   const teamTwo = this.state.teamTwo;
    return (
      <div>
          {!this.state.visible ? (
            <div className='startForm'>
                <h3 style={{fontSize: '6vmin', textDecoration: 'underline'}}>START GAME</h3>
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
                                />
                    </div> 
                    {/* <br/> */}
                    Minutes Per Period: <input 
                            type='number'
                            required
                            className='frmInput'
                            min='1'
                            max='60'
                            name='periodMinutes'
                            value={this.state.periodMinutes}
                            onChange={this.handleInputChange}
                            />
                    <div>
                        <button className='frmBtn' onClick={this.handleStartGame}>START GAME</button>
                        <button className='frmBtn' onClick={this.handleClear}>CLEAR</button>
                    </div>
                </>
            </div>

          ) : (
            <div>
                    <div>
                    <Scoreboard 
                        team1={this.state.teamOne}
                        team2={this.state.teamTwo}
                        time={this.state.minutes}
                        visible={this.state.visible}
                        minutes={this.state.minutes}
                        seconds={this.state.seconds}
                        startCountDown={this.startCountDown}
                        startClock={this.startClock}
                        stopClock={this.stopClock}
                        handleClockStart={this.handleClockStart}
                        handleClockStop={this.handleClockStop}
                        pauseClock={this.pauseClock}
                        contCountDown={this.contCountDown}
                        clockStarted={this.state.clockStarted}
                        clockStopped={this.state.clockStopped}
                        clockRunning={this.state.clockRunning}
                        newQtr={this.newQtr}
                        closeScoreboard={this.closeScoreboard}

                        />
                    </div>
            </div>

          )
        }

      </div>
    );
  }
}

export default GameCreator;