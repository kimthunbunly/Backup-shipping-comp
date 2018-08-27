import React from 'react';

export default class CardShippment extends React.Component {
  render(){
      let price = this.props.price
      let fixprice = price.toFixed(2);
    return(
      <div className="card cus-margin">
      <div className="row text-center">
        <div className="col-sm-4">
          <img className="img-fluid align-center" src={this.props.imgUrl} alt={this.props.name} />
        </div>
        <div className="col-sm-6">
          <label id="company-name">{this.props.name}</label>
          <p><b>From: </b> {this.props.shipFrom} <b> To: </b> {this.props.shipTo}</p>
          <p> <b>Total Volume: </b>{this.props.volume} m<sup>3</sup> & <b>Totoal Weight: </b>{this.props.weight} kg</p>
          <p> <b>Quantity:</b> {this.props.qty} & <b>ETA</b> {this.props.eta} </p>
        </div>
        <div className="col-sm-2 align-center">
          <p id="price-color"> {fixprice}$</p>
          <button type="button" className="btn btn-danger"
          onClick={(e) => { if (window.confirm('Are you sure to cancel this Shipment?')) this.props.delShip(e)}}>Cancel</button>
        </div>
      </div>
      {/* <div className="modal fade" id="exampleModalLong"  role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Move Shipment to Trash</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <h3>Are you sure to Cancel?</h3>
              {this.state.id}
            </div>
            <div className="modal-footer">
            
              <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
              <button type="button" className="btn btn-danger" onClick={this.deleteShip.bind(this ,this.state.id)} data-dismiss="modal">Yes</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
      );
  }
}
