import React from 'react';

class ItemsTable extends React.Component{

    renderList(){
        if (this.props.items){
                return this.props.items.map((realmItem)=>{
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
            <div>
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
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
       );
     }
}

export default ItemsTable;