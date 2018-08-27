import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class ModalAuthRequired extends Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpen: true };
    }

    onClick(e) {
        this.props.history.push("/payment");
    }

    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn btn-success custom-shadow-button w-100"
                    data-toggle="modal"
                    data-target="#editProfileInfo"
                >
                    TAKE THIS
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
                            <div className="modal-header bg-warning ">
                                <h5
                                    className="modal-title"
                                    id="editProfileInfoTitle"
                                >
                                    Sign in required!
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
                                <p>Please Log in to use this service!</p>
                                <p>Sign in to your account?</p>
                            </div>
                            <div className="modal-footer alert-warning">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-dismiss="modal"
                                >
                                    NO
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    data-dismiss="modal"
                                    onClick={e => this.onClick(e)}
                                >
                                    YES
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ModalAuthRequired);
