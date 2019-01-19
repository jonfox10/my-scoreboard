import React, { Component } from 'react'
// import './App.css';
import './GameCreator.css'
import Scoreboard from './Scoreboard'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teamOne: '',
            teamTwo: '',
            periodMinutes: '',
            seconds: '00',
            visible: true,
            clockCounting: false
        }
        // this.secondsRemaining;
        // this.intervalHandle;
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClear = (event) => {
        this.setState({
            teamOne: '',
            teamTwo: '',
            periodMinutes: '',
            seconds: '00'
        })
    }

    tick = () => {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);

        this.setState({
            periodMinutes: min,
            seconds: sec
        })

        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                value: "0" + min,
            })
        }

        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
        }

        this.secondsRemaining--
    }
    
    startCountDown = () => {
        this.intervalHandle = setInterval(this.tick, 1000);

        let time = this.state.periodMinutes;

        this.secondsRemaining = time * 60;

    }

    handleStartGame = (event) => {
        this.setState({visible: true})
    }



  render() {
    //   const teamOne = this.state.teamOne;
    //   const teamTwo = this.state.teamTwo;
    return (
      <div>
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
            <div>
                { this.state.visible &&
                    <div>
                    <Scoreboard 
                        team1={this.state.teamOne}
                        team2={this.state.teamTwo}
                        time={this.state.periodMinutes}
                        visible={this.state.visible}
                        minutes={this.state.periodMinutes}
                        seconds={this.state.seconds}
                        startCountDown={this.startCountDown}
                        />
                    </div>
                

                }
            </div>

      </div>
    );
  }
}

export default App;