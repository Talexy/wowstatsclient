import React, { Component } from 'react';
import axios from 'axios';
import Timer from './components/Timer';
import ItemsTable from './components/ItemsTable';

class App extends Component {
  
constructor(props){
    super(props);

    this.clearItems();
    this.getRealmsAll();
    this.getItems();

    this.state = {
      items:[],
      activated: "false",
      refreshTimer: 360000,
    }
}

  componentDidMount(){
      console.log("componentDidMount");
      this.intervalID = setInterval(
        () => this.getRealmsLeft(),
        this.state.refreshTimer
      );
  }

  clearItems = async () => {
    console.log("clearItems request");
    await axios.post('https://wowstatsjava.herokuapp.com/api/items/clear')
      .then(res => {
          console.log("clearItems finished");
        });
}


  getItems = async () => {
      console.log("getItems request");
      await axios.post('https://wowstatsjava.herokuapp.com/api/items/all')
        .then(res => {
            console.log("getItems finished");
            console.log(res.data);
            var listItems = res.data;
            this.setState({ activated:"true", items:listItems});
          });
  }

   getRealmsAll = async () => {
    console.log("getItems getRealmsAll");
    await axios.post('https://wowstatsjava.herokuapp.com/api/realm/all')
        .then(res => {
            console.log("getRealmsAll finished");
          });
  }

  getRealmsLeft = async () => {
    console.log("getItems getRealmsLeft");
    await axios.post('https://wowstatsjava.herokuapp.com/api/realm/left')
      .then(res => {
          console.log("getRealmsLeft finished");
          this.getItems();
        });
  }
  
  render() {

    return (
      <div className="App">
          <div>
              <Timer minutes="5" seconds="59"/>
          </div>
            <button onClick={this.getItems}>Get items</button>
            {/* <button onClick={this.getRealmsAll}>RealmsAll</button> */}
            <button onClick={this.getRealmsLeft}>Realms Left</button>
            <div>
                Activated: {this.state.activated}
            </div>
                <ItemsTable items={this.state.items}/>
        </div>
    );
  }
}

export default App;
