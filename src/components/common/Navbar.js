import React, { Component } from 'react'
import {Link,NavLink} from 'react-router-dom'
import './css/navbar.css'
import ModalLogin from '../user/Moda_login'
import axios from 'axios'
import {host} from '../../config/config'
import {usecheck,extract}  from '../auth/auth'
class Navbar extends Component {
   state={
     auth:false,
     agent:false,
     user:false,
     admin:false
   }
  async componentDidMount(){
  this.loginset()
  }
  logout=()=>{
    localStorage.clear()
    this.setState({
      auth:false,
      agent:false,
      user:false,
      admin:false
    })
  }
  //this function is to change navbar login to logout||profile page 
  loginset=async ()=>{
    const user=await usecheck()
    if(user.auth&&user.usertype==='user'){
   this.setState({
     auth : true,
     agent:false,
        user:true,
        admin:false
   })
    }
   else if(user.auth&&user.usertype==='agent'){
     this.setState({
       auth : true,
       agent:true,
          user:false,
          admin:false
     }) 
   }
   
   else if(user.auth&&user.usertype==='admin'){
     this.setState({
       auth : true,
       agent:false,
          user:false,
          admin:true
     })
   }
  }
    render() {
      const Logout=()=>this.state.auth?(
        
 <div className="nav-link text-dark" onClick={this.logout}>
         Logout
       </div>
      ):(
        <p></p>
      )
      const Login=()=>this.state.user?(
        
 <div className="nav-link text-dark" to="/login">
         <NavLink to='/profile'>
         profile
         </NavLink>
        </div>
      ):(
        this.state.agent?(
          
 <div className="nav-link text-dark" >
         <NavLink to='/agent'>
         Agent profile
         </NavLink>
        </div>
        ):(
        this.state.admin?(
          
 <div className="nav-link text-dark" to="/login">
         <NavLink to='/admin'>
         Admin
         </NavLink>
        </div>
        ):(
<div className="nav-link text-dark" to="/login">
                <ModalLogin set={this.loginset}/>
               </div>)
        )
        )
        return (
            
<nav className="navbar navbar-icon-top navbar-expand-lg text-center ">
  <Link  to="/" className="navbar-brand">
  <div className="logo card-img-top mr-3">
      <h3 className="">ShiHomes</h3>
      </div>
      </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
   aria-expanded="false" aria-label="Toggle navigation">
    <i className="fa fa-bars text-primary"></i>
  </button>

  <div className="collapse navbar-collapse ml-5" id="navbarSupportedContent">
 
    
    <ul className="navbar-nav ">
    <li className="nav-item  mx-3">
        <NavLink className="nav-link " to="/">
         Home
        </NavLink>
        </li>
    <li className="nav-item">
        <NavLink className="nav-link " to="/Buy">
          
          For Sell
        </NavLink>
        </li>
        <li className="nav-item ">
        <NavLink className="nav-link " to="/Rent">
          
          For rent
        </NavLink>
        </li>
     
        <li className="nav-item mx-3">
        <NavLink className="nav-link " to="/Sell">
          Sell Or  Rent Your Property
        </NavLink>
                </li>

                <li className="nav-item ml-5">
        <NavLink className="nav-link " to="/Contact">
          Contact
        </NavLink>
        </li>   
  
      <li className="nav-item ">
        <NavLink className="nav-link " to="/Properties">
     
          Add listing
        </NavLink>
        </li>
        <li className="nav-item mx-3">
       
<Login/>
        </li>
        <li className="nav-item mx-3">
       
<Logout/>
        </li>
    </ul>
  </div>
</nav>

        )
    }
}
export default Navbar