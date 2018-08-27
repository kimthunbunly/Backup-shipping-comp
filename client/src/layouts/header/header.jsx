import React from "react";
import logo from "./rocket.png";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link, withRouter } from "react-router-dom";
import userAuth from "../../routes/auth";
// import StateUser from "./user-state.jsx";

const SignOutButton = withRouter(
    ({ history }) =>
        userAuth.isAuthenticated ? (
            <button
                className="dropdown-item"
                type="button"
                onClick={() => {
                    userAuth.signout(() => history.push("/"));
                }}
            >
                Sign out
            </button>
        ) : (
            ""
        )
);

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image:''
        };
    }
    componentDidMount(){
        let img = localStorage.getItem('img');
        if (img) {
            this.setState({image:img})
        } else {
            this.setState({image:"https://image.flaticon.com/icons/svg/236/236832.svg"})
        }
    }
    updateUser = () => {
        let currentUser = localStorage.getItem("currentUser");

        if (currentUser !== null) {
            return (
                <div className="btn-group float-right">
                    <div
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <div className="image-cropper">
                            <img className="rounded" src={this.state.image} alt="user" />
                        </div>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link to="/user/profile"><button className="dropdown-item" type="button">
                            View Profile
                        </button></Link>
                        <Link to="/user/my-shipping">
                            <button className="dropdown-item" type="button">
                                My Shipping
                            </button>
                        </Link>
                        <SignOutButton />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="btn-group float-right">
                    <div
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <div className="image-cropper">
                            <img
                                className="rounded"
                                src="https://image.flaticon.com/icons/svg/149/149071.svg"
                                alt="user"
                            />
                        </div>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right">
                        <Link to="/login">
                            {" "}
                            <button className="dropdown-item" type="button">
                                Sign In
                            </button>
                        </Link>
                        <Link to="/register">
                            <button className="dropdown-item" type="button">
                                Register
                            </button>
                        </Link>
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <nav
                className="navbar navbar-expand-lg navbar-dark "
                style={{ backgroundColor: "#182c39" }}
            >
                <Link className="navbar-brand text-uppercase" to="/">
                    <img src={logo} alt="camboparcel" /> Cambo-Parcel
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <div className="mr-auto" />
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/services" className="nav-link">
                                Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact-us" className="nav-link">
                                Contact Us
                            </Link>
                        </li>
                    </ul>

                    {this.updateUser()}
                </div>
            </nav>
        );
    }
}

export default Header;
