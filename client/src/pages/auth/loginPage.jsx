import React, { Component } from "react";
import LoginForm from "../../partials/forms/login-form";
import { Link, Redirect } from "react-router-dom";
import userAuth from "../../routes/auth";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        };
    }
    componentWillMount() {
        if (localStorage.currentUser) {
            this.login();
            if (localStorage.lastPath) {
                window.location = localStorage.lastPath;
            }
        }
    }

    login = () => {
        userAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true });
        });
    };

    render() {
        const { from } = this.props.location.state || {
            from: { pathname: "/" }
        };
        const { redirectToReferrer } = this.state;
        if (from !== "/") {
            localStorage.setItem("lastPath", from.pathname);
        }
        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div className="row mt-5 mb-5">
                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <div className="card">
                        <div className="card-header">Login to Your account</div>
                        <div className="card-body">
                            <LoginForm
                                redirectToReferrer={
                                    this.state.redirectToReferrer
                                }
                                onLogIn={this.login}
                                fromPath={from.pathname}
                            />
                        </div>
                        <div className="card-footer">
                            <Link
                                to={{
                                    pathname: "/register",
                                    fromPath: from.pathname
                                }}
                                // from={{ pathname: from.pathname }}
                            >
                                Create an account{" "}
                            </Link>
                            if you don't have once.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
