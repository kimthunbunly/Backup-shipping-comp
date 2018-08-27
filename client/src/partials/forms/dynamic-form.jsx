import React from "react";

const envelopes = ["A10", "A9", "A8", "A7", "A6", "A2"];
const style = { marginLeft: 0 };
const envelopeChoices = envelopes.map((envelopeSize, i) => (
    <div className="col-sm-2 align-middle" key={i}>
        <div className="from-check text-center">
            <div className="align-middle">
                <label className="radio control-label">{envelopeSize}</label>
                <br />
                <input
                    style={style}
                    type="radio"
                    className="form-check-input center from-control form-shadow-control"
                    value={envelopeSize}
                    name="envelopeSize"
                    id={envelopeSize}
                />
            </div>
        </div>
    </div>
));
const EnvelopChoice = () => {
    return <div className="row">{envelopeChoices}</div>;
};

const InitialPackage = () => {
    return (
        <div className="row">
            <div className="col-sm-4">
                <label htmlFor="">(cm):</label>
                <input
                    type="number"
                    name=""
                    min={1}
                    max={20}
                    placeholder="cm"
                    id=""
                    className="form-control text-right"
                />
            </div>
            <div className="col-sm-4">
                <label htmlFor="">(cm):</label>
                <input
                    type="number"
                    name=""
                    min={1}
                    max={20}
                    placeholder="cm"
                    id=""
                    className="form-control text-right"
                />
            </div>
            <div className="col-sm-4">
                <label htmlFor="">(cm):</label>
                <input
                    type="number"
                    name=""
                    min={1}
                    max={20}
                    placeholder="cm"
                    id=""
                    className="form-control text-right"
                />
            </div>
        </div>
    );
};

export default class PackageForm extends React.Component {
    state = {
        selectedItem: ""
    };

    handleSelectedType(e) {
        let value = e.target.value;
        this.setState({ selectedItem: value });
    }

    handleViewParcel(value) {
        if (value === "envelope") {
            return <EnvelopChoice />;
        } else {
            return <InitialPackage />;
        }
    }

    render() {
        return (
            <div className="form-group row">
                <div className="col-sm-1">
                    <br />
                    <label htmlFor="">A</label>
                </div>

                <div className="col-sm-11 row">
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label htmlFor="" className="from-control form-shadow-control">
                                type
                            </label>
                            <select
                                id="parcelType"
                                className="form-control"
                                onChange={e => this.handleSelectedType(e)}
                                value={this.state.selectedItem.value}
                            >
                                {console.log(this.state.selectedItem)}
                                {/* {console.log(this.handleSelectedType())} */}
                                <option key="0">package</option>
                                <option key="1">envelope</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label htmlFor="" className="from-control form-shadow-control">
                                quantity
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                min={1}
                                max={20}
                                placeholder="Qty."
                            />
                        </div>
                    </div>
                    <div className="col-sm-8">
                        {this.handleViewParcel(this.state.selectedItem)}
                    </div>
                </div>
            </div>
        );
    }
}
