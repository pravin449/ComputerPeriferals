import React from 'react';
import './SingleRecord.scss';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

function SingleRecord(props) {
  return (
    <div className="single-record">
      <div className="record-add">
        <Button variant="light" onClick={() => window.open(props.record.link)}>AD</Button>
      </div>
      <div className="record-in-stock">{props.record.availability}</div>
      <div className="image-section">
        <img className="single-record-image" alt={props.record.title} src={props.record.image_link} />
      </div>
      <div className="record-title">{props.record.title}</div>
      <div className="record-price">Rs. {props.record.price}</div>
      <div className="record-link-section">
        <Link className="record-link" to={{ pathname: "/selectedRecord", state: { "title": `${props.record.title}`} }}>ADD TO CART</Link>
      </div>
      
    </div>
  )
}
export default SingleRecord;