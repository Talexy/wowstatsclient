import React from 'react';


class Timer extends React.Component {

    constructor(props){
      super(props);
      this.state = { 
        minutes:this.props.minutes,
        seconds:this.props.seconds
      }
    } 
  
    componentDidMount(){
        this.intervalID = setInterval(
          () => this.tick(),
          1000
        );
    }
  
    tick() {
      
      var newSeconds = this.state.seconds-1;
      var newMinutes = this.state.minutes;
      
      if (newMinutes===0 && newSeconds===-1){
        this.setState({
          seconds: this.props.seconds,
          minutes:this.props.minutes
        });
  
        return;
      }
  
      if (newSeconds===-1) { 
          newSeconds = 59;
          newMinutes = newMinutes - 1;
      }
  
      this.setState({
        seconds: newSeconds, minutes:newMinutes
      });
    }
  
    render() {
       return (
        <div>Next refresh in {this.state.minutes}:{this.state.seconds}</div>
      );
    }
  }
  
  export default Timer;