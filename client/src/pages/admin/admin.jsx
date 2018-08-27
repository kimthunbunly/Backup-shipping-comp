import React from 'react';
import './index.css';
import 'chartist/dist/chartist.min.css';
import 'chartist/dist/chartist.min.js';
// import { Link } from "react-router-dom";
import logo from "./rocket.png";
import Dashboard from './components/Dashboard';
import Userprofile from './components/Userprofile';
import Registration from './components/Registration';
import Mailbox from './components/Mailbox';
import Event from './components/Event';
import Maps from './components/Map';

export default class Admin extends React.Component{
    constructor(){
        super();
        this.state = {
            title:"Dashborad",
            dashboard:true,
            userprofile:false,
            registration:false,
            event:false,
            mailbox:false,
            map:false,
            about:false
        }
    }
    goHomePage(){
        window.location='./'
    }
    componentDidMount(){
        // let test =  window.location.pathname;
        // console.log(test)
    }
    stateFalse(){
        this.setState({        
            dashboard:false,
            userprofile:false,
            registration:false,
            event:false,
            mailbox:false,
            map:false,
            about:false})
    }
    onChangeNav(e){
        // console.log(e);
        if (e==="dashboard") {
            this.stateFalse();
            this.setState({title:"Dashborad",dashboard:true});
        } else if (e==="userprofile") {
            this.stateFalse();
            this.setState({title:"Userprofile",userprofile:true});
        } else if (e==="registration") {
            this.stateFalse();
            this.setState({title:"Registration",registration:true});
        } else if (e==="event") {
            this.stateFalse();
            this.setState({title:"Event",event:true});
        } else if (e==="mailbox") {
            this.stateFalse();
            this.setState({title:"Mailbox",mailbox:true});
        } else if (e==="maps") {
            this.stateFalse();
            this.setState({title:"Map",map:true});
        } else if (e==="about") {
            this.stateFalse();
            this.setState({title:"About",about:true});
        }
    }
    render(){   
        return(
            <div id="wrapper" className="toggled">
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                    <a className="navbar-brand text-uppercase size-logo" to="#" onClick={this.goHomePage}>
                        <img className="img-fluid" src={logo} alt="camboparcel"/> Cambo-Parcel
                    </a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"dashboard")}>
                        <a>Dashboard</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"userprofile")}>
                        <a>User Profile</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"registration")}>
                        <a>Registration</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"event")}>
                        <a>Event</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"mailbox")}>
                        <a>Mailbox</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"maps")}>
                        <a>Maps</a>
                    </li>
                    <li id="text-indent" onClick={this.onChangeNav.bind(this,"about")}>
                        <a>About</a>
                    </li>
                </ul>
            </div>
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="row container-fluid">
                        <h3>{this.state.title}</h3>
                    </div>
                        <hr/>
                        {this.state.dashboard?
                            <Dashboard/>
                        :null}
                        {this.state.userprofile?
                            <Userprofile/>
                        :null}
                        {this.state.registration?
                            <Registration/>
                        :null}
                        {this.state.event?
                            <Event/>
                        :null}
                        {this.state.mailbox?
                            <Mailbox/>
                        :null}
                         {this.state.map?
                            <div id="style-map"><Maps/></div>
                        :null}
                        {this.state.about?
                            <div>Hello about</div>
                        :null}
                </div>
            </div>
        </div>
        );
    }
}