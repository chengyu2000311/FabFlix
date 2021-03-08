import React, { Component } from "react";
import {NotificationContainer} from 'react-notifications';
import { Autocomplete } from '@material-ui/lab';
import { Button, TextField, Box} from '@material-ui/core';
import 'react-notifications/lib/notifications.css';
import { DataGrid } from '@material-ui/data-grid';
import Movies from "../services/Movies.js"





class Movie extends Component {
  state = {
    query: "", title: null, year: null, director: null, genre: null, keyword: null,
    Limit: null, Offset: null,
    Orderby: null, Direction: null, rows: [] //{id: 1, title:'avenger', rating:8.9, director:'haoyu cheng', year:2019, movie_id: "asddhas213"}
  };
  
  toMovieDetail = (id) => {
    this.props.history.push({
      pathname: '/movieDetail',
      state: { movie_id: id }
    })
  }
  columns = [
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'rating', headerName: 'Rating', width: 100 },
    { field: 'director', headerName: 'Director', width: 200 },
    {field: 'year', headerName: 'Year', type: 'number',width: 100,},
    {field: 'movie_id', headerName: 'Details',width: 150, renderCell: (params)=> {return <Button variant="contained" onClick={() => {this.toMovieDetail(params.value)}}>Click</Button>}}
  ];
  
  choice = [
    { title: '10', category: "Limit", disabled: false },
    { title: '20', category: "Limit", disabled: false },
    { title: '50', category: "Limit", disabled: false },
    { title: '100', category: "Limit", disabled: false },
    { title: '5', category: "Offset", disabled: false },
    { title: '10', category: "Offset", disabled: false },
    { title: '20', category: "Offset", disabled: false },
    { title: '50', category: "Offset", disabled: false },
    { title: 'asc', category: "Direction",disabled: false },
    { title: 'desc', category: "Direction" ,disabled: false },
    { title: 'title', category: "Orderby", disabled: false  },
    { title: 'year', category: "Orderby", disabled: false  },
    { title: 'rating', category: "Orderby", disabled: false  }
  ];

  options = this.choice.map((option) => {
    return {
      ...option
    };
  });

  updateField = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, year, director, genre, Limit, Offset, Orderby, Direction, keyword } = this.state;
    console.log(title, year, Limit);
    Movies.search(title, year, director, genre, Direction, Limit, Offset, Orderby, keyword) 
      .then(response => {
        if (response.data["movies"] !== []) {
          var newRows = [];
          for (var i=0; i< response.data["movies"].length; ++i) {
            newRows.push({id: i, title: response.data["movies"][i]["title"], rating: response.data["movies"][i]["rating"], director: response.data["movies"][i]["director"], year: response.data["movies"][i]["year"], movie_id: response.data["movies"][i]["movie_id"]});
          }
          this.setState({rows: newRows});
        }
      })
      .catch(error => console.log(error));

  }



  updateSelection = (value) => {
    console.log(value);
                this.setState({Limit: null});
                this.setState({Offset: null});
                this.setState({Orderby: null});
                this.setState({Direction: null});
              if (value.length===0) {
                for (var k=0; k<this.choice.length; ++k) {
                  this.choice[k].disabled = false;
                }
              }
              var BasedCount = 0;
              var DirectionCount = 0;
              var LimitCount = 0;
              var OffsetCount = 0;
              var OrderByCount = 0;
              for (var i=0; i<value.length; ++i) {
                for (var j=0; j<this.choice.length; ++j) {
                  if (value[i]["category"] === this.choice[j].category) {
                    if (this.choice[j].category !== "BaseOn" || this.choice[j].title !== "keyword") this.choice[j].disabled = true;
                  } else{
                    this.choice[j].disabled = false;
                  }
                }

                if (value[i]["category"] === "BaseOn") BasedCount++;
                else if (value[i]["category"] === "Direction") DirectionCount++;
                else if (value[i]["category"] === "Limit") LimitCount++;
                else if (value[i]["category"] === "Offset") OffsetCount++;
                else if (value[i]["category"] === "Orderby") OrderByCount++;
                
                if (value[i]["category"] === "BaseOn") {
                  this.setState({[value[i]["title"]]: value[i]["title"]});

                } else {
                  this.setState({[value[i]["category"]]: value[i]["title"]});
                }
              }
              if (BasedCount === 0) this.setState({BaseOn: null});
              if (DirectionCount === 0) this.setState({Direction: null});
              if (LimitCount === 0) this.setState({Limit: null});
              if (OffsetCount === 0) this.setState({Offset: null});
              if (OrderByCount === 0) this.setState({Orderby: null});
            }
  
  
  render() {
    const { basedOn } = this.state;
    const genres = [{genre: "Adventure"}, {genre: "Fantasy"},
    {genre: "Animation"},
    {genre: "Drama"},
    {genre: "Horror"},
    {genre: "Action"},
    {genre: "Comedy"},
    {genre: "History"},
    {genre: "Western"},
    {genre: "Thriller"},
    {genre: "Crime"},
    {genre: "Documentary"},
    {genre: "Science Fiction"},
    {genre: "Mystery"},
    {genre: "Music"},
    {genre: "Romance"},
    {genre: "Family"},
    {genre: "War"},
    {genre: "TV Movie"}
  ];
    return (
      <div>
          <script>{console.log(this.state)}</script>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
            <TextField p={1} label="title" variant="filled" name="title" value={this.state.title === null ? "" : this.state.title} onChange={this.updateField}/>
            <TextField p={1} label="director" variant="filled" name="director" value={this.state.director === null ? "" : this.state.director} onChange={this.updateField}/>
            <TextField p={1} label="year" variant="filled" name="year" value={this.state.year === null ? "" : this.state.year} onChange={this.updateField}/>
            <TextField p={1} label="keyword" variant="filled" name="keyword" value={this.state.keyword === null ? "" : this.state.keyword} onChange={this.updateField}/>
            <Autocomplete p={1}
              options={genres}
              getOptionLabel={(option) => option.genre}
              style={{ width: 250 }}
              onChange = {(_, value) => {
                this.setState({genre: value === null ? null : value.genre});
              }} 
              renderInput={(params) => <TextField {...params} label="Genres" variant="outlined" />}
            />
            <Autocomplete p={1}
            multiple
            name="basedOn"
            freeSolo={false}
            getOptionDisabled={(options)=>{
              for (var i=0; i<this.choice.length; ++i) {
                if (options.title === this.choice[i].title && options.category === this.choice[i].category) {
                  return this.choice[i].disabled;
                }
              }
              return false;
            }}
            value={basedOn}
            onChange = {(_, value) => {
              this.updateSelection(value);
            }} 
            options={this.options.sort((a, b) => -b.category.localeCompare(a.category))}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.title}
            style={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Criteria" variant="outlined" />}
          />
          <Button p={1} variant="contained" type='submit' onSubmit={this.handleSubmit}> Search </Button> 
          </Box>
          </form>
          <DataGrid rows={this.state.rows} columns={this.columns} pageSize={10}/>
          {/* <script>{console.log(this.state)}</script> */}
          <NotificationContainer/>
      </div>
    )
  }
}

export default Movie;



