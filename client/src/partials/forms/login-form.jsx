import React from "react";
import axios from "axios";
class LoginForm extends React.Component {
    state = {
        email: "",
        password: ""
    };

    onChange = event => {
        let value = event.target.value;
        let name = event.target.name;
        let type = event.target.type;
        if (type === "checkbox") {
            value = event.target.checked ? true : false;
        }
        this.setState({ [name]: value });
    };

    login = () => {
        this.props.onLogIn();
    };

    onSubmit = event => {
        event.preventDefault();
        let user = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post(`api/users/login`, user).then(
            res => {
                let currentUser = {
                    token: res.data.token,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email
                };

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );
                this.login();
            },
            error => {
                alert("invalid email or password");
            }
        );
    };
    render() {
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="inputEmailLogIn">Email address</label>
                    <input
                        onChange={e => this.onChange(e)}
                        value={this.state.email}
                        name="email"
                        type="email"
                        className={
                            "form-control form-shadow-control" +
                            this.state.missingEmail
                        }
                        id="inputEmailLogIn"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputLogInPassword">Password</label>
                    <input
                        onChange={e => this.onChange(e)}
                        value={this.state.password}
                        type="password"
                        name="password"
                        className={
                            "form-control  form-shadow-control" +
                            this.state.missingPassword
                        }
                        id="inputLogInPassword"
                        placeholder="Password"
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-success w-100 text-uppercase custom-shadow-button"
                    value="SIGN IN"
                />
            </form>
        );
    }
}

export default LoginForm;
