import axios from 'axios'

import React, { Component } from 'react'

export default class ProductsPage extends Component{

    state={
        productData:[],
        expired:false,
        lowStock:false
    }

    componentDidMount(){
        axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
        .then((res)=>{
            this.setState({productData:res.data})
        })
    }

    render(){

      let filterArray = this.state.productData.filter(item=>{
        if(this.state.expired){
          if(new Date(item.expiryDate) > Date.now()){
          return item
        }

      }
        if(this.state.lowStock){
          if(item.stock > 100){
          return item
        }
        }
        if(this.state.expired && this.state.lowStock){
          if(new Date(item.expiryDate) > Date.now() && item.stock > 100){
            return item
          }
        }

        if(!this.state.expired && !this.state.lowStock){
          return item
        }
        
      });



        console.log(this.state.productData)
        return(
            <div>
            <main className="MainContainer">
      <div className="ProductListingPage_PageWrapper">
        <h1 className="ProductListingPage_MainHeading">Products</h1>
        <div className="ProductListingPage_OrdersWrapper">
          <div className="ProductListingPage_FilterWrapper">
            <h3>Filters</h3>
            <div className="ProductListingPage_FilterOptions">
              <p>Count: <span className="productFilterCount">{filterArray.length}</span></p>
              <label className="ProductListingPage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="product-expired"
                  checked={this.state.expired}
                  value="Expired"
                  onChange={(e)=>{this.setState({expired:e.target.checked})}}
                />
                Expired
              </label>
              <label className="ProductListingPage_FilterCheckbox">
                <input
                  type="checkbox"
                  name="product-low-stock"
                  checked={this.state.lowStock}
                  value="LowStock"
                  onChange={(e)=>{this.setState({lowStock:e.target.checked})}}
                />
                LowStock
              </label>
            </div>
          </div>
          <div style={{width: "100%"}}>
            <table className="ProductListingPage_OrderTable">
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Product Brand</th>
                <th style={{minWidth: "100px"}}>Expiry Date</th>
                <th>Unit Price</th>
                <th>Stock</th>
              </tr>
              <tbody id="trWrapper">
                {
                    filterArray.map(item=>{
                        return (<tr
                        className="ProductListingPage_TableRow ProductListingPage_ExpiredRow"
                      >
                        <td className="ProductListingPage_SecondaryText" id="text1">{item.id}</td>
                        <td className="ProductListingPage_PrimaryText" id="text2">{item.medicineName}</td>
                        <td className="ProductListingPage_SecondaryText" id="text3">{item.medicineBrand}</td>
                        <td className="ProductListingPage_PrimaryText" id="text4">{item.expiryDate}</td>
                        <td className="ProductListingPage_SecondaryText" id="text5">${item.unitPrice}</td>
                        <td className="ProductListingPage_SecondaryText" id="text6">{item.stock}</td>
                      </tr>)   
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