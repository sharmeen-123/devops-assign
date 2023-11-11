import axios from "../../axios";
import Cards from "../Cards/Cards";
import Charts from "../Charts/Charts";
import React, {useEffect, useState} from "react";
import "./MainDash.css";
import { HeaderTabs } from "../header/header";
import Loading from "../Loader/loading";

function MainDash(props) {
  const [shifts, setShifts] = useState('');
  const [users, setUsers] = useState('');
  const [prevShifts, setPrevShifts] = useState("");
  const [payment, setPayment] = useState("");
  const [prevAmount, setPrevAmount] = useState("")

   // getting shifts info
   const Shifts = async () => {
    let res = await axios.get('/shifts/getNumberOfShifts', {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    }
    )
    .then ((res) => {
      console.log("data", res.data)
      setShifts(res.data.data);
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }

  // getting users info
  const Users = async () => {
    let res = await axios.get('/user/getNumberOfUsers', {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
    .then ((res) => {
      setUsers(res.data.data);
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }

   // getting previous Shifts info
   const previousShifts = async () => {
    let res = await axios.get('/cycle/getAllcycles', {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
    .then ((res) => {
      setPrevShifts(res.data.data);
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }
   // getting payment info
   const paidAmount = async () => {
    let res = await axios.get('/payment/getAmountPaid', {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
    .then ((res) => {
      setPayment(res.data);
    }
      
    )
    .catch((error) => {
        // setError(error.response.data);
        console.log(error);
    })
  }
    // getting payment info
    const previousAmount = async () => {
      let res = await axios.get('/payment/getAllcycles', {
        headers: {
          authorization:JSON.parse(localStorage.getItem('token'))
        }
      }
      )
      .then ((res) => {
        setPrevAmount(res.data.data);
      }
        
      )
      .catch((error) => {
          // setError(error.response.data);
          console.log(error);
      })
    }
  useEffect (()=>{
    Shifts();
    Users();
    previousShifts();
    paidAmount();
    previousAmount();
  },[])
  return (
    
    <div>
      <HeaderTabs title={"Dashboard"}/>
      {users && shifts && payment?(
        <div className="MainDash">
        <Cards users={users} shifts={shifts} amount={payment}/>
        {/* <Charts users={users} shifts={shifts} prevShifts={prevShifts} amount={payment} prevAmount={prevAmount}/> */}
      </div>
      ):(
        <Loading></Loading>
      )}
    
    </div>
  );
}

export default MainDash;
