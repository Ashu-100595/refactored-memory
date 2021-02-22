import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Navbar extends Component{


  logout =()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("expiry");
    window.location.href = "/"
  }
    render(){
    return(
         <div className="Topbar">
          <div className="Topbar_LeftMenu">
        <div className="Topbar_LogoWrapper">
          <img
            src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
            alt="Logo"
          />
          <p className="Topbar_BrandName">Kafene</p>
        </div>
       {localStorage.getItem("expiry") && localStorage.getItem("expiry") > Date.now() && <nav>
          <p className="Topbar_MenuItem" href=""><Link to="/orders" className="linkNav">Orders</Link></p>
          <p className="Topbar_MenuItem" href=""><Link to="/products" className="linkNav">Products</Link></p>
          <p className="Topbar_MenuItem" href=""><Link to="/users" className="linkNav">Users</Link></p>
        </nav>}
      </div>
      
      {localStorage.getItem("expiry") && localStorage.getItem("expiry") > Date.now() &&<p className="Topbar_MenuItem logout-btn" ><Link onClick={this.logout.bind(this)} className="linkNav">Logout</Link></p>}
         </div>
    )
 }
}