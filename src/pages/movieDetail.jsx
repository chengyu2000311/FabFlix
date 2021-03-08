import React, { Component } from "react";
import MovieEPs from "../services/Movies"
import Image from 'material-ui-image'
import { TextField, Container, Box, Button } from '@material-ui/core';
import Billing from "../services/Billing";
import {NotificationContainer, NotificationManager} from 'react-notifications';

const localStorage = require("local-storage");

class movieDetails extends Component {
    constructor(props) {
        super(props);
        this.movie_id = this.props.location.state.movie_id !== null ? this.props.location.state.movie_id : null;
        this.state = {
            response: null, backdrop_path: null, poster_path: null, show: null, quantity: 0, genres: "", people: "",
        }
        
    }


    componentDidMount() {
        MovieEPs.getMovieById(this.movie_id)
            .then(res => {
                if (res.data["resultCode"] === 210) {
                    this.setState({backdrop_path: res.data["movie"]["backdrop_path"]});
                    this.setState({poster_path: res.data["movie"]["poster_path"]});
                    this.setState({show: res.data["movie"]["poster_path"]});
                    this.setState({response: res});
                    var theGenre = "";
                    console.log(this.state.response.data["movie"]["genres"][0].name)
                    for (var i=0; i<this.state.response.data["movie"]["genres"].length; ++i) {
                        theGenre += this.state.response.data["movie"]["genres"][i].name+", ";
                    }
                    var thePeople = "";
                    console.log(this.state.response.data["movie"]["people"][0].name)
                    for (var j=0; j<this.state.response.data["movie"]["people"].length; ++j) {
                        thePeople += this.state.response.data["movie"]["people"][j].name+", ";
                    }

                    this.setState({genres: theGenre});
                    this.setState({people: thePeople});
                }
            }).catch(error => console.log(error))
        
        
    }

    changeImage = () => {
        if (this.state.show === this.state.response.data["movie"]["backdrop_path"]) {
            this.setState({show: this.state.poster_path});
        } else this.setState({show: this.state.backdrop_path});
    };

    handleSubmit = (e) => {
        e.preventDefault();

        Billing.insertIntoCart(localStorage.get("email"), this.state.response.data["movie"]["movie_id"], this.state.quantity)
        .then(res => {
            NotificationManager.success(res.data["message"], "Message" ,500);
            console.log(res);
        }).catch(error => console.log(error));
    }

    updateField = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
      };

    render() {
        if (this.state.response === null) {
            return (
            <div>
                <h1>Loading...</h1>
            </div>
            )
        } else{
            
            const style ={
                bgd:{
                    color: 'rgba(0,0,0,.25)',
                    backgroundImage: `url(${"https://image.tmdb.org/t/p/w500"+this.state.backdrop_path})`,
                    backgroundSize: 'cover',
                }
            }

            return (
                <div style={style.bgd}>
                    <script>{console.log(style)}</script>
                     {/* p={1} m={1} bgcolor="background.paper" */}
                    <Box display="flex" flexDirection="row" height={1} width={1} padding={3}> 
                    <Container>
                        <h2>{this.state.response.data["movie"]["title"]}</h2> 
                        <Image p={1} src={"https://image.tmdb.org/t/p/w500"+this.state.show} onClick={this.changeImage} alt="Pitcure Unavailable"/>
                        <br></br>
                        <form onSubmit={this.handleSubmit}>
                        <Box display="flex" p={1} m={1}>
                            
                            <TextField p={1} type="number" label="Quantity" variant="filled" name="quantity" value={this.state.quantity} onChange={this.updateField}/>
                            <Button p={1} variant="contained" color="secondary" onClick={this.handleSubmit}>Add to Cart</Button>
                            <Button p={1} variant="contained" color="secondary" onClick={()=>{this.props.history.push('/cart')}}>View Cart</Button>
                            
                        </Box>
                        </form>
                    </Container>
                    <Container maxWidth="sm">
                        <h2>Overview: {this.state.response.data["movie"]["overview"]}</h2>
                        <br></br>
                        <h2>Director: {this.state.response.data["movie"]["director"]} </h2>
                        <h2>Year: {this.state.response.data["movie"]["year"]}</h2>
                        <h2>Rating: {this.state.response.data["movie"]["rating"]}</h2>
                        <h2 >Votes: {this.state.response.data["movie"]["num_votes"]}</h2>
                        <h2 >Bugets: {this.state.response.data["movie"]["budget"]}</h2>
                        <h2 >Revenue: {this.state.response.data["movie"]["revenue"]}</h2>
                        <h2 >Genres: {this.state.genres}</h2>
                        <br></br>
                        <h2 >People:</h2> {this.state.people}
                    </Container>
                    </Box>
                    <NotificationContainer/>
                </div>
            )
        }   

        
    }
}


        // "title": "Avengers: Endgame",
        // "year": 2019",
        // "director": "Joe Russo",
        // "rating": 8.6,
        // "num_votes": 5269,
        // "budget": "356000000",
        // "revenue": "2485499739",
        // "overview": "After the devastating events of Avengers: Infinity War, the   
        //                          universe is in ruins due to the efforts of the Mad Titan, 
        //                          Thanos… "
        // "hidden": false,
        // "genres": [ {"genre_id": 28, "name": "Action"}, … ],
        // "people": [ {"person_id": 3223, "name": "Robert Downey Jr."}, … ]



export default movieDetails;



