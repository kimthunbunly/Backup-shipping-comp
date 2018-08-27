import React from 'react';

export default class Userprofile extends React.Component{
    state={
        image:''
    }
    componentDidMount(){
        let img = localStorage.getItem('img');
        if (img) {
            this.setState({image:img})
        } else {
            this.setState({image:"https://image.flaticon.com/icons/svg/236/236832.svg"})
        }
    }
    render(){
        return(
                <form>
                    <div className="row">
                        <div className="col-sm-8 bg-col">
                            <div className="form-group bg-header">
                                <p><b>Edit Your Profile</b> <br/> Complete your Profile</p>
                            </div>
                            <div className="form-group row cus-pad">
                                <div className="col-sm-6">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="firstName"/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="lastName"/>
                                </div>
                            </div>
                            <div className="form-group row cus-pad">
                                <div className="col-sm-6">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" name="email" placeholder="email"/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Phone</label>
                                    <input type="number" className="form-control" name="phone" placeholder="phone"/>
                                </div>
                            </div>
                            <div className="form-group row cus-pad">
                                <div className="col-sm-12">
                                    <label>Home Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="address"/>
                                </div>
                            </div>
                            <div className="form-group row cus-pad">
                                <div className="col-sm-6">
                                    <label>Country</label>
                                    <input type="text" className="form-control" name="country" placeholder="country"/>
                                </div>
                                <div className="col-sm-6">
                                    <label>Post Code</label>
                                    <input type="number" className="form-control" name="postCode" placeholder="postCode"/>
                                </div>
                            </div>
                            <div className="form-group cus-pad">
                                <label htmlFor="exampleFormControlTextarea1">About me</label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <div className="form-group cus-pad">
                                <button className="btn btn-Update">Update</button>
                            </div>
                        </div>
                        <div className="col-sm bg-col">
                            <div className="form-group text-center cus-pad ">
                                <div className="img-fluid">
                                    <br/>
                                    <img className="img-style " src={this.state.image} alt="profile"/>
                                </div>
                                <br/>
                                <div className="text-titile">
                                    <p>CEO / CO-FOUNDER</p>
                                </div>
                                <div className="text-titile">
                                    <p><b>Alex Thompson</b></p>
                                </div>
                                <div className="text-titile">
                                   <p>Documentation and examples for opting images into responsive behavior (so they never become larger than their parent elements) and add lightweight styles to them—all via classes.</p>
                                </div>
                                <br/>
                                <div className="form-group cus-pad">
                                    <button className="btn btn-Update">Follow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
        );
    }
}