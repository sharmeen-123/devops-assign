import React, { useState, useEffect } from "react";
import "./Cards.css";
import admin from "../../imgs/Setting.png"
import Employee from "../../imgs/construction.png"
import shift from "../../imgs/shift.png"
import thisCycle from "../../imgs/electric-scooter.png"
import totalPaid from "../../imgs/money-bag.png"
import cost from "../../imgs/cost.png"

function Cards(props) {
  const [shifts, setShifts] = useState(props.shifts);
  const [users, setUsers] = useState(props.users)


  return (
    <div>
      {/* Employeess */}
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
            <h1 className="numbers">{props.users.allUsers}</h1>
          </div>
          <div style={{ borderBottom:"2px solid rgb(202, 38, 38)"}} className="line"/>
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
            <h1 className="numbers">{props.users.admin}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #20691A"}} className="line"/>
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
            <h1 className="numbers">{props.users.employees}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #BFB614"}} className="line"/>
          <br/>
        </div>


      </div>
      {/* Shiftss */}
      <div className="main_container">

      <div className="card">
          <div className="title">
          <p>Total Shifts</p>
          <div className="icon">
            <img src={shift}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{props.shifts.allShifts}</h1>
          </div>
          <div style={{ borderBottom:"2px solid darkblue"}} className="line"/>
          <br/>
        </div>

        <div className="card">
          <div className="title">
          <p>Completed Shifts</p>
          <div className="icon">
          <svg width="28" height="18" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.15 8.25C6.15 6.06196 7.01393 3.96354 8.55172 2.41637C10.0895 0.869194 12.1752 0 14.35 0C16.5248 0 18.6105 0.869194 20.1483 2.41637C21.6861 3.96354 22.55 6.06196 22.55 8.25C22.55 10.438 21.6861 12.5365 20.1483 14.0836C18.6105 15.6308 16.5248 16.5 14.35 16.5C12.1752 16.5 10.0895 15.6308 8.55172 14.0836C7.01393 12.5365 6.15 10.438 6.15 8.25ZM0 31.0857C0 24.7371 5.11219 19.5938 11.4223 19.5938H17.2777C23.5878 19.5938 28.7 24.7371 28.7 31.0857C28.7 32.1428 27.848 33 26.7973 33H1.90266C0.852031 33 0 32.1428 0 31.0857ZM40.0391 11.4082L31.8391 19.6582C31.2369 20.2641 30.2631 20.2641 29.6673 19.6582L25.5673 15.5332C24.9652 14.9273 24.9652 13.9477 25.5673 13.3482C26.1695 12.7488 27.1433 12.7424 27.7391 13.3482L30.75 16.3775L37.8609 9.2168C38.4631 8.61094 39.4369 8.61094 40.0327 9.2168C40.6284 9.82266 40.6348 10.8023 40.0327 11.4018L40.0391 11.4082Z" fill="orange"/>
</svg>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{props.shifts.completedShifts}</h1>
          </div>
          <div style={{ borderBottom:"2px solid orange"}} className="line"/>
          <br/>
        </div>

        <div className="card">
          <div className="title">
          <p>Active Shifts</p>
          <div className="icon">
          <svg width="28" height="18" viewBox="0 0 41 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.35 0C16.5248 0 18.6105 0.869194 20.1483 2.41637C21.6861 3.96354 22.55 6.06196 22.55 8.25C22.55 10.438 21.6861 12.5365 20.1483 14.0836C18.6105 15.6308 16.5248 16.5 14.35 16.5C12.1752 16.5 10.0895 15.6308 8.55172 14.0836C7.01393 12.5365 6.15 10.438 6.15 8.25C6.15 6.06196 7.01393 3.96354 8.55172 2.41637C10.0895 0.869194 12.1752 0 14.35 0ZM11.4223 19.5938H17.2777C18.5973 19.5938 19.8658 19.8193 21.0445 20.2318C20.6922 21.334 20.5 22.5006 20.5 23.7188C20.5 27.5537 22.3898 30.9439 25.2919 33H1.90266C0.852031 33 0 32.1428 0 31.0857C0 24.7371 5.11219 19.5938 11.4223 19.5938ZM22.55 23.7188C22.55 21.2572 23.5219 18.8965 25.2519 17.1559C26.982 15.4153 29.3284 14.4375 31.775 14.4375C34.2216 14.4375 36.568 15.4153 38.2981 17.1559C40.0281 18.8965 41 21.2572 41 23.7188C41 26.1803 40.0281 28.541 38.2981 30.2816C36.568 32.0222 34.2216 33 31.775 33C29.3284 33 26.982 32.0222 25.2519 30.2816C23.5219 28.541 22.55 26.1803 22.55 23.7188ZM31.775 18.5625C31.2112 18.5625 30.75 19.0266 30.75 19.5938V23.7188C30.75 24.2859 31.2112 24.75 31.775 24.75H34.85C35.4137 24.75 35.875 24.2859 35.875 23.7188C35.875 23.1516 35.4137 22.6875 34.85 22.6875H32.8V19.5938C32.8 19.0266 32.3387 18.5625 31.775 18.5625Z" fill="red"/>
</svg>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">{props.shifts.activeShifts}</h1>
          </div>
          <div style={{ borderBottom:"2px solid red"}} className="line"/>
          <br/>
        </div>

        
       
      </div>

      {/* payment cyclee */}
      <div className="main_container">

      <div className="card">
          <div className="title">
          <p>Total Paid Amount</p>
          <div className="icon">
          <img src={totalPaid}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">$ {props.amount.totalAmountPaid}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #23646F"}} className="line"/>
          <br/>
        </div>

        <div className="card">
          <div className="title">
          <p>Paid Amount of Current Cycle</p>
          <div className="icon">
          <img src={thisCycle}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">$ {props.amount.thisCyclePayment}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #F14E7C"}} className="line"/>
          <br/>
        </div>
        

        <div className="card">
          <div className="title">
          <p>Paid Amount of Previous Cycle</p>
          <div className="icon">
          <img src={cost}/>

          </div>
          </div>
          
          {/* <img src={require("../../imgs/total.png")} className="icon" /> */}
          <div>
            <h1 className="numbers">$ {props.amount.totalAmountPaid - props.amount.thisCyclePayment}</h1>
          </div>
          <div style={{ borderBottom:"2px solid #65C1D6"}} className="line"/>
          <br/>
        </div>










        
       
       
      </div>
    </div>

  );
}

export default Cards;
