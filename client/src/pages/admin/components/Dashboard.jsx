import React from 'react';
import Chartist from 'chartist'

export default class Dasboard extends React.Component{
    componentDidMount(){
                    // chart for component 1
                    new Chartist.Line('#chart1', {
                        labels: [1, 2, 3, 4, 5, 6, 7, 8],
                        series: [
                          [5, 9, 7, 8, 5, 3, 5, 4]
                        ]
                      }, {
                        low: 0,
                        showArea: true,
                        height:230,
                        // width:650
                      });
                    // chart for component 2
                      var data = {
                        labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        series: [
                          [10, 3, 4, 8, 10, 6, 8],
                          [6, 4, 6, 7, 8, 7, 4]
                        ]
                      };
                      
                      var options = {
                        seriesBarDistance: 10,
                        height:230,
                        // width:650
                      };
                      
                      var responsiveOptions = [
                        ['screen and (max-width: 640px)', {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            }
                          }
                        }]
                      ];
                      new Chartist.Bar('#chart2', data, options, responsiveOptions);
            
                    // chart for component 3
                    var data = {
                        series: [5, 3, 4]
                      };
                    var options ={
                        height:230,
                        // width:450
                    };
                      var sum = function(a, b) { return a + b };
                      
                      new Chartist.Pie('#chart3', data, options,{
                        labelInterpolationFnc: function(value) {
                          return Math.round(value / data.series.reduce(sum) * 100) + '%';
                        }
                      });
            
                    //   chart for the revenue
                    var data = {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        series: [
                          [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
                          [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
                        ]
                      };
                      
                      var options = {
                        seriesBarDistance: 10,
                        height:230,
                        // width:650
                      };
                      
                      var responsiveOptions = [
                        ['screen and (max-width: 640px)', {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            }
                          }
                        }]
                      ];
                      new Chartist.Bar('#revenue', data, options, responsiveOptions);
                    
                    // chart for the Revenue2
                    new Chartist.Line('#revenue2', {
                        labels: [1, 2, 3, 4, 5, 6, 7, 8],
                        series: [
                          [5, 9, 7, 8, 5, 3, 5, 4]
                        ]
                      }, {
                        low: 0,
                        showArea: true,
                        height:230,
                        // width:650
                      });
    }
    render(){
        return(
            <div id="page-content-wrapper">
                <div className="container-fluid">
                    <div className="card-deck">
                        <CardSmall  bgcolor="-orange"
                                    icon="fas fa-compact-disc"
                                    title="Strong Space"
                                    content={"49/50"+"GB"} 
                                    />
                        <CardSmall  bgcolor="-green"
                                    icon="fas fa-store-alt"
                                    title="Visitor"
                                    content={"1"+"K"} />
                        <CardSmall  bgcolor="-red"
                                    icon="fas fa-heart"
                                    title="Follower"
                                    content={"85"} />
                        <CardSmall  bgcolor="-blue"
                                    icon="fa fa-cogs"
                                    title="Fixed Issues "
                                    content={"15"} />
                    </div>
                    <br/>
                    <div className="card-deck">
                        <div className="card cus-padding bg-col">
                            <div className="card-body ">
                                <h4 className="card-title">Daily Parcel</h4>
                                <p className="card-text">This is a wider card with supporting text below as a natural.</p>
                            </div>
                            <div className="bg-rectangle -height -green text-center">
                                <div id="chart1" className="ct-chart "></div>
                            </div>  
                            <br/>
                            <div className="card-footer">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                        <div className="card cus-padding bg-col">
                            <div className="card-body ">
                                <h4 className="card-title">Available Services</h4>
                                <p className="card-text">Service of the partners</p>
                            </div>
                            <div className="bg-rectangle -height -orange text-center">
                                <div id="chart2" className="ct-chart"></div>
                            </div>  
                            <br/>
                            <div className="card-footer">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                        <div className="card cus-padding bg-col">
                            <div className="card-body ">
                                <h4 className="card-title">Users Subscriptions</h4>
                                <p className="card-text">Show all</p>
                            </div>
                            <div className="bg-rectangle -height -blue text-center">
                                <div id="chart3" className="ct-chart "></div>
                            </div>  
                            <br/>
                            <div className="card-footer">
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>   
                <div className="container-fluid">
                    <div className="bg-black ">
                        <div className="row cus-pad">
                            <h4>Financial Performance</h4>
                        </div>
                        <div className="row cus-pad">
                            <div className="col-sm-4 cus-bd-bk">
                                <p>Revenue vs Expenses</p>
                                <div id="revenue" className="ct-chart "></div>
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>Gross Profit Margin</p>
                                <h1>38%</h1>
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>Quick Ratio</p>
                                <h1>3.2</h1>
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>Rurn Rate</p>
                                <br/>
                                <h1><small>$</small>15.2 <small>K</small></h1> 
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>Cash Runway</p>
                                <h1>23 <small>mth</small></h1>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black ">
                        <div className="row cus-pad">
                            <h4>This Month</h4>
                        </div>
                        <div className="row cus-pad">
                            <div className="col-sm-4 cus-bd-bk">
                                <p>Revenue</p>
                                <div id="revenue2" className="ct-chart"></div>
                            </div>
                            <div className="col-sm-4 cus-bd-bk">
                                <p>Current Accounts Payable vs Receivable </p>
                                <h1>38%</h1>
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>Lead Velocity Rate</p>
                                <h1>3.2</h1>
                            </div>
                            <div className="col-sm-2 cus-bd-bk">
                                <p>LTV: CAC Ratio</p>
                                <br/>
                                <h1><small>$</small>15.2 <small>K</small></h1> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
class CardSmall extends React.Component {
    render() {
      return (
            <div className="card">
                <div className="card-body bg-col">
                    <div className="row justify-content-md-center cus-padding">
                        <div className={"bg-rectangle text-center " + this.props.bgcolor}>
                            <i className={this.props.icon}></i>
                            <hr/>
                            <p>{this.props.title}</p>
                            <h3 style={{fontSize: "2vw"}}>{this.props.content}</h3>
                        </div>
                    </div>
                <hr/>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>
      );
    }
  }
 