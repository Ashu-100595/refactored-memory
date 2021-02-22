import axios from 'axios'
import React, { Component } from 'react'

export default class UsersPage extends Component{

   state={
       userData:[],
       search:'',
       filterArray:[]
   }


    componentDidMount(){
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users')
        .then((res)=>{
            this.setState({userData:res.data,filterArray:res.data})
        })

        if(this.state.search.length == 0){
          this.setState({filterArray : this.state.userData});
        }
    }
  filter=()=>{
      let filterArray = []
      let pattern =new RegExp (`${this.state.search}`,"i");
      console.log(pattern);
      if(this.state.search.length >= 2){
        filterArray =this.state.userData.filter(user => 
        pattern.test(user.fullName)
        );
        this.setState({filterArray:filterArray});
      }else{
        alert("Please enter atleast two Characters");
      }
    }

    render(){
       console.log(this.state);
        return(
            <div>
            <div className="UserList_PageWrapper">
      
      <h1 className="UserList_MainHeading">Users</h1>
    <div className="UserList_OrdersWrapper">
      <div className="UserList_FilterWrapper">
        <input className="UserList_SearchBox" type="search" value={this.state.search} placeholder="Search by Name" onChange={(e)=>this.setState({search:e.target.value})} 
        onKeyDown={(e)=>{
          if(e.key=='Enter'){
            this.filter();
          }
        }}></input> 
        <input type="reset" className="UserList_Button" value="Reset" onClick={()=>this.setState({filterArray:this.state.userData,search:''})}></input> 
      </div>
      <section>
       <table className="UserList_OrderTable">
         <tr>
           <th>ID</th>
           <th>User Avatar</th>
           <th>Full Name</th>
           <th style={{minWidth: "100px"}}>DoB</th>
           <th>Gender</th>
           <th>Current Location</th>
         </tr>
         <tbody className="UserList_TableRow">
            {
                this.state.filterArray.map(item=>{
                   return (<tr className="UserList_TableRow">
              <td className="UserList_SecondaryText">{item.id}</td>
              <td className="UserList_PrimaryText">
                <img src={item.profilePic} alt="Profile Pic"/>
              </td>
              <td className="UserList_SecondaryText">{item.fullName}</td>
              <td className="UserList_PrimaryText">{item.dob}</td><td className="UserList_SecondaryText__3UV5v">{item.gender}</td>
              <td className="UserList_SecondaryText">{item.currentCity}, {item.currentCountry}</td>
            </tr>)
                })
            }
          </tbody>
         </table>
         </section>
         </div>
         </div>
 </div>
        )
    }
}