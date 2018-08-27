import React from 'react';
import axios from 'axios'

export default class EditProfileInfoModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            password:'',
            confirm:'',
            phone:'',
            address:'',
            country:'',
            postCode:'',
            _id:''
        }
    }
    componentWillMount(e) {
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let token = user.token;
        axios
            .get(`/api/users/me`, { headers: { "X-Auth": token } })
            .then(res => {
                let user = res.data;
                if (user === null) {
                    console.log("Token Expire")
                } else {
                    this.setState({	_id:user._id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email,
                        address:user.address,
                        phone:user.phone,
                        country:user.country,
                        postCode:user.postCode})
                }
            });
    }
    handleChange(e){
            this.setState({[e.target.name]:e.target.value})
    }
    saveChange(event){
		event.preventDefault();
		let user = this.state;
		let vaild = this.state.password;
		let password = this.state.password;
		let confirm = this.state.confirm;
        let data = JSON.parse(localStorage.getItem("currentUser"));
        let token = data.token;
        let id = this.state._id;    
		if (vaild) {} else {
			alert('password not input')
			return null;
		}
		if (password === confirm) {} else {
			alert('password not match')
			return null;
		}
		if (vaild.length > 5) {
			// alert("Profile was Updated!")
			fetch(`/api/users/edit/${id}`, {
				method: 'PUT',
				headers: {
					'X-Auth': token,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(user)
			}).then(res => window.location ='./profile')
		} else {
			alert('password too short')
		}
	}
    render(){
    return (
        <div>
            <button
                type="button"
                className="btn text-light float-right  btn-success custom-shadow-button"
                data-toggle="modal"
                data-target="#editProfileInfo"
            >
                <i className="far fa-edit" /> Edit Info
            </button>

            <div
                className="modal fade"
                id="editProfileInfo"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="editProfileInfoTitle"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="editProfileInfoTitle"
                            >
                                Profile Edit
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           <div className="row">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="firstName">
                                        First Name:
                                    </label>
                                    <input type="text" className="form-control" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="lastName">
                                        Last Name:
                                    </label>
                                    <input type="text" className="form-control" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleChange.bind(this)}/>
                                </div>
                           </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    Email :
                                </label>
                                <input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="country">
                                        Country :
                                    </label>
                                    <input type="text" className="form-control" name="country"  id="country" value={this.state.country} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="postCode">
                                        Post Code :
                                    </label>
                                    <input type="number" className="form-control" name="postCode"  id="postCode" value={this.state.postCode} onChange={this.handleChange.bind(this)}/>
                                </div>
                           </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    Phone:
                                </label>
                                <input type="number" className="form-control" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">
                                    Address:
                                </label>
                                <input type="text" className="form-control" name="address" id="address" value={this.state.address} onChange={this.handleChange.bind(this)}/>
                            </div>
                           <div className="row">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="pass">
                                        Password :
                                    </label>
                                    <input type="password" className="form-control" name="password" id="pass" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}/>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="re-pass">
                                        Re-Password :
                                    </label>
                                    <input type="password" className="form-control" name="confirm" id="re-pass" placeholder="Re-Password" value={this.state.confirm} onChange={this.handleChange.bind(this)}/>
                                </div>
                           </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-success" onClick={this.saveChange.bind(this)}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}}

