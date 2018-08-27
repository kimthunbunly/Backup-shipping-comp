import React from "react";
import "./card.css";

class CardPartner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: this.props.testService
        };
    }

    render() {
        return (
            <div className="col-sm-6">
                <div className="card mb-3 mt-3 form-shadow-control" >
                    <div className="card-body service-card">
                        <div className="d-flex flex-column service-d-flex">
                            <div className=" service-company-logo">
                                <img
                                    src={this.state.service.img}
                                    className="img-fluid img-thumbnail"
                                    alt={this.state.service.companyName}
                                />
                            </div>
                            <br />
                            <div className="text-center">
                                <h2>
                                    <p>
                                        Company:{" "}
                                        {this.state.service.companyName}
                                    </p>
                                </h2>
                                <hr />
                                <h4>ETA: {this.state.service.eta}</h4>
                                <h2>Price: {this.state.service.price}</h2>
                            </div>
                            <br />
                            <div>
                                <a target="_blank" href={this.state.service.about}>
                                    <button className="btn btn-success float-right w-100 custom-shadow-button">
                                        View More
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardPartner;
