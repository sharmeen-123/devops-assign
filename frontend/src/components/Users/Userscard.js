import React, {useState, useEffect} from "react";
import admin from "../../imgs/Setting.png"
import Employee from "../../imgs/construction.png"
import rejected from "../../imgs/rejected.png"
import "./UsersCard.css";

export default function Userscard({user}) {
 


  return (
    <div>
      <div className="main_container">
      <div className="card">
          <div className="title">
          <p>Total Employees</p>
          <div className="icon">
            <svg width="28" height="18" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.225 0C10.5842 0 11.8878 0.543246 12.8489 1.51023C13.81 2.47722 14.35 3.78873 14.35 5.15625C14.35 6.52377 13.81 7.83528 12.8489 8.80227C11.8878 9.76925 10.5842 10.3125 9.225 10.3125C7.86577 10.3125 6.5622 9.76925 5.60108 8.80227C4.63995 7.83528 4.1 6.52377 4.1 5.15625C4.1 3.78873 4.63995 2.47722 5.60108 1.51023C6.5622 0.543246 7.86577 0 9.225 0ZM32.8 0C34.1592 0 35.4628 0.543246 36.4239 1.51023C37.385 2.47722 37.925 3.78873 37.925 5.15625C37.925 6.52377 37.385 7.83528 36.4239 8.80227C35.4628 9.76925 34.1592 10.3125 32.8 10.3125C31.4408 10.3125 30.1372 9.76925 29.1761 8.80227C28.215 7.83528 27.675 6.52377 27.675 5.15625C27.675 3.78873 28.215 2.47722 29.1761 1.51023C30.1372 0.543246 31.4408 0 32.8 0ZM0 19.2521C0 15.4559 3.06219 12.375 6.83547 12.375H9.57094C10.5895 12.375 11.5569 12.6006 12.4281 13.0002C12.3448 13.4643 12.3064 13.9477 12.3064 14.4375C12.3064 16.8996 13.3827 19.1104 15.0803 20.625C15.0675 20.625 15.0547 20.625 15.0355 20.625H1.36453C0.615 20.625 0 20.0063 0 19.2521ZM25.9645 20.625C25.9517 20.625 25.9389 20.625 25.9197 20.625C27.6238 19.1104 28.6936 16.8996 28.6936 14.4375C28.6936 13.9477 28.6487 13.4707 28.5719 13.0002C29.4431 12.5941 30.4105 12.375 31.4291 12.375H34.1645C37.9378 12.375 41 15.4559 41 19.2521C41 20.0127 40.385 20.625 39.6355 20.625H25.9645ZM14.35 14.4375C14.35 12.7965 14.9979 11.2227 16.1513 10.0623C17.3046 8.9019 18.8689 8.25 20.5 8.25C22.1311 8.25 23.6954 8.9019 24.8487 10.0623C26.0021 11.2227 26.65 12.7965 26.65 14.4375C26.65 16.0785 26.0021 17.6523 24.8487 18.8127C23.6954 19.9731 22.1311 20.625 20.5 20.625C18.8689 20.625 17.3046 19.9731 16.1513 18.8127C14.9979 17.6523 14.35 16.0785 14.35 14.4375ZM8.2 31.2791C8.2 26.5354 12.0245 22.6875 16.7395 22.6875H24.2605C28.9755 22.6875 32.8 26.5354 32.8 31.2791C32.8 32.2266 32.0377 33 31.0895 33H9.91047C8.96875 33 8.2 32.233 8.2 31.2791Z" fill="rgb(202, 38, 38)" />
            </svg>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{user.allUsers}</h1>
          </div>
          <div style={{ borderBottom:"2px solid rgb(202, 38, 38)"}} className="line"/>
          <br/>
        </div>
        
    


        <div className="card">
          <div className="title">
          <p>Site Workers</p>
          <div className="icon">
            <img src={Employee} style={{width:"3vw", marginTop:"-0.8vw"}}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{user.employees}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #BFB614"}} className="line"/>
          <br/>
        </div>

        <div className="card">
          <div className="title">
          <p>Admin</p>
          <div className="icon">
            <img src={admin}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{user.admin}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #20691A"}} className="line"/>
          <br/>
        </div>

        <div className="card">
          <div className="title">
          <p>Pending</p>
          <div className="icon">
            <img src={rejected}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{user.unverified}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #2BB9B4"}} className="line"/>
          <br/>
        </div>

       
      </div>
    </div>
  );
}
