import React from 'react';
import './Styles/Main.css'
import Navbar from './Component/Navbar/Navbar'
import LoginPage from './Component/Login/Login'
import OrdersPage from './Component/Orders/Orders'
import ProductsPage from './Component/Products/Products'
import UsersPage from './Component/Users/Users'
import { Route,  BrowserRouter, Switch} from 'react-router-dom'; 
import PrivateRoute from "./Component/PrivateRoute";
if (localStorage.getItem("expiry")) {
  if (localStorage.getItem("expiry") < Date.now()) {
    // Logout user
    localStorage.removeItem("user");
    localStorage.removeItem("expiry")
    // Clear current Profile
    // Redirect to login
    window.location.href = '/login';
  }
}

function App() {
  return (
    <div >
    <BrowserRouter>
          <Navbar/>
          <Route exact path="/" component={LoginPage} />
          <Switch>
          <PrivateRoute exact path="/orders" component={OrdersPage}/>
          <PrivateRoute exact path="/products" component={ProductsPage}/>
          <PrivateRoute exact path="/users" component={UsersPage}/>
          </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
