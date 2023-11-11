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
import { NavLink } from 'react-router-dom';
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
      // display: 'flex',
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
      // flex: 1,
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
    button: {
      flex: 1,

    },

    contacts: {
      display: 'flex',
      flexDirection: "row",
      borderRadius: theme.radius.lg,
      // backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: `${rem(1)} solid transparent`,
      padding: theme.spacing.xl,


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

export function PasswordSettings() {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { alrt, setAlrt } = useContext(AuthContext);
  const { activeUser, setActiveUser } = useContext(AuthContext)
  const { msg, setMsg } = useContext(AuthContext);
  const [img, setImg] = useState(activeUser.image);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false)
  const [phoneValue, setPhoneValue] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
      oldPassword: '',
    },

    validate: {
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  // adding user in db
  const updateUser = async (user) => {

    let res = await axios2.put('/user/updatePassword/' + activeUser.id, {
      oldPassword: user.oldPassword,
      password: user.password,
    }, {
      headers: {
        authorization: JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {
        let userr = activeUser
        userr.password = user.password
        setActiveUser(userr)
        localStorage.setItem('user', JSON.stringify(userr))
        setMsg("Password Updated Successfully")
        setAlrt(true)
        setIsAdded(false)
        navigate('/settings');
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
              <NavLink to={'/settings'} className={classes.button} style={{ paddingLeft: '2%' }}>
                <Button style={{ width: "100%", backgroundColor: '#F0F0F0', color: "black", flex: 1 }}
                onClick={()=>setAlrt(false)}>Profile Information</Button>
              </NavLink>
              <Button style={{ width: "100%", backgroundColor: 'green', flex: 1 }} className={classes.button}
              onClick={()=>setAlrt(false)}>Password Settings</Button>


            </div>

            <form className={classes.form} onSubmit={form.onSubmit((values) => handleForm(values))}>
              <div className={classes.fields}>
                <PasswordInput
                  mt="sm"
                  label="Old password"
                  placeholder="Old password"
                  required
                  {...form.getInputProps('oldPassword')}
                />
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

                <Group position="right" mt="md">
                  {/* <NavLink to={"/mainUsers"}> */}
                  <Button type="submit" className={`${classes.control} button`} >
                    Update Password
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