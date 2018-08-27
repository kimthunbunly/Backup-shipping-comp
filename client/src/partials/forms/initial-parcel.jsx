import React from "react";
import "./index.css";
import axios from "axios";

// import { Link } from "react-router-dom";

const PARCEL = {
    type: "package",
    quantity: 0,
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    envelopeSize: "",
    titleshiperr:""
};
export default class InitialParcelForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shipAddress: [],
            shipping: {
                shipFrom: "a",
                shipTo: "b",
                shippingType: "Drop Off"
            },
            parcels: [
                {
                    type: "package",
                    quantity: 0,
                    width: 0,
                    height: 0,
                    length: 0,
                    weight: 0,
                    envelopeSize: ""
                }
            ],
            classerr:"form-control",
            inputerr:false,
            shiperr:false,
            typeerr:"text",
            titleerr:""
        };
    }

    componentWillMount() {
        let shipAddress = [];
        axios.get(`api/routes`).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (!shipAddress.includes(res.data[i].from)) {
                    shipAddress.push(res.data[i].from);
                }
                if (!shipAddress.includes(res.data[i].to)) {
                    shipAddress.push(res.data[i].to);
                }
                this.setState({ shipAddress: shipAddress });
            }
        });
    }

    handleInputChange(mShipping) {
        this.setState(state => ({
            ...state,
            shipping: {
                ...state.shipping,
                ...mShipping
            }
        }));
    }
    checkerr(){
        let shipfrom = this.state.shipping.shipFrom
        let shipto = this.state.shipping.shipTo
        if  (shipfrom === shipto) {
            this.setState({shiperr:true,titleshiperr:"Cannot Use the same Province!"})
        } else {
            this.setState({shiperr:false})
        }
        console.log(shipfrom)
    }
    handleParcelChange(i, e) {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;
        let currentParcel = Object.assign({}, this.state);
        if (name === "quantity") {
            currentParcel.parcels[i].quantity = value;
        }
        if (name === "width") {
            currentParcel.parcels[i].width = value;
        }
        if (name === "height") {
            currentParcel.parcels[i].height = value;
        }
        if (name === "weight") {
            currentParcel.parcels[i].weight = value;
        }
        if (name === "length") {
            currentParcel.parcels[i].length = value;
        }
        if (name === "envelopeSize") {
            currentParcel.parcels[i].envelopeSize = value;
        }
        if (name === "shippingType") {
        }
        this.setState({ currentParcel });

        let quantity =  currentParcel.parcels[i].quantity;
        let width =  currentParcel.parcels[i].width;
        let height =  currentParcel.parcels[i].height;
        let weight =  currentParcel.parcels[i].weight;
        let length =  currentParcel.parcels[i].length;
        if  (!/^\d+$/g.test(quantity)) {
            this.setState({inputerr:true,typeerr:"number",titleerr:"Quantity Valid! Cannot Use Character! Use Number Only :)"})
        } else if(!/^\d+$/g.test(width)){
            this.setState({inputerr:true,typeerr:"number",titleerr:"Width Valid! Cannot Use Character! Use Number Only :)"})
        } else if(!/^\d+$/g.test(height)){
            this.setState({inputerr:true,typeerr:"number",titleerr:"Height Valid! Cannot Use Character! Use Number Only :)"})
        } else if(!/^\d+$/g.test(weight)){
            this.setState({inputerr:true,typeerr:"number",titleerr:"Weight Valid! Cannot Use Character! Use Number Only :)"})
        } else if(!/^\d+$/g.test(length)){
            this.setState({inputerr:true,typeerr:"number",titleerr:"Length Valid! Cannot Use Character! Use Number Only :)"})

            } else if  (quantity > 100) {
                this.setState({inputerr:true,typeerr:"number",titleerr:"Valid! Max of Quantity is 100 Only :("})
            } else if(width > 100){
                this.setState({inputerr:true,typeerr:"number",titleerr:"Valid! Max of Width is 100 Only :("})
            } else if(height > 100){
                this.setState({inputerr:true,typeerr:"number",titleerr:"Valid! Max of Height is 100 Only :("})
            } else if(length > 100){
                this.setState({inputerr:true,typeerr:"number",titleerr:"Valid! Max of Length is 100 Only :("})
            } else if(weight > 100){
                this.setState({inputerr:true,typeerr:"number",titleerr:"Valid! Max of Weight is 100 Only :("})
        } else{
            this.setState({inputerr:false,typeerr:"text"})
        }

    }

    addClick = () => {
        this.setState({
            parcels: this.state.parcels.concat([{ ...PARCEL }])
        });
    };

    removeClick = i => () => {
        this.setState({
            parcels: this.state.parcels.filter((s, sidx) => i !== sidx)
        });
    };

    handleTypeChange = i => evt => {
        const newParcel = this.state.parcels.map((parcel, sidx) => {
            if (i !== sidx) return parcel;
            return { ...parcel, type: evt.target.value };
        });

        this.setState({ parcels: newParcel });
    };

    parcelLetter = ["A", "B", "C", "D", "E"];
    envelopSizeSet = ["A10", "A9", "A8", "A7", "A6", "A2"];

    envelopeChoices = this.envelopSizeSet.map((size, i) => (
        <option key={i} value={size}>
            {size}
        </option>
    ));

    onSubmit(e) {
        e.preventDefault();
        let shipFrom = this.state.shipping.shipFrom;
        let shipTo = this.state.shipping.shipTo;
        let quantity =  this.state.parcels[0].quantity;
        let width =  this.state.parcels[0].width;
        let height =  this.state.parcels[0].height;
        let weight =  this.state.parcels[0].weight;
        let length =  this.state.parcels[0].length;
        let inputerr = this.state.inputerr;
        let shiperr = this.state.shiperr;
        if  (shipFrom === "a") {
            this.setState({shiperr:true,titleshiperr:"The Shipping From Not Input!"})
        } else if  (shipTo === "b") {
            this.setState({shiperr:true,titleshiperr:"The Shipping To Not Input!"})
        } else if  (quantity < 1) {
            this.setState({inputerr:true,titleerr:"Quantity not valid! Please input your Quantity :("})
        } else if(width < 1){
            this.setState({inputerr:true,titleerr:"Width not valid! Please input your Width :("})
        } else if(height < 1){
            this.setState({inputerr:true,titleerr:"Height not valid! Please input your Height :("})
        } else if(length < 1){
            this.setState({inputerr:true,titleerr:"Length not valid! Please input your Length :("})
        } else if(weight < 1){
            this.setState({inputerr:true,titleerr:"Weight not valid! Please input your Weight :("})
        } else if (shiperr === true) {
            alert("Please Check On The Shipping Information Again")
        } else if (inputerr === true){
            alert("Please Check On The Parcel Information Again")
        } else {
            this.pushData();
        }

    }
    pushData(){
        let err = this.state.shiperr;
        if (err === true) {
            alert("Please Check Information Again")
        } else {
            let parcelData = [];
            this.state.parcels.map(data => {
                if (data.type === "package") {
                    parcelData = parcelData.concat({
                        type: "package",
                        quantity: data.quantity,
                        width: data.width,
                        height: data.height,
                        length: data.length,
                        weight: data.weight
                    });
                } else {
                    parcelData = parcelData.concat({
                        type: "envelope",
                        quantity: data.quantity,
                        envelopeSize: data.envelopeSize
                    });
                }
                return parcelData;
            });
    
            let myShipping = {
                shippingData: this.state.shipping,
                parcelData: parcelData
            };
            // localStorage.setItem("myShipping", JSON.stringify(myShipping));
            // console.log(this.state.shipping);
    
            localStorage.setItem("myShipping", JSON.stringify(myShipping));
            window.location = "/generated-services";
        }
    }
    render() {
        const shippingAddress = this.state.shipAddress.map(
            (province, index) => (
                <option key={index} value={province}>
                    {province}
                </option>
            )
        );

        let renderInitParcel = this.state.parcels.map((parcel, i) => (
            <div className="mb-3" key={i}>
                <div key={i} className="input-group mb-2 form-shadow-control">
                    <div className="form-control alert-dark">
                        Parcel {this.parcelLetter[i]}
                    </div>
                    <select
                        id="parcelType"
                        className="form-control"
                        onChange={this.handleTypeChange(i)}
                    >
                        <option key="0" value="package">
                            package
                        </option>
                        <option key="1" value="envelope">
                            envelope
                        </option>
                    </select>
                    <input
                        type={this.state.typeerr}
                        
                        name="quantity"
                        maxLength={3}
                        onChange={e => this.handleParcelChange(i, e)}
                        placeholder="Quantity"
                        className={this.state.classerr} />
                    <div className="input-group-append">
                        <button
                            className="btn btn-danger"
                            type="button"
                            value="remove"
                            disabled={this.state.parcels.length <= 1}
                            onClick={this.removeClick(i)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
                {this.state.parcels[i].type === "package" ? (
                    <div className="input-group form-shadow-control">
                        <input
                            type={this.state.typeerr}
                            min={0}
                            max={100}
                            maxLength={3}
                            
                            placeholder="width(cm)"
                            className="form-control"
                            name="width"
                            onChange={e => this.handleParcelChange(i, e)}
                        />
                        <input
                            type={this.state.typeerr}
                            min={0}
                            max={100}
                            maxLength={3}
                            
                            placeholder="height(cm)"
                            className="form-control"
                            name="height"
                            onChange={e => this.handleParcelChange(i, e)}
                        />
                        <input
                            type={this.state.typeerr}
                            
                            min={0}
                            max={100}
                            maxLength={3}
                            placeholder="length(cm)"
                            name="length"
                            className="form-control"
                            onChange={e => this.handleParcelChange(i, e)}
                        />
                        <input
                            type={this.state.typeerr}
                            
                            min={0}
                            max={1000}
                            maxLength={3}
                            name="weight"
                            placeholder="weight(kg)"
                            className="form-control"
                            onChange={e => this.handleParcelChange(i, e)}
                        />
                    </div>
                ) : (
                    <div className="form-group form-row">
                        <div className="col-sm-4 offset-sm-8">
                            <select
                                name="envelopeSize"
                                className="custom-select custom-shadow-select"
                                id="selectDestinationAddress"
                                autoComplete="address-level1"
                                
                                onChange={e => this.handleParcelChange(i, e)}
                            >
                                <option value="">Envelope Size...</option>
                                {this.envelopeChoices}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        ));
        return (
            <div className="parcel-form">
                <h2>
                    <p>Initial Parcel</p>
                </h2>
                <hr />
                <form method="POST" onSubmit={e => this.onSubmit(e)}>
                    <h4>
                        <p>Shipping Information</p>
                    </h4>
                    <div className="form-row">
                        <div className="form-group col-sm-4">
                            <label htmlFor="selectOriginAddress">FROM:</label>
                            <select
                                className="custom-select custom-shadow-select"
                                autoComplete="address-level1"
                                id="selectOriginAddress"
                                name="fromProvince"
                                value={this.state.shipping.shipFrom}
                                onClick={this.checkerr.bind(this)}
                                onChange={e =>
                                    this.handleInputChange({
                                        shipFrom: e.target.value
                                    })
                                }
                                
                            >
                                <option value="a">Ship From...</option>
                                {shippingAddress}
                            </select>
                        </div>
                        <div className="form-group col-sm-4">
                            <label htmlFor="selectDestinationAddress">
                                TO:
                            </label>
                            <select
                                
                                name="toProvince"
                                className="custom-select custom-shadow-select"
                                id="selectDestinationAddress"
                                autoComplete="address-level1"
                                value={this.state.shipping.shipTo}
                                onClick={this.checkerr.bind(this)}
                                onChange={e =>
                                    this.handleInputChange({
                                        shipTo: e.target.value
                                    })
                                }
                            >
                                <option value="b">Ship To...</option>
                                {shippingAddress}
                            </select>
                        </div>

                        <div className="form-group col-sm-4">
                            <label htmlFor="shippingType">TYPE:</label>

                            <select
                                name="shippingType"
                                className="custom-select custom-shadow-select"
                                id="shippingType"
                                autoComplete="address-level1"
                                value={this.state.shipping.shippingType}
                                onChange={e =>
                                    this.handleInputChange({
                                        shippingType: e.target.value
                                    })
                                }
                            >
                                <option value="Drop Off">Drop Off</option>
                                <option value="Pick Up">Pick Up</option>
                            </select>
                        </div>
                    </div>
                    {this.state.shiperr ?
                        <div className="alert alert-danger" role="alert">
                            <strong>Warning!</strong> {this.state.titleshiperr}
                        </div>
                    :null}
                    <hr />
                    <h4>
                        <p>Parcel Information</p>
                    </h4>
                    {this.state.inputerr ?
                        <div className="alert alert-danger" role="alert">
                        <strong>{this.state.titleerr}</strong>
                    </div>
                    :null}
                    {renderInitParcel}

                    <button
                        className="btn btn-primary float-right custom-shadow-button"
                        type="button"
                        value="add more"
                        onClick={this.addClick}
                        disabled={this.state.parcels.length >= 5}
                    >
                        <i className="fas fa-plus" />
                    </button>
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn btn-success float-right custom-shadow-button"
                    >
                        START
                    </button>
                </form>
                </div>
        );
    }
}
