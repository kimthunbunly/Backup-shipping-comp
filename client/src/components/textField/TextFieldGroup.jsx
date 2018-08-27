import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
    name,
    value,
    label,
    errorMassage,
    type,
    onChange,
    placeholder
}) => {
    return (
        <div className="form-group">
            <label
                htmlFor={name}
                className={errorMassage === "" ? "" : "text-danger"}
            >
                {label}
            </label>
            <input
                type={type}
                className={`form-control ${
                    errorMassage === "" ? "" : "is-invalid"
                }`}
                id={name}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={placeholder}
            />
            <div className="invalid-feedback">{errorMassage}</div>
        </div>
    );
};

TextFieldGroup.prototype = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errorMassage: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProp = {
    type: "text"
};
export default TextFieldGroup;
