import React from 'react';

export default class parceDetailFrom extends React.Component{
    render(){
        return(
            <div className="form-group row">                                        
                <div className="col-sm text-center"><p>Parcel {this.props.No}</p></div>
                <div className="col-sm"><p>{this.props.parcelData.type}</p></div>
                <div className="col-sm"><p>Quantity:{this.props.parcelData.quantity}</p></div>
                <div className="col-sm"><p>Weight:{this.props.parcelData.weight} kg</p></div>
                <div className="col-sm"><p>Lenght:{this.props.parcelData.length} cm</p></div>
                <div className="col-sm"><p>Height:{this.props.parcelData.height} cm</p></div>
                <div className="col-sm"><p>Width:{this.props.parcelData.width} cm</p></div>
            </div>
        );
    }
}

