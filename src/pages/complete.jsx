import React, { Component } from "react";
import billing from "../services/Billing"
class Complete extends Component {
    state = {
        complete: false, message: "Something Went Wrong..."
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const token = params.get('token'); 
        const PayerID = params.get('PayerID');

        billing.completeOrder(token, PayerID)
        .then(response => {
            if (response === undefined || response.data === null) return
            this.setState({complete: true});
            this.setState({message: response.data.message});
            console.log(response);
        }
        ).catch(error => console.log(error));
    }

    render() {
        if (!this.state.complete) {
            return (
                <div>
                    <h1>Checking Order Status...</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>{this.state.message}</h1>
                </div>
            )
        }
        
    }
}


export default Complete;