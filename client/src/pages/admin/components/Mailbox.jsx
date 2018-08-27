import React from 'react';

export default class Mailbox extends React.Component{
    constructor(){
        super();
        this.state = {
            setClassInbox:'btn-active',
            setClassOutbox:'',
            setClassTrash:'',
            Inbox:true,
            Outbox:false,
            Trash:false
        }
    }
    changeTabs(e){
        if (e==="inbox") {
            this.setState({setClassInbox:"btn-active",setClassOutbox:'',setClassTrash:'',            
            Inbox:true,
            Outbox:false,
            Trash:false})
        } else if (e==="outbox") {
            this.setState({setClassOutbox:"btn-active",setClassInbox:'',setClassTrash:'',
            Inbox:false,
            Outbox:true,
            Trash:false})
        }else if (e==="trash") {
            this.setState({setClassTrash:"btn-active",setClassInbox:'',setClassOutbox:'',
            Inbox:false,
            Outbox:false,
            Trash:true})
        }
    }
    render(){
        return(
            <div className="bg-col cus-pad">
                <div className="row btn-custom">
                    <button className={"btn btn-custom " + this.state.setClassInbox} onClick={this.changeTabs.bind(this,"inbox")}>Inbox</button>
                    <button className={"btn btn-custom " + this.state.setClassOutbox} onClick={this.changeTabs.bind(this,"outbox")}>Outbox</button>
                    <button className={"btn btn-custom " + this.state.setClassTrash} onClick={this.changeTabs.bind(this,"trash")}>Trash</button>
                </div>
                <br/>
                <div className="row cus-pad">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <br/>
                <div className="row">
                    {this.state.Inbox ?
                    <div className="cus-pad">
                        <h4>Inbox</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.

                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt 
                            explicabo. Nemo enim ipsam voluptatem quia voluptas

                            Best regards,
                            Kevin Douglas</p>
                    </div>
                    :null}
                    {this.state.Outbox ?
                    <div className="cus-pad">
                        <h4>Outbox</h4>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt 
                            explicabo. Nemo enim ipsam voluptatem quia voluptas

                            Best regards,
                            Kevin Douglas</p>
                    </div>
                    :null}
                    {this.state.Trash ?
                    <div className="cus-pad">
                        <h4>Trash</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            Best regards,
                            Kevin Douglas</p>
                    </div>
                    :null}
                </div>
            </div>
        );
    }
}