import React from "react";
import bus1 from "./bus-01.png";
import bus2 from "./bus-02.png";
import bus3 from "./bus-03.png";
class PartnerGroup extends React.Component {
    state = {
        partner: {}
    };
    componentWillMount() {
        const { name, logo, description } = this.props.location.state;
        const partner = {
            name: name,
            logo: logo,
            description: description
        };
        this.setState({ partner: partner });
    }
    render() {
        const style = {
            backgroundImage: `url(${this.state.partner.logo})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        };
        return (
            <div>
                <div className="jumbotron" style={style}>
                    <div className="container">
                        <h1 className="display-3"><span class="badge badge-info">{this.state.partner.name}</span></h1>
                        <p
                            className="p-3 rounded"
                            style={{
                                backgroundColor: "rgba(250, 250, 250, 0.85)"
                            }}
                        >
                            {this.state.partner.description}
                        </p>
                    </div>
                </div>

                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 text-center">
                            <img className="img-fluid" src={bus1} alt="bus1" />
                            <h4>Express Parcel Delivery</h4>
                            <p>
                                Fast 1-5 day delivery to over 24 Province in
                                Cambodia
                            </p>
                        </div>
                        <div className="col-sm-4 text-center">
                            <img className="img-fluid" src={bus2} alt="bus1" />
                            <h4>Express Parcel Delivery</h4>
                            <p>Guaranteed pre 9 AM, 10:30 and 12PM Delivery.</p>
                        </div>
                        <div className="col-sm-4 text-center">
                            <img className="img-fluid" src={bus3} alt="bus1" />
                            <h4>Express Parcel Delivery</h4>
                            <p>
                                Cheap 2 – 5 day EU and 3 – 7 day worldwide
                                Delivery.
                            </p>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default PartnerGroup;
