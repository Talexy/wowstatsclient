import React, { Component } from 'react';
import axios from 'axios';
import Timer from './components/Timer';
import ItemsTable from './components/ItemsTable';

class App extends Component {
  
constructor(props){
    super(props);
    
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

  getItems = async () => {
      console.log("getItems");
      await axios.post('https://wowstatsjava.herokuapp.com/api/items/all')
        .then(res => {
            console.log(res.data);
            var listItems = res.data;
            this.setState({ activated:"true", items:listItems});
          });
  }

   getRealmsAll = async () => {
    await axios.post('https://wowstatsjava.herokuapp.com/api/realm/all')
        .then(res => {
            console.log("getRealmsAll");
          });
  }

  getRealmsLeft = async () => {
    await axios.post('https://wowstatsjava.herokuapp.com/api/realm/left')
      .then(res => {
          console.log("getRealmsLeft");
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
