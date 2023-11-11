import React, { useState, useEffect, useContext } from "react";
import Userscard from "./Userscard";
import "./MainUsers.css";
import axios from "../../axios";
import {TableSelection} from "./Table3"
import { HeaderTabs } from "../header/header";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { AuthContext } from "../../App";
import Loading from "../Loader/loading";

import { Demo } from '../notification/notification';

export default function MainUsers() {
  const [users, setusers] = useState()
  const {alrt, setAlrt} = useContext(AuthContext);
  const [isNoti, setNoti] = useState(alrt);
  // setAlrt(false)
  // setAlrt(!alrt)
  const {msg, setMsg} = useContext(AuthContext);
  const [user, setUsers] = useState(false);
  const {updateCard, setUpdateCard} = useContext(AuthContext); 
    // getting users info
    const Users = async () => {
      let res = await axios.get('/user/getAllUsers', 
      {
        headers: {
          authorization:JSON.parse(localStorage.getItem('token'))
        }
      })
        .then((res) => {
          setusers(res.data.data);
        }
  
        )
        .catch((error) => {
          // setError(error.response.data);
          console.log(error);
        })
    }

    // getting users info
    const Userss = async () => {
      let res = await axios.get('/user/getNumberOfUsers', 
      {
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

    
  useEffect(() => {
    Userss();
  }, [updateCard])

  useEffect(() => {
    setAlrt(false);
    Users();
    Userss();
  }, [])


  useEffect(() => {
      const timeoutId = setTimeout(() => {
        
        setNoti(false);
        console.log("noti in useEffect", isNoti)
        // setAlrt(!alrt)
      }, 2000); // set timeout to 20 seconds (20000 milliseconds)
  
      // return a cleanup function to cancel the timeout if the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    
  }, [])

  
  return (
    
    <div >
      
      <HeaderTabs title={"View User"} />
      {isNoti?(<>
        <Demo/>
        {console.log("noti is    ", isNoti)}
      </>):(<></>)}
      
        {user && users?(<>
          <div style={{ backgroundColor: "#f5f6fa",  borderRadius:'3%',  margin: '1.3%', paddingBottom:"5%"}}>
          <Userscard user={user}/>
      <div style={{margin:"2%"}}>
      <TableSelection dataa={users}/>
      </div>
      </div>
      </>):(<>
      <Loading/>
      </>)}
    </div>
  );
}
