import React from "react";
import axios from "axios";
import {
    CardService,
    CardInitialledParcel
} from "../../components/services-card.jsx";
import JsonView from "../../components/jsonView";

class AvailableServices extends React.Component {
    constructor(props) {
        super(props);
        this.state = { services: [] };
    }

    componentWillMount() {
        let myShipping = JSON.parse(localStorage.getItem("myShipping"));
        this.setState({
            shippingData: myShipping.shippingData,
            parcelData: myShipping.parcelData
        });

        let allParcel = myShipping.parcelData;
        let totalVolume = 0;
        let packageVolume = 1;

        for (let i = 0; i < allParcel.length; i++) {
            if (allParcel[i].type === "package") {
                packageVolume =
                    allParcel[i].width *
                    allParcel[i].height *
                    allParcel[i].length *
                    allParcel[i].quantity;
                totalVolume = totalVolume + packageVolume;
            }
        }

        let shipFrom = myShipping.shippingData.shipFrom;
        let shipTo = myShipping.shippingData.shipTo;

        let shipBy = myShipping.shippingData.shippingType;
        axios
            .post(
                `api/search/${shipFrom}-${shipTo}?/type=${shipBy}`,
                myShipping
            )
            .then(res => {
                localStorage.setItem("services", JSON.stringify(res.data));
                let val = res.data;
                if (val === "there is no available trip!") {
                    console.log("No Services");
                } else {
                    this.setState({ services: val });
                }
            })
            .catch("404");
    }

    render() {
        let myShipping = JSON.parse(localStorage.getItem("myShipping"));

        let renderAvailableServices =
            this.state.services.length > 0 ? (
                this.state.services.map((servicesProvider, index) => {
                    return (
                        <CardService
                            key={index}
                            availableServices={servicesProvider}
                        />
                    );
                })
            ) : (
                <div className="container text-center mt-4 mb-4 pt-4 pb-4 rounded">
                    <h2 className="bg-warning custom-shadow p-4">
                        we're sorry, there is no available service for you
                    </h2>
                </div>
            );
        return (
            <div className="container card mt-4 mb-4 custom-shadow">
                <div className="card-body">
                    <CardInitialledParcel
                        parcelInfo={this.state.parcelData}
                        shipment={this.state.shippingData}
                    />
                    <br />
                    <br />
                    <h2>JSON View</h2>
                    <JsonView
                        initData={myShipping}
                        services={this.state.services}
                    />
                    <br />
                    <br />
                    <h2>here are available services:</h2>
                    <hr />
                    <div className="row">{renderAvailableServices}</div>
                </div>
            </div>
        );
    }
}
export default AvailableServices;
export { CardInitialledParcel };
