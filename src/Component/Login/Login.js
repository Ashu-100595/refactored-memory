import { Grid, Paper } from '@material-ui/core'
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoginPage extends Component{
   
  state={
    username:'',
    password:'',
    success:false
  }

  componentDidMount(){ 
    if(localStorage.getItem("expiry") > Date.now()){
      window.location.href = "/orders"
    }
  }

  onSubmit=()=>{
    // axios.post("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login",{username:this.state.username,password:this.state.password})
    // .then((result)=>{
    //   console.log(result)
    // })
    // .catch((err)=>{
    //   console.log(err)
    // })

    if(this.state.username===this.state.password){
      this.setState({success:true})
      alert("Login Successful!");
      localStorage.setItem('user',this.state.username);
      localStorage.setItem('expiry',Date.now()*1000*60*60);
      window.location.href ="/orders";
        }
    else{
      this.setState({success:false})
      alert("Please enter valid credentials!")
    }
  }
  
  render(){
    console.log(this.state)
    return(
         <div>
        <Grid>
            <Paper elevation={3} className="LoginPage_LoginForm">
            <h1>Sign In</h1>
            {/* <form onSubmit={this.onSubmit.bind(this)}> */}
            <input
            className="LoginPage_InputField"
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={(e)=>this.setState({username:e.target.value})}
          />
          <input
            className="LoginPage_InputField"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={(e)=>this.setState({password:e.target.value})}
          />
       <input className="LoginPage_Button" type="submit" value="Login" onClick={this.onSubmit.bind(this)}/>  
          {/* </form> */}
          </Paper>
        </Grid>
         </div>
    )
 }
}