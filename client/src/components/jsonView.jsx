import React from "react";

class JsonView extends React.Component {
    state = {};
    render() {
        return (
            <div className="accordion" id="accordionExample">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button
                                className="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                            >
                                Your Parcel
                            </button>
                        </h5>
                    </div>

                    <div
                        id="collapseOne"
                        className="collapse show"
                        aria-labelledby="headingOne"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <pre>
                                <code>
                                    {JSON.stringify(
                                        this.props.initData,
                                        null,
                                        4
                                    )}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <h5 className="mb-0">
                            <button
                                className="btn btn-link collapsed"
                                type="button"
                                data-toggle="collapse"
                                data-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                            >
                                Available Services
                            </button>
                        </h5>
                    </div>
                    <div
                        id="collapseTwo"
                        className="collapse"
                        aria-labelledby="headingTwo"
                        data-parent="#accordionExample"
                    >
                        <div className="card-body">
                            <pre>
                                <code>
                                    {JSON.stringify(
                                        this.props.services,
                                        null,
                                        4
                                    )}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JsonView;
