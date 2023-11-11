import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  createStyles,
  rem,
  Anchor,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileInput, Avatar, Modal, Alert } from '@mantine/core';
import React, { useState, useContext, useEffect } from 'react';
import axios from '../../axios';
import { useDisclosure } from '@mantine/hooks';
import { HeaderTabs } from '../header/header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import { IconAlertCircle } from '@tabler/icons-react';
import man from "./../../imgs/man.png"
import Logo from "../../imgs/logo.png";
import { Demo } from '../notification/notification';
// import './Signup.css'
import Bg from '../../imgs/backgroundImage.jpg'
import { NavLink } from 'react-router-dom';

import { ErrorNoti } from '../notification/notificationError';
// import { ContactIconsList } from '../ContactIcons/ContactIcons';
// import bg from './bg.svg';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      // borderRadius: theme.radius.lg,
      padding: rem(4),
      // // margin:"3vw",
      // border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
      //   }`,


      [BREAKPOINT]: {
        flexDirection: 'column',
      },


    },
    main: {
      // margin: "1.5%",
      height: "100%"
      // border:"2px solid red"
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      // borderRight:"2px solid #f5f6fa",
      padding: theme.spacing.xl,



      // paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      // borderLeft: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      // border: "2px solid rgb(226, 225, 225)",

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },
    div: {

      marginRight: "5%",
      marginLeft: "5%",
    },
    contacts: {
      boxSizing: 'border-box',
      flex: 2,
      alignItems: 'center',
      // width:'60%',
      // padding: theme.spacing.xl,
      // paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      margin: '0 auto',
      textAlign: 'center',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },
    fields: {
      marginTop: rem(-12),

    },

    fieldInput: {
      flex: 1,

      '& + &': {
        // marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: 'flex',

      [BREAKPOINT]: {
        flexDirection: 'column',
      },
    },


    title: {
      // marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      justifyContent: 'center',
      textAlign: "center",
      color: 'green',
      margin: ".2rem",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },
    img: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: "95vh",
    },
    control: {
      margin: "1%",
      backgroundColor: "green",
      '&:hover': {
        backgroundColor: '#4F7942 !important',
      },
    },
  };
});

export function AuthenticationImage() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { msg, setMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [err, setErr] = useState(false);
  const { activeUser, setActiveUser } = useContext(AuthContext)
  const { login, setLogin } = useContext(AuthContext);

  // adding user in db
  const handleChange = async (userr) => {
    console.log('axios')
    let res = await axios.post('/auth/login', {
      email: userr.email,
      password: userr.password, 
      job: "admin"
    })
      .then((res) => {
        let user = res.data.data
        user.password = userr.password
        console.log("data", activeUser, res.data.data)
        setLogin(true)
        setMsg("Your Account Has Been Created")
        if(res.data.token){
          localStorage.setItem('token', JSON.stringify(res.data.token))
          localStorage.setItem('user', JSON.stringify(res.data.data))
          setActiveUser(JSON.parse(localStorage.getItem('user')))
          navigate('/dashboard');
      }
      })
      .catch((error) => {
        if(error.response.data){
        setMsg(error.response.data)}
        else{
          setMsg("Some Error Occured")
        }
        setErr(true)
      })
    
  }

  const form = useForm({

    initialValues: {
      password: '',
      email: '',
    },

  });


  const handleForm = (user) => {
    console.log(user)
    handleChange(user)
  }




  return (
    <div>

      <Paper shadow="md" radius="lg" className={classes.main}>

        <div className={classes.wrapper}>


          <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
            <div className={classes.div}>
              {/* <img src={Logo} style={{width:"5rem"}}/> */}
              {alrt ? (<>
                {console.log('in alrt')}
                <Demo />
              </>) : (<></>)}
              <h1 fz="md" fw={500} className={classes.title}>
                Login
              </h1>

              <div className={classes.fields}>


                <TextInput
                  label="Email"
                  placeholder="hello@gmail.dev"
                  // pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                  mt="md"
                  size="md"
                  required
                  {...form.getInputProps('email')}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  mt="md"
                  size="md"
                  required
                  {...form.getInputProps('password')}
                />

                {err ? (<>
                  <Text style={{ color: "red" }}>
                    {msg}
                  </Text>
                </>) : (<></>)}




                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center"
                }}>

                  {/* <NavLink to={"/mainUsers"}> */}
                  <Button type="submit" fullWidth mt="xl" size="md" className={classes.control}>
                    Login
                  </Button>
                  {/* </NavLink> */}
                  <Text ta="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <NavLink to={'/signup'} style={{ color: 'green' }}>
                      <Anchor weight={700}
                        style={{ color: 'green' }}>
                        Register
                      </Anchor>
                    </NavLink>

                  </Text>
                </div>
              </div>
            </div>
          </form>
          <div className={classes.contacts} >
            <div className={classes.img}>
              <img src={Logo} style={{ width: '35vw' }} />
            </div>
          </div>
        </div>

      </Paper>

    </div>
  );
}