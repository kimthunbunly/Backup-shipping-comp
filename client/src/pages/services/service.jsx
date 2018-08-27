import React from "react";
import "./style.css";
import bus1 from "./bus-01.png";
import bus2 from "./bus-02.png";
import bus3 from "./bus-03.png";
import home1 from "./home-01.png";
import home2 from "./home-02.png";
import PartnerCard from "./partnerCards";

class AvailableServices extends React.Component {
    partners = [
        {
            name: "FedEx",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and    scrambled it to make a type specimen book.",
            logo:
                "https://logos-download.com/wp-content/uploads/2016/06/FedEx_logo.png",
            path: "hello"
        },
        {
            name: "DHL",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and    scrambled it to make a type specimen book.",
            logo:
                "http://saudigazette.com.sa/uploads/images/2017/12/16/634204.jpg",
            path: "hello"
        },
        {
            name: "CamboTicket",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and    scrambled it to make a type specimen book.",
            logo:
                "https://cdn.techinasia.com/data/images/fb569072912f35a3e8d1ea8748d0a232.jpg",
            path: "hello"
        }
    ];
    render() {
        return (
            <div className="container mt-4 mb-5 pb-5">
                <h2 className="mt-2">Our services</h2>
                <hr />
                <br />
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
                            Cheap 2 – 5 day EU and 3 – 7 day worldwide Delivery.
                        </p>
                    </div>
                </div>
                <br />

                <h2 className="text-center mt-5">Collection Parcel </h2>
                <div className="row justity-content-md-center">
                    <div className="col-sm-6 text-center">
                        <img
                            className="img-fluid"
                            src={home1}
                            alt="bus1"
                            id="img-size"
                        />
                        <h4>Courier Collection</h4>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </p>
                    </div>
                    <div className="col-sm-6 text-center">
                        <img
                            className="img-fluid"
                            src={home2}
                            alt="bus1"
                            id="img-size"
                        />
                        <h4>Parcel Delivery</h4>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </p>
                    </div>
                </div>
                <hr />
                <br />
                <div className="row">
                    {this.partners.map((partner, id) => {
                        return (
                            <PartnerCard
                                key={id}
                                name={partner.name}
                                logo={partner.logo}
                                description={partner.description}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}
export default AvailableServices;
