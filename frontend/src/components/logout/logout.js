import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../App";
import { useNavigate } from 'react-router-dom';
import {
    Text,
    Modal,
    Paper,
    Button
  } from '@mantine/core';
  
import { useDisclosure } from '@mantine/hooks';

const Logout = () => {
    
    const [opened, { open, close }] = useDisclosure(false);
    const{activeUser, setActiveUser} = useContext(AuthContext);
    const {update, setUpdate} = useContext(AuthContext);
    const {location, setLocation} = useContext(AuthContext);
    const {login, setLogin} = useContext(AuthContext);
    const {user, setUser} = useContext(AuthContext);
    const{msg, setMsg} = useContext(AuthContext);
    const {alrt, setAlrt} = useContext(AuthContext);
    const {logout, setLogout} =useContext(AuthContext);
    const navigate = useNavigate();

    
    const logoutt = () => {
        setLogin(false)
        setUpdate(false)
        setLogout(false)
        setActiveUser()
        setLocation()
        setUser()
        setMsg()
        setAlrt()
        navigate('/');
        localStorage.clear();

      }

      useEffect(() => {
        open()
    }, []);
  return (
    <div>

        {/* ..........Popup....... */}
      <Modal opened={opened} onClose={() => setLogout(false)} title="Logout"
                radius="md"
                withBorder
                centered
                p="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

                })}

            >
                    <Paper style={{ paddingBottom:"2vh"}}>
                       <Text style={{textAlign: 'center'}}>Are you sure you want to logout?</Text>
<Button onClick={() => { logoutt() }} variant="default" fullWidth mt="md" style={{backgroundColor:"green", color:"white"}}>Yes</Button>
                          <Button  onClick={() => setLogout(false)} variant="default" fullWidth mt="md" style={{backgroundColor:"#D2042D", color:"white"}}>
                            No
                          </Button>
                        

                    </Paper>


            </Modal>
     
      
    </div>
  )
}

export default Logout
