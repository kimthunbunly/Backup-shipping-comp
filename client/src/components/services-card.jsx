import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./card.css";
import ModalAuthRequired from "./auth-required-modal";

class CardService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.availableServices,
            user: {},
            statusCode: 0
        };
    }

    componentWillMount() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser !== null) {
            let uToken = currentUser.token;
            axios
                .get(`/api/users/me`, { headers: { "X-Auth": uToken } })
                .then(res => {
                    this.setState({ user: res.data, statusCode: res.status });
                });
        } else {
            console.log("not yet logged in");
        }
    }

    renderButton() {
        return this.state.statusCode === 200 ? (
            <Link
                to="/payment"
                className="btn btn-success w-100"
                onClick={this.takeService}
            >
                TAKE THIS
            </Link>
        ) : (
            <ModalAuthRequired />
        );
    }

    takeService = () => {
        localStorage.setItem("takenService", this.props.availableServices._id);
    };

    render() {
        return (
            <div className="col-sm-6">
                <div className="card mb-3 mt-3 form-shadow-control custom-border">
                    <div className="card-body service-card">
                        <div className="d-flex flex-column service-d-flex">
                            <div className=" service-company-logo">
                                <img
                                    src={
                                        this.props.availableServices.service
                                            .company.logo ||
                                        "https://www.vetmed.wisc.edu/wp-content/uploads/2016/10/default.jpg"
                                    }
                                    className="img-fluid img-thumbnail"
                                    alt={
                                        this.props.availableServices.service
                                            .company.name
                                    }
                                />
                            </div>
                            <br />
                            <div className="text-center">
                                <h2>
                                    <p>
                                        {
                                            this.props.availableServices.service
                                                .company.name
                                        }
                                    </p>
                                </h2>
                                <hr />
                                <h4>
                                    ETA:{" "}
                                    {this.props.availableServices.eta ||
                                        "5-10 h"}
                                </h4>
                                <h2>
                                    <span className="badge badge-primary">
                                        Price:{" "}
                                        {this.props.availableServices.price} USD
                                    </span>
                                </h2>
                            </div>
                            <br />
                            <div>{this.renderButton()}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CardInitialledParcel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            parcel: {}
        };
        
    }

    parcelLetter = ["A", "B", "C", "D", "E"];
    initSubParcelInfo = this.props.parcelInfo.map((parcel, index) => {
        return parcel.type === "package" ? (
            <tr key={index}>
                <th scope="row">Parcel {this.parcelLetter[index]}</th>
                <td>type: {parcel.type}</td>
                <td>quantity: {parcel.quantity}</td>
                <td>width: {parcel.width} cm</td>
                <td>height: {parcel.height} cm</td>
                <td>length: {parcel.length} cm</td>
                <td>weight: {parcel.weight} kg</td>
            </tr>
        ) : (
            <tr key={index}>
                <th scope="row">Parcel {this.parcelLetter[index]}</th>
                <td>type: {parcel.type}</td>
                <td>quantity: {parcel.quantity}</td>
                <td>size: {parcel.envelopeSize}</td>
                <td> </td>
                <td> </td>
            </tr>
        );
    });
    render() {
        return (
            <div className="card text-dark form-shadow-control">
                <div className="card-header">
                    <h3>Parcel Details</h3>
                </div>
                <div className="card-body">
                    <table className="table table-borderless table-responsive">
                        <tbody>
                            <tr className="table-secondary">
                                <th scope="row">From:</th>
                                <td>{this.props.shipment.shipFrom}</td>
                                <th scope="row">To:</th>
                                <td>{this.props.shipment.shipTo}</td>
                                <th scope="row">Type:</th>
                                <td>{this.props.shipment.shippingType}</td>
                                <td />
                            </tr>
                            {this.initSubParcelInfo}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export { CardService, CardInitialledParcel };
