import React, { useState, useEffect, useContext } from "react";
import "./PaymnetUsers.css";
import axios from "../../axios";
import { TableSelection } from "./PaymentTable";
import { HeaderTabs } from "../header/header";
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { AuthContext } from "../../App";
import Loading from "../Loader/loading";

import { Demo } from '../notification/notification';

export default function PaymentUsers(props) {
  const [users, setusers] = useState();
  const {alrt, setAlrt} = useContext(AuthContext);
  const {msg, setMsg} = useContext(AuthContext);

  // api to get all payments
  const payAmount = async () => {
    let res = await axios.get('/payment/getAllPayments', {
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
  useEffect(() => {
    payAmount();
  }, [])

  return (
    <div>
      <HeaderTabs title={"View Payments"} />
      {alrt?(<>
        <Demo/>
      </>):(<></>)}
      {users?(<>
    <div className="cont">
    <div style={{ backgroundColor: "#f5f6fa",  borderRadius:'3%',  margin: '1.3%', paddingBottom:"5%", width:"100%"}}>
          
      <TableSelection dataa={users}/>
      </div>
      </div>
      </>):(<>
      <Loading/>
      </>)}
     
    </div>
  );
}
