import React from 'react'
import Calendar from 'react-calendar';

export default class Event extends React.Component{
    state = {
        date: new Date(),
      }
    render(){
        return(
            <div className="cus-cal">
                <Calendar
                onChange={this.onChange}
                value={this.state.date} />
                <br/>
                <ul className="list-group">
                    <li className="list-group-item">28 Update Servers</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        );
    }
}