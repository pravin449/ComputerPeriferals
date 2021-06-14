import React, { Component} from 'react';
import './SingleRecordDetails.scss';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Loader from '../Loader/Loader'

class SingleRecordDetails extends Component {

    constructor(props) {
      super(props);
      console.log(props);
      this.state = { 
        totalRecords: 0,
        records: "",
        pageCount: 10,
        currentPage: 1,
        sortType: 0,
        totalCount: 1,
        loading: true
      };
    }

    getAllRecords = (pageIndex, sortType) => {
      this.setState({loading: true});
      const apiPayload = {
        "filterObject": [{
            "filterType":"title",
            "value": this.props.location.state.title
          }],
        "pageIndex":pageIndex,
        "sortIndex":sortType
      };
      axios.post(`http://localhost:9000/allRecords`, apiPayload)
        .then(res => {
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
  
    render() {
        return (
            <>
                { this.state.totalRecords > 0 ?
                    <Container className="single-record-details col-md-12 col-sm-12 col-lg-12">
                        <Row>
                            <div className="col-md-12 record-product-type">{this.state.records[0].product_type}</div>
                        </Row>
                        <Row>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 single-record-image-section">
                                <img className="single-record-image" alt={this.state.records[0].title} src={this.state.records[0].image_link} />
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
                                <div className="record-product-title">{this.state.records[0].title}</div>
                                <div className={"record-product-price " + (this.state.records[0].sale_price ? 'salePriceActive' : '')}>
                                  RS. {this.state.records[0].price}
                                </div>
                                {this.state.records[0].sale_price &&<div className="record-product-sale-price">  Sale Price: {this.state.records[0].sale_price}</div>}
                                <div className="record-product-add">
                                    <input className="record-product-add-number" type="number"
                                    value={this.state.totalCount} onChange={event => this.setState({totalCount: event.target.value})}></input>
                                    <Button className="record-product-add-btn" variant="dark">Add To Cart</Button>
                                </div>
                                {this.state.records[0].condition &&<div className="record-product-description">Condition: {this.state.records[0].condition}</div>}
                                {this.state.records[0].availability &&<div className="record-product-description">Availability: {this.state.records[0].availability}</div>}
                                {this.state.records[0].brand &&<div className="record-product-description">Brand: {this.state.records[0].brand}</div>}
                                {this.state.records[0].color &&<div className="record-product-description">Color: {this.state.records[0].color}</div>}
                                {this.state.records[0].size &&<div className="record-product-description">Size: {this.state.records[0].size}</div>}
                                {this.state.records[0].gender &&<div className="record-product-description">Gender: {this.state.records[0].gender}</div>}
                                {this.state.records[0].age_group &&<div className="record-product-description">Age group: {this.state.records[0].age_group}</div>}
                                {this.state.records[0].tax &&<div className="record-product-description">Tax: {this.state.records[0].tax}</div>}
                                {this.state.records[0].google_product_category &&<div className="record-product-description">Google Product Category: {this.state.records[0].google_product_category}</div>}

                            </div>
                        </Row>
                        {this.state.records[0].description && <Row className="record-product-description">
                            <div className="col-md-12">Description :</div>
                            <div className="col-md-12">{this.state.records[0].description.split('|').map((description, index) =>
                                <li key={index}>{description}</li>
                              )}</div>
                        </Row>}
                    </Container> :
                    <Loader/>
                }
            </>
        );
       
    }
    
  }
  
  export default SingleRecordDetails;
  