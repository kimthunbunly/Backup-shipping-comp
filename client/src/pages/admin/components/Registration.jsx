import React from 'react';
import axios from 'axios'

export default class Registration extends React.Component{
    state = {
        users:[]
    }
    componentDidMount(){
        axios.get(`/api/users`)
        .then(res => {
            this.setState({users:res.data})
        });
    }
    render(){
        return(
            <table className="table">
            <thead className="bg-header">
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
                <th scope="col">Post Code</th>
                <th scope="col">Address</th>
                </tr>
            </thead>
            <tbody>
            {this.state.users.map((data,index)=>{
                return<TableCard
                    key={index}
                    name={data.firstName +" "+ data.lastName}
                    email={data.email}
                    phone={data.phone}
                    country={data.country}
                    postCode={data.postCode}
                    address={data.address}/>
            })}
            </tbody>
            </table>
        );
    }
}
class TableCard extends React.Component{
    render(){
        return(
            <tr>
            <td>{this.props.name}</td>
            <td>{this.props.email}</td>
            <td>{this.props.phone}</td>
            <td>{this.props.country}</td>
            <td>{this.props.postCode}</td>
            <td>{this.props.address}</td>
            </tr>
        );
    }
}