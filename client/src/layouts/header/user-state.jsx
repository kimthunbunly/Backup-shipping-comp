import React from "react";
import userImg from "./user.jpg";

export default class StateUser extends React.Component {
    render() {
        return (
            <div className="btn-group">
                <div
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <div className="image-cropper">
                        <img className="rounded" src={userImg} alt="user" />
                    </div>
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                    <button className="dropdown-item" type="button">
                        Action
                    </button>
                    <button className="dropdown-item" type="button">
                        Another action
                    </button>
                    <button className="dropdown-item" type="button">
                        Something else here
                    </button>
                </div>
            </div>
        );
    }
}
