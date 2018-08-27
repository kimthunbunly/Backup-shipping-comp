import React, { Component } from "react";
import RegisterForm from "../../partials/forms/registerForm";
import { Link, Redirect } from "react-router-dom";
class RegisterUser extends Component {
    render() {
        const path = this.props.location.fromPath;
        console.log(path);

        if (localStorage.currentUser) {
            alert("You are already logged in!");
            return <Redirect to="/" />;
        }
        return (
            <div className="row mt-4 mb-4">
                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="card border border-success">
                        <div className="card-header bg-success text-white">
                            Register Account
                        </div>
                        <div className="card-body">
                            <RegisterForm />
                        </div>
                        <div className="card-footer alert-secondary">
                            <Link to={`/login`}>Log In </Link>
                            if you have an account
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;
