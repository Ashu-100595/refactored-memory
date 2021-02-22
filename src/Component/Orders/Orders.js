import axios from 'axios'
import React, { Component } from 'react'

export default class OrdersPage extends Component{
  
  state={
    orderData:[],
    new:true,
    packed:true,
    inTransit:true,
    delivered:true,
    filterData:[]
  }
  

  componentDidMount(){
    axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
    .then((res)=>{
      this.setState({orderData:res.data})
    })
  }



  render(){

    let filterArray = this.state.orderData.filter(item=>{
      if(this.state.new){
        if(item.orderStatus == "New"){
        return item
      }
    }
      if(this.state.delivered){
        if(item.orderStatus == "Delivered"){
        return item
      }
      }
      if(this.state.packed){
        if(item.orderStatus == "Packed"){
        return item
      }
      }
      if(this.state.inTransit){
        if(item.orderStatus == "InTransit"){
        return item
      }
      }
    });
        return(
            <div>
                <main className="MainContainer">
      <div className="Homepage_PageWrapper">
        <h1 className="Homepage_MainHeading">Orders</h1>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <div className="Homepage_OrdersWrapper">
          <div className="Homepage_FilterWrapper">
            <h3>Filters</h3>
            <div className="Homepage_FilterOptions">
              <p>Count: <span className="filterCount">{filterArray.length}</span></p>
              <label className="Homepage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-new"
                  checked={this.state.new}
                  value="New"
                  onChange={(e)=>{this.setState({new:e.target.checked})}}
                />
                New
              </label>
              <label className="Homepage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-packed"
                  checked={this.state.packed}
                  value="Packed"
                  onChange={(e)=>{this.setState({packed:e.target.checked})}}
                />
                Packed
              </label>
              <label className="Homepage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-transit"
                  checked={this.state.inTransit}
                  value="InTransit"
                  onChange={(e)=>{this.setState({inTransit:e.target.checked})}}
                />
                InTransit
              </label>
              <label className="Homepage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="orders-delivered"
                  checked={this.state.delivered}
                  value="Delivered"
                  onChange={(e)=>{this.setState({delivered:e.target.checked})}}
                />
                Delivered
              </label>
            </div>
          </div>
            </div>
            <div style={{width: "88%"}}>
            <table className="Homepage_OrderTable">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              <tbody className="Homepage_TableRow">
                {
                  filterArray.map(item=>{
                    return(
                      <tr>
                      <td className="Homepage_SecondaryText">{item.id}</td>
                      <td className="Homepage_PrimaryText">{item.customerName}</td>
                      <td className="Homepage_PrimaryText">
                        {item.orderDate} <br />
                        <span className="Homepage_SecondaryText">{item.orderTime}</span>
                      </td>
                      <td className="Homepage_SecondaryText">${item.amount}</td>
                      <td className="Homepage_PrimaryText">{item.orderStatus}</td>
                    </tr> 
                    )
                  })
                } 
              </tbody>
            </table>
          </div>
          </div>
        
            </div>
            </main>
 </div>
        )
    }
}