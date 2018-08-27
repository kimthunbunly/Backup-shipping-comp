import React from 'react';

export default class trash extends React.Component {
  render(){
    let price = this.props.price
    let fixprice = price.toFixed(2);
    return(
      <div className="card cus-margin-red">
      <div className="row text-center red">
        <div className="col-sm-4">
          <img className="img-fluid align-center" src={this.props.imgUrl} alt={this.props.name} />
        </div>
        <div className="col-sm-6">
          <label id="company-name">{this.props.name}</label>
          <p><b>From: </b> {this.props.shipFrom} <b> To: </b> {this.props.shipTo}</p>
          <p> <b>Volume: </b>{this.props.volume} cm<sup>3</sup> & <b>Weight: </b>{this.props.weight} kg</p>
          <p> <b>Quantity:</b> {this.props.qty} & <b>ETA</b> {this.props.eta} </p>
        </div>
        <div className="col-sm-2 align-center-trash">
          <p id="price-color"> {fixprice}$</p>
        </div>
      </div>
    </div>
      );
  }
}
