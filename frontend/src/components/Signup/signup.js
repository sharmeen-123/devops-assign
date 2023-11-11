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
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FileInput, Avatar, Modal, Alert } from '@mantine/core';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import axios2 from '../../axios';
import { useDisclosure } from '@mantine/hooks';
import { HeaderTabs } from '../header/header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../App";
import { IconAlertCircle } from '@tabler/icons-react';
import man from "./../../imgs/man.png"
import Logo from "../../imgs/logo.png";
import './Signup.css'
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
      height:"100%"
      // border:"2px solid red"
    },

    form: {
      boxSizing: 'border-box',
      flex:1,
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
    div:{
      
      marginRight:"5%",
      marginLeft:"5%",
    },
    contacts:{
      boxSizing: 'border-box',
      flex:2,
      alignItems:'center',
      // width:'60%',
      // padding: theme.spacing.xl,
      // paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      margin:'0 auto',
      textAlign:'center',
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
      margin:".2rem",

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },
    img: {
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      height:"95vh",
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

export function Signup({ update }) {
  const { classes } = useStyles();
  const [img, setImg] = useState(update.image);
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { msg, setMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('');


  function handlePhoneChange(event) {
    const { value } = event.target;
    if (value.length <= 10) {
      setPhoneValue(value);
    }
  }

  const form = useForm({

    initialValues: {
      password: "",
      confirmPassword: '',
      address: update.address,
      phone: update.phone,
      fName: update.firstName,
      lName: update.lastName,
      designation: 'admin',
      email: update.email,
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },

  });

  // adding user in db
  const addUser = async (user) => {
    let res = await axios2.post('/auth/register', {
      firstName: user.fName,
      lastName: user.lName,
      email: user.email,
      phone: phoneValue,
      userType: 'Admin',
      address: user.address,
      image: img,
      status: "unblock",
      verified: false,
      password: user.password
    })
      .then((res) => {

          setMsg("Your Account Has Been Created")
          setAlrt(true)
        navigate('/');
      })
      .catch((error) => {
        if (error.response.data) {
          setMsg(error.response.data)
        }
        else {
          setMsg("Some Error Occured")
        }
        setIsError(true)
        open()
      })

  }



  const handleForm = (user) => {
    addUser(user)
  }

  useEffect(() => {
    setImg(man)
  }, [])


  return (
    <div>

      <Paper shadow="md" radius="lg" className={classes.main}>

        <div className={classes.wrapper}>


          <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
            <div className={classes.div}>
            {/* <img src={Logo} style={{width:"5rem"}}/> */}
            {isError ? (<>
              <ErrorNoti/>
            </>) : (<></>)}
            <h1 fz="md" fw={500} className={classes.title}>
              Signup
            </h1>

            <div className={classes.fields}>
             
                <TextInput label="First Name" placeholder="Your first name" {...form.getInputProps('fName')} required/>
                <TextInput label="Last Name" placeholder="Your last name" {...form.getInputProps('lName')} required/>
             
                <TextInput
                  label="Email"
                  placeholder="hello@gmail.dev"
                  pattern='^[^\s@]+@[^\s@]+\.[^\s@]+$'
                  required
                  {...form.getInputProps('email')}
                />
                <TextInput
                  label="Contact"
                  placeholder="(555) 555-5555"
                  pattern="^[2-9][0-9]{2}[0-9]{3}[0-9]{4}$"
                  required
                  value={phoneValue}
                  onChange={handlePhoneChange}
                />
                <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} />
              

                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  required
                  {...form.getInputProps('password')}
                />
                {/* <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} /> */}
                <PasswordInput
                  mt="sm"
                  label="Confirm password"
                  placeholder="Confirm password"
                  required
                  {...form.getInputProps('confirmPassword')}
                />




              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center"
              }}>

                {/* <NavLink to={"/mainUsers"}> */}
                <Button type="submit" fullWidth mt="xl" size="md" className={classes.control}>
                  SignUp
                </Button>
                {/* </NavLink> */}
                <Group mt="md">
                  <Text>Already have an account</Text>
                  <NavLink to={'/'} style={{ color: 'green', fontWeight: "bold" }}>
                    <Text onClick={() => setAlrt(false)}>Signin</Text>
                  </NavLink>
                </Group>
              </div>
            </div>
            </div>
          </form>
          <div className={classes.contacts} >
          <div className= {classes.img}>
              <img src={Logo} style={{width:'35vw'}} />
              </div>
            </div>
        </div>

      </Paper>

    </div>
  );
}