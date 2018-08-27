import React, { Component } from "react";

export default class ContactForm extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-8 offset-sm-2 card form-shadow-control">
                    <div className="card-body">
                        <h3>We welcome to see your message</h3>
                        <hr />
                        <form>
                            <div className="form-group">
                                <label htmlFor="uEmailAddress">
                                    Your Email:
                                </label>
                                <input
                                    type="email"
                                    className="form-control form-shadow-control"
                                    id="uEmailAddress"
                                    name="uEmailAddress"
                                    placeholder="example@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="uTitle">Title</label>
                                <input
                                    type="text"
                                    className="form-control form-shadow-control"
                                    id="uTitle"
                                    name="uTitle"
                                    placeholder="title..."
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="uDescription">
                                    Your Email:
                                </label>
                                <textarea
                                    rows={5}
                                    type="text"
                                    className="form-control form-shadow-control"
                                    id="uDescription"
                                    name="uDescription"
                                    placeholder="description..."
                                />
                            </div>

                            <button className="btn btn-success w-25 float-right custom-shadow-button">
                                SEND
                            </button>
                            <br />
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
