import React, { Component } from "react";
import TextFieldGroup from "../../components/textField/TextFieldGroup";
import Axios from "axios";
import userAuth from "../../routes/auth";
class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreedTerm: false
            },
            error: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreedTerm: ""
            },
            isRegistered: false
        };
    }

    handleChange(keyVal) {
        this.setState(state => ({
            ...state,
            user: {
                ...state.user,
                ...keyVal
            }
        }));
    }

    doValidation = () => {
        let user = this.state.user;

        //firstName
        if (user.firstName === "") {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    firstName: "first name should not be empty"
                }
            }));
        } else if (user.firstName.length < 2 || user.firstName.length > 15) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    firstName:
                        "first name should be between 2 and 15 characters"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    firstName: ""
                }
            }));
        }

        //lastName
        if (user.lastName === "") {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    lastName: "first name should not be empty"
                }
            }));
        } else if (user.lastName.length < 2 || user.lastName.length > 15) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    lastName: "first name should be between 2 and 15 characters"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    lastName: ""
                }
            }));
        }

        //phoneNumber
        if (user.phoneNumber === "") {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    phoneNumber: "first name should not be empty"
                }
            }));
        } else if (
            user.phoneNumber.length < 2 ||
            user.phoneNumber.length > 15
        ) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    phoneNumber:
                        "last name should be between 2 and 15 characters"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    phoneNumber: ""
                }
            }));
        }

        //email
        let reg = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        if (user.email === "") {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    email: "email should not be empty"
                }
            }));
        } else if (reg.test(user.email) === false) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    email: "email is not correct ex:username@example.com"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    email: ""
                }
            }));
        }

        //password
        if (user.password.length < 6 || user.password.length > 20) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    password: "password should be between 6 and 20 characters"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    password: ""
                }
            }));
        }

        //confirmPassword
        if (user.confirmPassword === "") {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    confirmPassword: "password is required"
                }
            }));
        } else if (user.confirmPassword !== user.password) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    confirmPassword: "password not match"
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    confirmPassword: ""
                }
            }));
        }

        //agreement
        if (user.agreedTerm) {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    agreedTerm: ""
                }
            }));
        } else {
            this.setState(state => ({
                ...state,
                error: {
                    ...state.error,
                    agreedTerm: "you must accept our term"
                }
            }));
        }
        return (
            user.firstName !== "" &&
            user.lastName !== "" &&
            user.phoneNumber !== "" &&
            user.email !== "" &&
            user.password !== "" &&
            user.password === user.confirmPassword &&
            user.agreedTerm === true
        );
    };

    loginUser(user) {
        Axios.post("/api/users/login", user).then(
            res => {
                const { token, user } = res.data;
                const currentUser = {
                    token: token,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };

                localStorage.setItem(
                    "currentUser",
                    JSON.stringify(currentUser)
                );
                console.log(res.status);

                if (res.status === 200) {
                    userAuth.authenticate(() => {
                        this.setState({ redirectToReferrer: true });
                    });
                    window.location = "/login";
                }
            },
            error => {
                console.log(error.response);
            }
        );
    }

    onSubmit = e => {
        e.preventDefault();

        if (this.doValidation()) {
            let { user } = this.state;

            Axios.post("/api/users/signup", user).then(
                res => {
                    let { status } = res;
                    if (status === 200) {
                        this.setState({ isRegistered: true });
                        // return <Redir
                    }
                },
                err => {
                    let { status } = err.response;
                    if (status === 500) {
                        alert("There is no internet connection! ");
                    } else {
                        alert("Your email is already used!");
                    }
                }
            );
        }
    };

    render() {
        const user = {
            email: this.state.user.email,
            password: this.state.user.password
        };
        console.log(this.state.isRegistered);

        if (this.state.isRegistered) {
            this.loginUser(user);
        }
        let firstNameCheck = {
            label: this.state.error.firstName === "" ? "" : "text-danger",
            input:
                this.state.error.firstName === ""
                    ? "form-control "
                    : "form-control is-invalid",
            feedback: this.state.error.firstName
        };
        let lastNameCheck = {
            label: this.state.error.lastName === "" ? "" : "text-danger",
            input:
                this.state.error.lastName === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.lastName
        };
        let phoneNumberCheck = {
            label: this.state.error.phoneNumber === "" ? "" : "text-danger",
            input:
                this.state.error.phoneNumber === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.phoneNumber
        };
        let emailCheck = {
            label: this.state.error.email === "" ? "" : "text-danger",
            input:
                this.state.error.email === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.email
        };
        let passwordCheck = {
            label: this.state.error.password === "" ? "" : "text-danger",
            input:
                this.state.error.password === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.password
        };
        let confirmPasswordCheck = {
            label: this.state.error.confirmPassword === "" ? "" : "text-danger",
            input:
                this.state.error.confirmPassword === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.confirmPassword
        };
        let agreeTermCheck = {
            label:
                this.state.error.agreedTerm === ""
                    ? "form-check-label"
                    : "form-check-label text-danger",
            input:
                this.state.error.agreedTerm === ""
                    ? "form-control"
                    : "form-control is-invalid",
            feedback: this.state.error.agreedTerm
        };
        return (
            <form onSubmit={e => this.onSubmit(e)}>
                <TextFieldGroup
                    label="First Name"
                    name="firstName"
                    type="text"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Enter your first name"
                    errorMassage={firstNameCheck.feedback}
                />
                <TextFieldGroup
                    label="Last Name"
                    name="lastName"
                    type="text"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Enter your last name"
                    errorMassage={lastNameCheck.feedback}
                />
                <TextFieldGroup
                    label="Phone Number"
                    name="phoneNumber"
                    type="number"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Enter your phone number"
                    errorMassage={phoneNumberCheck.feedback}
                />
                <TextFieldGroup
                    label="Email"
                    name="email"
                    type="text"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Enter your email address"
                    errorMassage={emailCheck.feedback}
                />
                <TextFieldGroup
                    label="Password"
                    name="password"
                    type="password"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Enter your password"
                    errorMassage={passwordCheck.feedback}
                />

                <TextFieldGroup
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={e =>
                        this.handleChange({
                            [e.target.name]: e.target.value
                        })
                    }
                    placeholder="Re-enter your password"
                    errorMassage={confirmPasswordCheck.feedback}
                />

                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreedTerm"
                        name="agreedTerm"
                        onChange={e =>
                            this.handleChange({
                                [e.target.name]: e.target.checked
                            })
                        }
                    />
                    <label
                        className={agreeTermCheck.label}
                        htmlFor="agreedTerm"
                    >
                        Are you agree our term and condition?
                    </label>
                    <p className="small text-danger">
                        {agreeTermCheck.feedback}
                    </p>
                </div>

                <button className="btn btn-success float-right text-uppercase custom-shadow-button">
                    Register
                </button>
            </form>
        );
    }
}

export default RegisterForm;
