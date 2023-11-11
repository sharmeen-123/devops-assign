import { useState, useContext, useEffect } from 'react';
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconLogout,
  IconChevronDown,
} from '@tabler/icons-react';
import './header.css'
import { AuthContext } from "../../App";
import Logout from '../logout/logout';


const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    }`,
    // width: '85rem'
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: 'transparent',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },

    '&[data-active]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2],
    },
  },
}));


export function HeaderTabs({title }) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const{activeUser, setActiveUser} = useContext(AuthContext);
  const {logout, setLogout} =useContext(AuthContext);
  useEffect (()=>{
    setActiveUser(JSON.parse(localStorage.getItem('user')))
    console.log("header tabb", JSON.parse(localStorage.getItem('user')))
  },[])
 

  return (
    <div className={classes.header} >
      <Container className={classes.mainSection} style={{marginLeft:0}}>
        <Group position="apart">
        <Group position="apart">
        {/* <img src={Logo} style={{width:"4vw", margin:"0"}}/> */}
        <Text style={{fontWeight:"700", fontSize:"2vw"}}>
            {title}
        </Text>
        </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target style={{marginRight:0, paddingRight:0}}>
              <UnstyledButton
                className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
              >
                <Group style={{marginRight:0, paddingRight:0}}>
                  <Avatar src={JSON.parse(localStorage.getItem('user')).image} alt={JSON.parse(localStorage.getItem('user')).name} radius="xl" size={40} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {JSON.parse(localStorage.getItem('user')).name}
                  </Text>
                  <IconChevronDown size={rem(12)} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>

              <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5}/>} onClick={() => setLogout(true)}>Logout</Menu.Item>

            
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      {logout?(<>
      <Logout/>
      </>):(<></>)}

      
    </div>
  );
}