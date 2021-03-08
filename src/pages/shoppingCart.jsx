import React, { Component } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Button, Box} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import billing from "../services/Billing"
import {NotificationContainer, NotificationManager} from 'react-notifications';

const localStorage = require("local-storage");

class shoppingCart extends Component {

    state = {
        sum: 0,
        rows: [],  //{id:0, title: "Avenger", unitPrice: 105, quantity: 2, totalPrice: 201}, {id:1, title: "AvengerMe", quantity: 3, totalPrice: 21},
        quantity: 0
    }

    columns = [
        {field: 'title', headerName: 'Title', width: 150 },
        {field: 'unitPrice', headerName: 'Unit Price', width: 125},
        {field: 'quantity', headerName: 'Quantity', width: 300, renderCell: (params)=>{return <form><Box display="flex">
        <input
            className="form-input"
            type="number"
            placeholder={params.value[0]}
            onChange={(e)=>this.updateQuan(e.target.value)}
        /><Button width="100" variant="contained" color="secondary" onClick={() => this.changeQuantity(params.value)}>Update</Button></Box></form>}},
        {field: 'discount', headerName: 'Discount', width: 115},
        {field: 'totalPrice', headerName: 'Total', type: Number ,width: 105 },
        {field: 'delete', headerName: 'Delete', width: 100, renderCell: (params)=>{return <Button variant="contained" color="secondary" onClick={() => {this.deleteItem(params.value)}}> <DeleteIcon /></Button>},
        // {field: 'update', headerName: "Update", width: 125, renderCell: (params)=>{return <Button variant="contained" color="secondary">Update</Button>}
        }
      ];

    changeQuantity = (value) => {
        console.log(localStorage.get("email"), value[1], this.state.quantity);
        billing.updateQuantity(localStorage.get("email"), value[1], this.state.quantity)
        .then(response => {
            NotificationManager.info(response.data.message === null ? "Unknow Error" : response.data.message, "Message", 800);
        }
        ).catch(error => console.log(error));

        this.componentDidMount();
    }

    updateQuan = (value) => { 
        console.log(value);
        this.setState({ quantity: value });
    }

    deleteItem = (values) =>  {
        var movie_id = values[0];
        var email = values[1];
        billing.deleteTheItem(email, movie_id)
        .then(response => {
            console.log(response);
        }).catch(error => console.log(error));

        this.componentDidMount();
    }
    
    checkOut = () => {
        NotificationManager.info("Redircting to PayPal...");
        billing.checkOut(localStorage.get("email"))
        .then(response => {
            console.log(response);
            window.location.href = response.data.approve_url;
        }).catch(error => console.log(error));
    }

    componentDidMount() {
        console.log(localStorage.get("email"));
        var newRows = []
        var all = 0;
        billing.retrieveCart(localStorage.get("email"))
        .then( response => {
            console.log(response);
            if (response.data.resultCode === 312) {
                this.setState({rows: newRows});
                return;
            }
            for (var i=0; i<response.data.items.length; ++i) {
                if (response.data.items[i] === null) continue;
                newRows.push({id: i, title: response.data.items[i]["movie_title"], 
                quantity: [response.data.items[i]["quantity"], response.data.items[i]["movie_id"]], discount: response.data.items[i]["discount"], 
                unitPrice: response.data.items[i]["unit_price"], totalPrice: Math.round(response.data.items[i]["quantity"]*(1-(response.data.items[i]["discount"]))*response.data.items[i]["unit_price"] * 100) / 100,
                delete: [response.data.items[i]["movie_id"], response.data.items[i]["email"]]})

                all += Math.round(response.data.items[i]["quantity"]*(1-(response.data.items[i]["discount"]))*response.data.items[i]["unit_price"] * 100) / 100;
            }
            this.setState({sum: all});
            this.setState({rows: newRows});
            
        }
        ).catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <h1>My Cart</h1>
                <DataGrid rows={this.state.rows} columns={this.columns} pageSize={10} width={550}/>
                <form onSubmit={() => this.checkOut()}>
                <Box display="flex" p={1} m={1}>
                    <p p={1}><strong>Total Amount: {this.state.sum}</strong> &nbsp; &nbsp;
                        <Button p={1} variant="contained" color="secondary" onClick={() => this.checkOut()}>Check Out</Button> 
                    </p>
                </Box>
                </form>
                <br></br>
                <br></br>
                <br></br>
                <NotificationContainer/>
            </div>
        )
    }
}


export default shoppingCart;






