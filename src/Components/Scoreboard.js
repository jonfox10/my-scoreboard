import React, {Component} from 'react';
import './Scoreboard.css'
import Countdown from 'react-countdown-now';







class Scoreboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            score1: 0,
            score2: 0,
            team1Posession: true,
            time: this.props.time,
        }

        
        
        
        
    }
    addOneT1 = (event) =>  {
        this.setState({ score1: this.state.score1 += 1})
    };
    addTwoT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 += 2})
    };
    addThreeT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 += 3})
    };
    minusOneT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 -= 1})
    };
    minusTwoT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 -= 2})
    };
    minusThreeT1 = (event) =>  {
        this.setState({
            score1: this.state.score1 -= 3})
    };
    addOneT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 += 1})
    };
    addTwoT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 += 2})
    };
    addThreeT2 = (event, team) =>  {
        this.setState({
            score2: this.state.score2 += 3})
    };
    minusOneT2 = (event) =>  {
        this.setState({
            score2: this.state.score2 -= 1})
    };
    minusTwoT2 = (event) =>  {
        this.setState({
            score2: this.state.score2 -= 2})
    };
    minusThreeT2 = (event) =>  {
        this.setState({
            score2: this.state.score2 -= 3})
    };

    completionist = () => <span>'00:00'</span>;

    renderer = ({minutes, seconds, completed}) => {
        if (completed) {
            return <completionist />;
        } else {
            return <h1>0{minutes}:{seconds}</h1>
        }
    }



    // handleSubtractScore = () => ;
  render(){
    return (
        <div>
            <div className='scoreboardBody'>
                <div className='scoreboardContainer'>
                      {/* <h1 className='clock'> {this.props.minutes}:{this.props.seconds}</h1> */}
                        <Countdown
                        date={Date.now() + 500000}
                        renderer={this.renderer}
                        className='clock'
                        autoStart='false'
                        controlled='false'

                        />
                        <h3 className='poss1'>POSS</h3>
                        <h3 className='poss2'>POSS</h3>
                      <div className='team1'>
                        <h3 id='team1'>{this.props.team1}</h3>
                        <h1>{this.state.score1}</h1>
                      </div>
                      <div className='per'>
                        <p>PER:</p>
                        <h1>ot</h1>
                      </div>
                      <div className='team2'>
                        <h3 id='team2'>{this.props.team2}</h3>
                        <h1>{this.state.score2}</h1>
                      </div>
                </div>
            </div>
            <div className='ctrls'>
                <div className='timeCtrl'>
                    TIME: 
                    <button onClick={this.props.startCountDown} id='timeBtn'>start</button>
                    <button id='timeBtn'>stop</button>
                    <input type='time'></input>
                    <button id='timeBtn'>reset</button>
                    P:<input type='number'></input>
                </div>
                <div className='team1Ctrl'>
                    TEAM 1
                    <div>
                        <button id='scoreBtnAdd' onClick={this.addOneT1}>+1</button>
                        <button id='scoreBtnAdd' onClick={this.addTwoT1}>+2</button>
                        <button id='scoreBtnAdd' onClick={this.addThreeT1}>+3</button>
                    </div>
                    <div>
                        <button id='scoreBtnMinus' onClick={this.minusOneT1}>-1</button>
                        <button id='scoreBtnMinus' onClick={this.minusTwoT1}>-2</button>
                        <button id='scoreBtnMinus' onClick={this.minusThreeT1}>-3</button>
                    </div>
                </div>
                <div className='team2Ctrl'>
                    TEAM 2
                    <div>
                        <button id='scoreBtnAdd' onClick={this.addOneT2}>+1</button>
                        <button id='scoreBtnAdd' onClick={this.addTwoT2}>+2</button>
                        <button id='scoreBtnAdd' onClick={this.addThreeT2}>+3</button>
                    </div>
                    <div>
                        <button id='scoreBtnMinus' onClick={this.minusOneT2}>-1</button>
                        <button id='scoreBtnMinus' onClick={this.minusTwoT2}>-2</button>
                        <button id='scoreBtnMinus' onClick={this.minusThreeT2}>-3</button>
                    </div>
                </div>
            </div>
                
        </div>
    )
  }
}

export default Scoreboard