import React, { Component } from 'react';
import axios from 'axios';


class App extends Component {
  
constructor(props){
    super(props);
    this.state = {
      items:[],
      activated: "false"
    }
}

  componentDidMount(){
      console.log("componentDidMount")
  }

  getItems = () => {

      axios.post('https://wowstatsjava.herokuapp.com/api/items/all')
      .then(res => {
          console.log(res.data);
          var listItems = res.data;
          this.setState({ activated:"true", items:listItems});
        });
  }

  getRealmsAll = () => {

    axios.post('https://wowstatsjava.herokuapp.com/api/realm/all')
    .then(res => {
        console.log("getRealmsAll");
      });
  }

  getRealmsLeft = () => {

    axios.post('https://wowstatsjava.herokuapp.com/api/realm/left')
    .then(res => {
        console.log("getRealmsLeft");
      });
  }


  renderList(){
    if (this.state.items){
            return this.state.items.map((realmItem)=>{
                return(
                  <tr key={realmItem.realm+realmItem.item}>
                    <td>{realmItem.realm}</td>
                    <td>{realmItem.item}</td>
                    <td>{realmItem.curbid}</td>
                    <td>{realmItem.minbid}</td>
                    <td>{realmItem.globalmarket}</td>
                    <td>{realmItem.timeleft}</td>
                    <td>{realmItem.realmahqty}</td>
                    <td>{realmItem.nrbids}</td>
                  </tr>
                );});
    }

    return <tr><td>No items.</td></tr>
}
  
  render() {

    return (
      <div className="App">
          <div>
           Hello from Body 
          </div>
            <button onClick={this.getItems}>Get items</button>
            <button onClick={this.getRealmsAll}>RealmsAll</button>
            <button onClick={this.getRealmsLeft}>Realms Left</button>
            <div>
                Activated: {this.state.activated}
            </div>
            <div>
              <table>
                    <thead>
                      <tr>
                          <th>Realm</th>
                          <th>Item</th>
                          <th>Current Bid</th>
                          <th>Min Bid</th>
                          <th>Global market</th>
                          <th>Time left</th>
                          <th>Realm AH Qty</th>
                          <th>Nr. Bids</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
           </div>
        </div>
    );
  }
}

export default App;
