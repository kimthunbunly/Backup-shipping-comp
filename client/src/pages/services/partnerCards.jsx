import React from "react";
import { Link } from "react-router-dom";
class PartnerCard extends React.Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="card mb-4 box-shadow border border-success custom-shadow">
                    <img
                        className="card-img-top"
                        alt="Thumbnail [100%x225]"
                        src={this.props.logo}
                        data-holder-rendered="true"
                        style={{
                            height: 200,
                            width: "100%",
                            display: "block"
                        }}
                    />
                    <div className="card-body">
                        <h4 className="text-center">{this.props.name}</h4>
                        <p className="card-text">{this.props.description}</p>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group ml-auto">
                                <Link
                                    to={{
                                        pathname: "/partners",
                                        state: {
                                            name: this.props.name,
                                            logo: this.props.logo,
                                            description: this.props.description
                                        }
                                    }}
                                    className="btn btn-sm btn-outline-secondary text-uppercase"
                                >
                                    View more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PartnerCard;
