import React, { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';
import billing from "../services/Billing"


const localStorage = require("local-storage");

class OrderHis extends Component {

    state = {
        rows : [], load: true  //{id:0, date: "now", amount: "200USD", status: "completed"}
    }

    columns = [
        { field: 'date', headerName: 'Date', width: 400 },
        { field: 'amount', headerName: 'Amount', width: 150 },
        { field: 'status', headerName: 'state', width: 200 }
      ];

    componentDidMount() {
        console.log(localStorage.get("email"));
        var newRow = []
        billing.retrieveOrder(localStorage.get("email"))
        .then(response => {
            if (response.data.resultCode !== 3410) return;
            
            for (var i=0; i<response.data.transactions.length; ++i) {
                newRow.push({id:i, date: response.data.transactions[i]["update_time"], amount: response.data.transactions[i]["amount"].total+response.data.transactions[i]["amount"].currency,
                            status: response.data.transactions[i]["state"]});
            }

            this.setState({rows: newRow});
            this.setState({load: false});
            console.log(response);
        }).catch(error => console.log(error));
    }
    
    render() {

        if (this.state.load) {
            return (
                <div>
                    <h1>Order History</h1>
                    <h1>Loading...</h1>
                </div>
            )
        }else {
            return (
                <div>
                    <h1>Order History</h1>
                    <DataGrid rows={this.state.rows} columns={this.columns} pageSize={5}/>
                </div>
            )
        }
        
    }
}


export default OrderHis;