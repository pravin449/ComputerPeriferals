import React, { Component} from 'react';
import './App.scss';
import MultipleRecords from './components/MultipleRecords/MultipleRecords';
import SingleRecordDetails from './components/SingleRecordDetails/SingleRecordDetails';
import { Route, Switch, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {searchValue:""};
    this.myRef = React.createRef();
  }

  setSearch = () => {
    this.setState({searchValue: this.myRef.current.value})
  }

  clearSearch = () => {
    this.myRef.current.value = "";
    this.setState({searchValue: ""})
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header col-12">
          <Link to="/" className="col-1 title">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" 
              className="bi bi-house" 
              viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
          </Link>
          <div className="col-3 title">Computer Periferals</div>
          <InputGroup className="col-5">
            <FormControl
              placeholder="Search Computer Periferals"
              aria-label="Search Computer Periferals"
              aria-describedby="basic-addon2"
              ref={this.myRef}
            ></FormControl>
            <InputGroup.Append>
              <Button variant="outline-danger my-dan" onClick={() => this.clearSearch()}>X</Button>
              <Button variant="outline-secondary" onClick={() => this.setSearch()}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </header>
        <main className="App-body">
          <Switch>
              <Route path="/" exact 
                component={() => (
                  <MultipleRecords searchValue={this.state.searchValue}/>
                )}
              />
              <Route path="/selectedRecord" 
                render={(props) => (
                  <SingleRecordDetails {...props} />
                )}
              />
              <Route component={Error} />
          </Switch>
        </main>
        <footer className="App-footer">
          <h1>Computer Periferals</h1>
        </footer>
      </div>
    );
  }
}

export default App;
