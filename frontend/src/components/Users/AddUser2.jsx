import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Select,
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
import man from "./../../imgs/man.png";
import "./AddUserrr.css"
import Loading from '../Loader/loading';

import { ErrorNoti } from '../notification/notificationError';
// import { ContactIconsList } from '../ContactIcons/ContactIcons';
// import bg from './bg.svg';

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: rem(4),
      // margin:"3vw",
      border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]
        }`,


      [BREAKPOINT]: {
        flexDirection: 'column',
      },


    },
    main: {
      margin: "1.5%",
      // border:"2px solid red"
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,
      borderLeft: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      // border: "2px solid rgb(226, 225, 225)",

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
        marginLeft: theme.spacing.md,

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

    contacts: {
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius: theme.radius.lg,
      // backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,
      flex: `0 0 ${rem(280)}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.sm,
        paddingLeft: theme.spacing.md,
      },
    },

    title: {
      marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      backgroundColor: "green",
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function GetInTouch({ update }) {
  const { classes } = useStyles();
  const [img, setImg] = useState(update.image);
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { msg, setMsg } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);



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
      designation: update.userType,
      email: update.email,
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });





  // upload img on cloudinary
  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (event) {
      const data = new FormData();
      data.append("file", event);
      data.append("upload_preset", "player_image");
      axios.post("https://api.cloudinary.com/v1_1/dyapmvalo/image/upload", data)
        .then((res) => {
          setImg(res.data.url)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  };

  // adding user in db
  const addUser = async (user) => {
    await axios2.post('/auth/register', {
      firstName: user.fName,
      lastName: user.lName,
      email: user.email,
      phone: phoneValue,
      userType: user.designation,
      address: user.address,
      image: img,
      status: "unblock",
      verified: true,
      password:user.password,
    }, 
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {

        setMsg("User Added Successfully")
        setAlrt(true)
        setIsAdded(false)
        navigate('/mainUsers');
      })
      .catch((error) => {
        setIsAdded(false)
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

  // adding user in db
  const updateUser = async (user) => {

    let res = await axios2.put('/user/updateUser/' + update._id, {
      name: user.fName + " " + user.lName,
      email: user.email,
      phone: phoneValue,
      userType: user.designation,
      address: user.address,
      image: img,
    }, 
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {
        setMsg("User Updated Successfully")
        setAlrt(true)
        setIsAdded(false)
        navigate('/mainUsers');
      }

      )
      .catch((error) => {
        setIsAdded(false)
        if (error.response.data) {
          setMsg(error.response.data)
        } else {
          setMsg("Some Error Occured")
        }
        setIsError(true)
        open()
      })
  }



  const handleForm = (user) => {
    setIsAdded(true)
    if (!update) {
      addUser(user)
    } else {
      updateUser(user)
    }
  }
  useEffect(() => {
    if (!update.image) {
      setImg(man)
    }
    if (update) {
      setPhoneValue(update.phone)
    }
  }, [])


  return (
    <div>
      <HeaderTabs title={"Add User"} />
      {isAdded?(<>
      <Loading/>
      </>):(<>
        {isError ? (<>
        <ErrorNoti/>
      </>) : (<></>)}
      <Paper shadow="md" radius="lg" className={classes.main}>

        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:"center", height:'100%' }}>
              <Avatar size={180} src={img} radius={"md"} style={{ margin: "0 auto" }} />
              <FileInput style={{ marginTop: "1vh" }} placeholder="Upload image" accept="image/png,image/jpeg" onChange={handleImageUpload} />
            </div>
          </div>

          <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>


            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput label="First Name" placeholder="Your first name" {...form.getInputProps('fName')} required/>
                <TextInput label="Last Name" placeholder="Your last name" {...form.getInputProps('lName')} required/>
              </SimpleGrid>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
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


                {/* <TextInput label="Contact" placeholder="(555) 555-5555"
                  pattern="^\(?([2-9][0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$"
                  required {...form.getInputProps('phone')} /> */}
                  
              </SimpleGrid>
              {!update?(<>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <Select
                  label="Designation"
                  placeholder="Pick one"
                  data={[
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Site Worker', label: 'Site Worker' }
                  ]}
                  required {...form.getInputProps('designation')}
                />
                <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} />
              </SimpleGrid> </>):(<>
                <Select
                  label="Designation"
                  placeholder="Pick one"
                  data={[
                    { value: 'Admin', label: 'Admin' },
                    { value: 'Site Worker', label: 'Site Worker' }
                  ]}
                  required {...form.getInputProps('designation')}
                />
                <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} />
              </>)}
              
              {!update?(<>
                <PasswordInput
                label="Password"
                placeholder="Password"
                required
                {...form.getInputProps('password')}
              />

              <PasswordInput
                mt="sm"
                label="Confirm password"
                placeholder="Confirm password"
                required
                {...form.getInputProps('confirmPassword')}
              />
              </>):(<></>)}

             



              <Group position="right" mt="md">
                {/* <NavLink to={"/mainUsers"}> */}
                <Button type="submit" className={`${classes.control} button`}>
                  Add User
                </Button>
                {/* </NavLink> */}
              </Group>
            </div>
          </form>
        </div>

      </Paper>
      </>)}
      
      

    </div>
  );
}