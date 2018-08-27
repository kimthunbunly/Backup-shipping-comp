import React from "react";
import "./index.css";
import bus1 from "../services/bus-01.png";
import bus2 from "../services/bus-02.png";
import bus3 from "../services/bus-03.png";

import InitParcelForm from "../../partials/forms/initial-parcel.jsx";

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <div className="main-page p-5">
                    <div className="container">
                        <div className="card custom-shadow">
                            <InitParcelForm />
                        </div>
                    </div>
                </div>
                <div className="jumbotron bg-transparent">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4 text-center">
                                <img
                                    className="img-fluid"
                                    src={bus1}
                                    alt="bus1"
                                />
                                <h4>Express Parcel Delivery</h4>
                                <p>
                                    Fast 1-5 day delivery to over 24 Province in
                                    Cambodia
                                </p>
                            </div>
                            <div className="col-sm-4 text-center">
                                <img
                                    className="img-fluid"
                                    src={bus2}
                                    alt="bus1"
                                />
                                <h4>Express Parcel Delivery</h4>
                                <p>
                                    Guaranteed pre 9 AM, 10:30 and 12PM
                                    Delivery.
                                </p>
                            </div>
                            <div className="col-sm-4 text-center">
                                <img
                                    className="img-fluid"
                                    src={bus3}
                                    alt="bus1"
                                />
                                <h4>Express Parcel Delivery</h4>
                                <p>
                                    Cheap 2 – 5 day EU and 3 – 7 day worldwide
                                    Delivery.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
