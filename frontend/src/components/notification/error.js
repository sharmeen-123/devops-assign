import { Group, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AuthContext } from "../../App";
import React, {useContext, useEffect} from 'react';

export const NotiError = () => {
    const { msg, setMsg } = useContext(AuthContext);
    const { alrt, setAlrt } = useContext(AuthContext);

    useEffect(() => {
        if (alrt) {
          const timeoutId = setTimeout(() => {
            setAlrt(false);
          }, 5000); // set timeout to 20 seconds (20000 milliseconds)
      
          // return a cleanup function to cancel the timeout if the component unmounts
          return () => {
            clearTimeout(timeoutId);
          };
        }
      }, [alrt]);


      useEffect(() => {
        notifications.show({
          title: 'Error',
          message: msg,
          color:'red',
          autoClose: 2000,
          withCloseButton: true,
        })
        notifications.cleanQueue();
      }, []);

  return (
    <></>
          // notifications.show({
          //   title: 'Error',
          //   message: msg,
          //   color:'red',
          //   autoClose: 5000,
          //   withCloseButton: true,
          // })
     
  );
}