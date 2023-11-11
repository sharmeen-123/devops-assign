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
import { NavLink } from 'react-router-dom';
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
import { Demo } from '../notification/notification';
import { ErrorNoti } from '../notification/notificationError';
import Loading from '../Loader/loading';
//   import "./AddUserrr.css"

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
      paddingLeft: 0,
      marginLeft: 0,
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
      paddingRight: 0,
      marginRight: 0,
      flex: 1,

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

export function ProfileInfo() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { activeUser, setActiveUser } = useContext(AuthContext)
  const { msg, setMsg } = useContext(AuthContext);
  const [img, setImg] = useState(activeUser.image);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('');
  const [isAdded, setIsAdded] = useState(false)


  function handlePhoneChange(event) {
    const { value } = event.target;
    if (value.length <= 10) {
      setPhoneValue(value);
    }
  }


  const form = useForm({
    initialValues: {
      address: activeUser.address,
      phone: activeUser.phone,
      fName: activeUser.fname,
      lName: activeUser.lname,
      email: activeUser.email,
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
  const updateUser = async (user) => {

    let res = await axios2.put('/user/updateUser/' + activeUser.id, {
      name: user.fName + " " + user.lName,
      email: user.email,
      userType: "Admin",
      phone: phoneValue,
      address: user.address,
      image: img,
      password: activeUser.password
    },
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem('token'))
        }
      })
      .then((res) => {
        let userr = activeUser
        userr.name = user.fName + " " + user.lName;
        userr.fname = user.fName
        userr.lname = user.lName;
        userr.email = user.email;
        userr.phone = phoneValue;
        userr.address = user.address;
        userr.image = img;
        setIsAdded(false)
        setActiveUser(userr)
        localStorage.setItem('user', JSON.stringify(activeUser))
        setMsg("Profile Updated Successfully")
        setAlrt(true)
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
    updateUser(user)
  }
  useEffect(() => {
    console.log("active user**********", activeUser)
    setPhoneValue(activeUser.phone)

  }, [])


  return (
    <div>
      <HeaderTabs title={"Settings"} />
      {isAdded ? (<>
        <Loading />
      </>) : (<>
        {isError ? (<>
          <ErrorNoti />
        </>) : (<></>)}
        <Paper shadow="md" radius="lg" className={classes.main}>

          <div className={classes.wrapper}>
            <div className={classes.contacts}>
              <NavLink to={'/settings'}>
                <Button style={{ width: "100%", backgroundColor: 'green' }}
                onClick={()=>setAlrt(false)}
                >Profile Information</Button>
              </NavLink>
              <div style={{ marginTop: "10%" }}>
                <Avatar size={120} src={img} radius={"md"} style={{ margin: "0 auto" }} />
                <FileInput style={{ width: "30%", margin: "0 auto", marginTop: "1vh", }} placeholder="Upload image" accept="image/png,image/jpeg" onChange={handleImageUpload} />
              </div>
            </div>

            <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
              <NavLink to="/passwordSettings">
                <Button style={{ width: "100%", marginBottom: "3.5rem", backgroundColor: '#F0F0F0', color: "black" }}
                onClick={()=>setAlrt(false)}>Password Settings</Button>
              </NavLink>
              <div className={classes.fields}>
                <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                  <TextInput label="First Name" placeholder="Your first name" {...form.getInputProps('fName')} required />
                  <TextInput label="Last Name" placeholder="Your last name" {...form.getInputProps('lName')} required />
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

                <TextInput label="Address" placeholder="Toronto Canada" required {...form.getInputProps('address')} />



                <Group position="right" mt="md">
                  {/* <NavLink to={"/mainUsers"}> */}
                  <Button type="submit" className={`${classes.control} button`} >
                    Save Changes
                  </Button>
                  {/* </NavLink> */}
                </Group>
              </div>
              {alrt ? (<>
                <Demo />
              </>) : (<></>)}
            </form>
          </div>

        </Paper>

      </>)}


    </div>
  );
}