import React from "react";
import axios from "axios";
import './index.css';
import ParcelFrom from './parcelDetailFrom';
import QR from './frame.png';

export default class Payment extends React.Component{    
    constructor(){
        super();
        this.state = {
            firstItem : true,
            secondItem : false,
            wingCard:false,
            masterCard:false,
            checkValue:'',
            enableButton:false,
            refirstName:"",relastName:"",reemail:"",rephone:"",readdress:"",recountry:"",repostCode:"",
            parcelInfo:[],
            parcelData:[],
            paymentIfo:[],
            token:'',
            titleErr:"",
            titleErrDisable:false,
            changeClassButton:"btn btn-success",
            btnEdit:true,
            btnSave:false,
            disableForm:"disableForm",
            firstName:"firstName",lastName:"lastName",email:"email",phone:"phone",address:"address",country:"country",postCode:"postCode",_id:''
        }
        this.receiverInfo = this.receiverInfo.bind(this);
        this.onProfileChange = this.onProfileChange.bind(this);
    }
    onProfileChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onEdit(){
        this.setState({ btnEdit:false,
                        btnSave:true,
                        disableForm:""})
    }
    onCancel(){        
        this.setState({ btnEdit:true,
                        btnSave:false,
                        disableForm:"disableForm"})
    }
    onSave(){
        let id = this.state._id; 
        let token = this.state.token;
        let user = this.state;
        fetch(`/api/users/edit/${id}`, {
            method: 'PUT',
            headers: {
                'X-Auth': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res =>         
            this.setState({ btnEdit:true,
                            btnSave:false,
                            disableForm:"disableForm"}))

    }
    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("myShipping"));
        this.setState({ parcelInfo:data.shippingData,
                        parcelData:data.parcelData})
        let user = JSON.parse(localStorage.getItem("currentUser"));
        let token = user.token;
        this.setState({token})
        axios
            .get(`/api/users/me`, { headers: { "X-Auth": token } })
            .then(res => {
                let user = res.data;
                if (user===null) {
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
    receiverInfo(e){
            this.setState({[e.target.name]:e.target.value})
            this.setState({titleErrDisable:false,changeClassButton:"btn btn-success",})
            // console.log(this.checkreEmail)
    }
    onAccept(){
        let a = this.state.refirstName
        let b = this.state.relastName
        let c = this.state.reemail
        let d = this.state.rephone
        let e = this.state.recountry
        let f = this.state.readdress
        let g = this.state.repostCode
        if (a.length < 1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the First Name!!"})
        } else if (b.length < 1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the Last Name!!"})
        } else if (c.length < 1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the Email!!"})
        } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(c)) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"reEmail not vaild!!"})
        } else if (d.length < 1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the Phone!!"})
        } else if (f.length <1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the Addresss!!"})
        } else if (e.length <1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the Country!!"})
        } else if (g.length <1) {
            this.setState({titleErrDisable:true,
                changeClassButton:"btn btn-danger",
                titleErr:"Forget input the PostCode!!"})
        }else{
            this.setState({
                firstItem:false,
                secondItem:true,
                enableButton:false,
                wingCard:false,
                masterCard:false,
                paygoCard:false,
                pipayCard:false
          })
        }
    }
    onPrevious(){
        this.setState({
            firstItem:true,
            secondItem:false
        })
    }
    onCheckModel(e){
        let val = e.target.value;
        if (val === 'a') {
            this.setState({ checkValue:"masterCard",
                            masterCard:true,
                            wingCard:false,
                            paygoCard:false,
                            pipayCard:false})

        } else  if (val === 'b'){
            // console.log("wingCard") 
            this.setState({ checkValue:"wingCard",
                            masterCard:false,
                            wingCard:true,
                            paygoCard:false,
                            pipayCard:false})
        }else  if (val === 'c'){
            // console.log("wingCard") 
            this.setState({ checkValue:"paygo",
                            masterCard:false,
                            wingCard:false,
                            paygoCard:true,
                            pipayCard:false})
        }else  if (val === 'd'){
            // console.log("wingCard") 
            this.setState({ checkValue:"pipay",
                            masterCard:false,
                            wingCard:false,
                            paygoCard:false,
                            pipayCard:true})
        }
        this.setState({enableButton:true})
    }
    onPurchas(){
        // let token = this.state.token;
        // let dbody = this.state.parcelData;
        // fetch(`/api/my-shipment/create`, {
        //     method: 'POST',
        //     headers: {
        //         'X-Auth': token,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dbody)
        // }).then(res => window.location ='./user/my-shipping')

        let tripId=localStorage.getItem("takenService");
        let parcelData= this.state.parcelData;
       
        let myShipping= {
            trip: tripId,
            parcels: parcelData,
            parcelDetail: {
                reason: "Birthday", content: "rePhone"
            }
            ,
            sender: "5b598ef0b4524f31c8ff3c84",
            receiver: "5b598d66b4524f31c8ff3c83"
        } ;
        fetch(`/api/my-shipment/create`, {
            method: "POST", headers: {
                "X-Auth": this.state.token, "Content-Type": "application/json"
            }
            , body: JSON.stringify(myShipping)
        }
        
        ).then(res=> (window.location="/user/my-shipping"));
    }
    
    render(){
        let {parcelData} = this.state;
        return(
            <div className="container card mt-4 mb-4 custom-shadow">
                <h1>PAYMENT</h1>
                <hr/>
                {this.state.firstItem ?
                <div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-10">
                            <div className="row">
                                <h3>Receiver Infomation</h3>
                            </div>
                                {this.state.titleErrDisable ? 
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Error!</strong> {this.state.titleErr}
                                </div>
                                :null}
                            <form>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" name="refirstName" placeholder="firstName" value={this.state.refirstName} onChange={this.receiverInfo}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" name="relastName" placeholder="lastName" value={this.state.relastName} onChange={this.receiverInfo}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" name="reemail" placeholder="email" value={this.state.reemail} onChange={this.receiverInfo}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Phone</label>
                                        <input type="number" className="form-control" name="rephone" placeholder="phone" value={this.state.rephone} onChange={this.receiverInfo}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <label>Home Address</label>
                                        <input type="text" className="form-control" name="readdress" placeholder="address" value={this.state.readdress} onChange={this.receiverInfo}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Country</label>
                                        <input type="text" className="form-control" name="recountry" placeholder="country" value={this.state.recountry} onChange={this.receiverInfo}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Post Code</label>
                                        <input type="number" className="form-control" name="repostCode" placeholder="postCode " value={this.state.repostCode} onChange={this.receiverInfo}/>
                                    </div>
                                </div>
                                <br/>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-10">
                            <div className="row">
                                <h3>Parcel Infomation</h3>
                            </div>
                            <br/>
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="shipfrom" className="col-sm-4 col-form-label">Shpping From</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" id="shipfrom" value={this.state.parcelInfo.shipFrom} disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="shipto" className="col-sm-4 col-form-label">Shpping To</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" id="shipto" value={this.state.parcelInfo.shipTo} disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="shipby" className="col-sm-4 col-form-label">Shpping By</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" id="shipby" value={this.state.parcelInfo.shippingType} disabled/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="pacel" className="col-sm-4 col-form-label">Parcel Detail:</label>
                                </div>
                                {parcelData.map((data,index) => { 
                                return <ParcelFrom 
                                    key={index} 
                                    No={index + 1}
                                    parcelData={this.state.parcelData[index]}>
                                    {data}
                                </ParcelFrom>})}
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-md-center">
                            <button type="button" className={this.state.changeClassButton} onClick={this.onAccept.bind(this)}>Accept & Go</button>
                    </div>
                </div>
                :null}

                {this.state.secondItem ?
                <div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-10">
                            <div className="row">
                                <h3>Your Infomation</h3>
                            </div>
                            <form className={this.state.disableForm}>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={this.state.firstName}  onChange={this.onProfileChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Last Name</label>
                                        <input type="text" className="form-control" name="lastName" value={this.state.lastName} onChange={this.onProfileChange}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.onProfileChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Phone</label>
                                        <input type="number" className="form-control" name="phone" value={this.state.phone} onChange={this.onProfileChange}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-12">
                                        <label>Home Address</label>
                                        <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.onProfileChange}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-6">
                                        <label>Country</label>
                                        <input type="text" className="form-control" name="country" value={this.state.country} onChange={this.onProfileChange}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Post Code</label>
                                        <input type="number" className="form-control" name="postCode" value={this.state.postCode} onChange={this.onProfileChange}/>
                                    </div>
                                </div>
                                <br/>
                            </form>
                            {this.state.btnEdit ?
                            <button type="button" className="btn text-light float-right  btn-success custom-shadow-button" onClick={this.onEdit.bind(this)}> <i className="far fa-edit" /> Edit Info </button>
                            :null}
                            {this.state.btnSave ?
                                <div>
                                    <button type="button" className="col-2 btn text-light float-right  btn-success custom-shadow-button" onClick={this.onSave.bind(this)}> Save </button>
                                    <button type="button" className="col-2 btn text-light float-right  btn-danger custom-shadow-button cus-margin-btn" onClick={this.onCancel.bind(this)}> Cancel </button>
                                </div>
                            :null}
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-sm-10">
                            <div className="row">
                                <h3>Payment Infomation</h3>
                            </div>
                            <br/>
                            <form>
                                <div className="form-group row justify-content-md-center">
                                    <div className="col-sm-2 up-center">
                                        <label> <strong>Option Cards</strong> </label>
                                    </div>
                                    <div className="col-sm-10">
                                        <div className="row text-center" value={this.state.checkValue} onChange={this.onCheckModel.bind(this)}>
                                            <div className="col-sm-4 row text-center" >
                                                <div className="col-sm-2">
                                                    <input type="radio" name="master" id="master" value="a" />
                                                </div>
                                                <label className="col-sm-10 card-size-mas" htmlFor="master" />
                                            </div>
                                            <div className="col-sm-8 row text-center">
                                                <div className="col-sm-4 row">
                                                    <input className="col-sm-2" type="radio" name="master" id="wing" value="b" />
                                                    <label className="col-sm-10 card-size-wing" htmlFor="wing"/>
                                                </div> 
                                                <div className="col-sm-4 row">
                                                    <input className="col-sm-2" type="radio" name="master" id="paygo" value="c" />
                                                    <label className="col-sm-10 card-size-paygo" htmlFor="paygo"/>
                                                </div> 
                                                <div className="col-sm-4 row">
                                                    <input className="col-sm-2" type="radio" name="master" id="pipay" value="d" />
                                                    <label className="col-sm-10 card-size-pipay" htmlFor="pipay"/>
                                                </div>    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {this.state.masterCard ?
                                <div>
                                    <div className="form-group row justify-content-md-center">
                                        <div className="col-sm-4">
                                            <label>Holder Name</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" placeholder="Enter Your Name"/>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-md-center">
                                        <div className="col-sm-4">
                                            <label>Card Number</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <input type="number" className="form-control" placeholder="Enter Card Number"/>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-md-center">
                                        <div className="col-sm-4">
                                            <label>Expiration Date</label>
                                        </div>
                                        <div className="col-sm-4">
                                            <select type="number" className="form-control" >
                                                <option value="">January</option>
                                                <option value="">February</option>
                                                <option value="">March</option>
                                                <option value="">April</option>
                                                <option value="">May</option>
                                                <option value="">June</option>
                                                <option value="">July</option>
                                                <option value="">August</option>
                                                <option value="">September</option>
                                                <option value="">October</option>
                                                <option value="">November</option>
                                                <option value="">December</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-4">
                                            <select type="number" className="form-control" >
                                                    <option value="">2018</option>
                                                    <option value="">2019</option>
                                                    <option value="">2020</option>
                                                    <option value="">2021</option>
                                                    <option value="">2022</option>
                                                    <option value="">2023</option>
                                                    <option value="">2024</option>
                                                    <option value="">2025</option>
                                                    <option value="">2026</option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-md-center">
                                        <div className="col-sm-4">
                                            <label>CVV Number</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <input type="number" className="form-control" placeholder="CVV Number"/>
                                        </div>
                                    </div>
                                </div>
                                : null }
                                {this.state.wingCard ?
                                    <div className="row justify-content-md-center bg-color text-center">
                                        <div className="col-sm-4">
                                            <img className="img-fluid" src="http://cdn.appcrawlr.com/imageService/aHR0cDovL2E1Lm16c3RhdGljLmNvbS91cy9yMzAvUHVycGxlNjAvdjQvZTkvZGIvNWQvZTlkYjVkNTctOTUxYi0zMDc0LTgzZTQtNTdmYmViYjE5YzYxL3NjcmVlbjY5Nng2OTYuanBlZw" alt=""/>
                                        </div>
                                        <div className="col-sm-4 text-center cus-of">
                                            <h1>ID:123456</h1>
                                        </div>
                                        <div className="col-sm-4 cus-of">
                                            <img className="img-fluid" src={QR} alt="QR"/>
                                        </div>
                                    </div>
                                : null }
                                {this.state.paygoCard ?
                                    <div className="row justify-content-md-center bg-color text-center">
                                        <div className="col-sm-4">
                                            <img className="img-fluid" src="https://img0.apk.tools/screenshots/b/0/b/com.paygo24.paypoint_1.png" alt=""/>
                                        </div>
                                        <div className="col-sm-4 text-center cus-of">
                                            <h1>ID:654321</h1>
                                        </div>
                                        <div className="col-sm-4 cus-of">
                                            <img className="img-fluid" src={QR} alt="QR"/>
                                        </div>
                                    </div>
                                : null }
                                {this.state.pipayCard ?
                                    <div className="row justify-content-md-center bg-color text-center">
                                        <div className="col-sm-4">
                                            <img className="img-fluid" src="https://is2-ssl.mzstatic.com/image/thumb/Purple19/v4/09/4b/d6/094bd6d2-0701-59fa-132d-c55ffaf76b9e/pr_source.jpg/300x0w.jpg" alt=""/>
                                        </div>
                                        <div className="col-sm-4 text-center cus-of">
                                            <h1>ID:121314</h1>
                                        </div>
                                        <div className="col-sm-4 cus-of">
                                            <img className="img-fluid" src={QR} alt="QR"/>
                                        </div>
                                    </div>
                                : null }
                                <br/>
                            </form>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-sm-8 text-center">
                            <button type="button" className="col-2 btn text-light float-right  btn-success custom-shadow-button cus-margin-btn" onClick={this.onPurchas.bind(this)} disabled={!this.state.enableButton}>Purchase</button>
                            <button type="button" className="col-2 btn text-light float-right  btn-danger custom-shadow-button cus-margin-btn" onClick={this.onPrevious.bind(this)}>Go Back</button>
                        </div>
                    </div>
                </div>
                :null}
            </div>
        );
    }
}