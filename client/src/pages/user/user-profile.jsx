import React from "react";
import axios from "axios";

import "./profile.css";
import ChangeProfileImage from "../../components/modal-chang-profile-image";
import EditProfileInfoModal from "../../components/modal-change-user-information";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { firstName: "", lastName: "", email: "",country:"",postCode:"",phone:"",address:"" },
            editState: false,
            image:''
        };
    }

    componentWillMount() {
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let token = user.token;
        axios
            .get(`/api/users/me`, { headers: { "X-Auth": token } })
            .then(res => {
                let user = res.data;
                if (user===null) {
                    console.log("Token Expire")
                } else {
                    this.setState({ user: res.data });
                }
            });
            let img = localStorage.getItem('img');
            if (img) {
                this.setState({image:img})
            } else {
                this.setState({image:"https://image.flaticon.com/icons/svg/236/236832.svg"})
            }
    }

    render() {
        return (
            <div className="container card  mt-4 mb-4 custom-shadow">
                <div className="card-body">
                    <h3>Your Profile</h3>
                    <hr />
                    <div className="row">
                        <div className="col-md-5 col-sm-6 cus-margin-top">
                            <div className="card custom-pf-card text-light">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-center profile-photo">
                                        <div className="image-cropper text-center">
                                            <img
                                                className="rounded"
                                                src={this.state.image}
                                                alt="profile"
                                            />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <ChangeProfileImage />
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: 25,
                                            marginTop: 20
                                        }}
                                    >
                                        <p className="text-capitalize text-center">
                                            Name: {this.state.user.firstName}{" "}
                                            {this.state.user.lastName}
                                        </p>
                                        <p className="text-center">
                                            Email: {this.state.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7 col-sm-6">
                            <div className="card edit-pf-form pl-2">
                                <div className="card-body">
                                    <h4 className="text-capitalize">
                                        basic information
                                    </h4>
                                    <hr />
                                    <div className="row">
                                    <div className="col-sm-6 form-group">
                                        <label htmlFor="firstName">
                                            First Name:
                                        </label>
                                        <input type="text" className="form-control" name="firstName" disabled={!this.state.editState} value={this.state.user.firstName} />
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <label htmlFor="lastName">
                                            Last Name:
                                        </label>
                                        <input type="text" className="form-control" name="lastName" disabled={!this.state.editState} value={this.state.user.lastName} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email :
                                    </label>
                                    <input type="email" className="form-control" name="email" disabled={!this.state.editState} value={this.state.user.email} />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 form-group">
                                        <label htmlFor="country">
                                            Country :
                                        </label>
                                        <input type="text" className="form-control" name="country" disabled={!this.state.editState} value={this.state.user.country} />
                                    </div>
                                    <div className="col-sm-6 form-group">
                                        <label htmlFor="postCode">
                                            Post Code :
                                        </label>
                                        <input type="number" className="form-control" name="postCode" disabled={!this.state.editState} value={this.state.user.postCode} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">
                                        Phone:
                                    </label>
                                    <input type="number" className="form-control" name="phone" disabled={!this.state.editState} value={this.state.user.phone} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">
                                        Address:
                                    </label>
                                    <input type="text" className="form-control" name="address" disabled={!this.state.editState} value={this.state.user.address} />
                                </div>

                                    <EditProfileInfoModal />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;
