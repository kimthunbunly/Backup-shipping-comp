import React from "react";
import CardShippment from "./card-shippment";
import Trash from "./trash";
import axios from "axios";

export default class MyShippment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            valueDisable: [],
            noValue: false
        };
        this.deleteShip = this.deleteShip.bind(this);
    }
    deleteShip(v) {
        let id = v._id;
        let getToken = JSON.parse(localStorage.getItem("currentUser"));
        let token = getToken.token;
        fetch(`/api/my-shipment/cancel/${id}`, {
            method: "PUT",
            headers: {
                "X-Auth": token,
                "Content-Type": "application/json"
            },
            body: ""
        }).then(res => window.location.reload());
        // for(var i = 0; i < this.state.value.length; i++){
        // if(this.state.value[i] === v){
        //   delete this.state.value[i];
        //   }
        // }
    }
    componentDidMount() {
        let getToken = JSON.parse(localStorage.getItem("currentUser"));
        let token = getToken.token;
        
        axios
            .get(`/api/my-shipment/view`, { headers: { "X-Auth": token } })
            .then(
                res => {
                    let val = res.data;
                    for (var i = 0; i < val.length; i++) {
                        let x = val[i].status;
                        if (x === true) {
                            let value = this.state.value.slice();
                            value.push(val[i]);
                            this.setState({ value });
                        } else {
                            let valueDisable = this.state.valueDisable.slice();
                            valueDisable.push(val[i]);
                            this.setState({ valueDisable });
                        }
                    }
                },
                err => {
                    console.log(err.response);
                }
            )
            .catch(error => {
                this.setState({ noValue: true });
            });
    }
    render() {
        let { value, valueDisable } = this.state;
        return (
            <div className="container">
                <div className="bg-color">
                    <label id="label-form">MY SHIPPING</label>
                    <hr />
                    {this.state.noValue ? (
                        <div className="card cus-margin text-center">
                            <h3>Sorry you don't have shipment to show :(</h3>
                            <p>
                                Please go to homepage and choose you parcel :)
                            </p>
                        </div>
                    ) : null}
                    {value.map((data, i) => {
                        return (
                            <CardShippment
                                key={i}
                                imgUrl={data.trip.service.company.logo}
                                name={data.trip.service.company.name}
                                eta={data.trip.eta}
                                volume={data.totalVolume}
                                weight={data.totalWeight}
                                shipFrom={data.trip.route.from}
                                shipTo={data.trip.route.to}
                                price={data.price}
                                qty={data.nParcel}
                                delShip={this.deleteShip.bind(this, data)}
                                // deleteShip={this.deleteShip.bind(this,i)}
                            />
                        );
                    })}
                </div>
                <div className="bg-color disable-form">
                    <label id="label-form-red">Trash</label>
                    <hr />

                    {valueDisable.map((v, index) => {
                        return (
                            <Trash
                                key={[index]}
                                imgUrl={v.trip.service.company.logo}
                                name={v.trip.service.company.name}
                                eta={v.trip.eta}
                                volume={v.totalVolume}
                                weight={v.totalWeight}
                                shipFrom={v.trip.route.from}
                                shipTo={v.trip.route.to}
                                price={v.price}
                                qty={v.nParcel}
                            >
                                {v}
                            </Trash>
                        );
                    })}
                </div>
            </div>
        );
    }
}
