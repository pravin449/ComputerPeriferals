import React, { Component} from 'react';
import SingleRecord from '../SingleRecord/SingleRecord'
import Loader from '../Loader/Loader'
import './MultipleRecords.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class MultipleRecords extends Component {

    constructor(props) {
      super(props);
      console.log(props);
      this.state = { 
        totalRecords: 0,
        records: "",
        pageCount: 10,
        currentPage: 1,
        sortType: 0,
        loading: true
      };
    }

    getAllRecords = (pageIndex, sortType) => {
      this.setState({loading: true});
      const apiPayload = {
        "filterObject": [],
        "pageIndex":pageIndex,
        "sortIndex":sortType
      };
      if(this.props.searchValue.length > 0) {
        apiPayload.filterObject = [{
          "filterType":"title",
          "value": this.props.searchValue
        }];
      }
      axios.post(`http://localhost:9000/allRecords`, apiPayload)
        .then(res => {
          console.log(res);
          this.setState({ 
            records: res.data.records,
            totalRecords: res.data.totalRecords,
            pageCount: res.data.totalPages,
            currentPage: res.data.currentPage,
            startRecord: res.data.startRecord,
            endRecord: res.data.endRecord,
            loading: false
          });
        })
    } 

    componentDidMount() {
      this.getAllRecords(1, this.state.sortType);
    }

    handlePageClick = (data) => {
      this.getAllRecords(data.selected+1, this.state.sortType);
    };

    sortButtonClick = (value) => {
      this.setState({
        sortType: value
      });
      this.getAllRecords(this.state.currentPage, value);
    }
  
    render() {
      return (
        <div className="record-page">
          <div className="sorting-section">
            <span>SortBy</span>
            <Button variant="light" onClick={() => this.sortButtonClick(1)} active={this.state.sortType === 1}>Price -- Low to High</Button>
            <Button variant="light" onClick={() => this.sortButtonClick(2)} active={this.state.sortType === 2}>Price -- High to Low</Button>
            <div>
              {this.state.totalRecords ? `(Showing ${this.state.startRecord} – ${this.state.endRecord} products of ${this.state.totalRecords} products)` :
                `(Showing ${this.state.totalRecords} products of ${this.state.totalRecords} products)` }
            </div>
          </div>
          
          { !this.state.loading ?
            <Container className="multiple-records">
              <Row className="multiple-records-row">
              {this.state.records.map((record) =>
                <SingleRecord record={record} key={record.title} />
              )}
              </Row>
              {this.state.records.length == 0 &&
                <h1  className="dis-mid">No records found try another filter</h1>
              }
            </Container> :
            <Loader/>
          }
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
        
      );
    }
    
  }
  
  export default MultipleRecords;
  