import React, { Component } from "react";
import "./upload-img.css";

const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }
class ChangeProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            image: ''};
    }

    onChangeImg = (e) => {
        const file = e.target.files[0];
        getBase64(file).then(img => {
         this.setState({image:img})
        });
    };
    onUpload(){
        let img = this.state.image;
        localStorage.setItem('img',img)
        console.log(img)
    }
    render() {
        return (
            <div>
                <button
                    type="button"
                    className="btn float-right custom-shadow-button"
                    data-toggle="modal"
                    data-target="#changeProfileImage"
                >
                    <i className="far fa-edit" /> Change Profile
                </button>

                <div
                    className="modal fade text-dark"
                    id="changeProfileImage"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="changeProfileImageTitle"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="changeProfileImageTitle"
                                    >
                                        Modal title
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
                                <input 
                                        type="file" 
                                        id="imageFile" 
                                        name='imageFile' 
                                        onChange={this.onChangeImg} />
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        data-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="Submit"
                                        className="btn btn-success"
                                        onClick={this.onUpload.bind(this)}
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangeProfileImage;
