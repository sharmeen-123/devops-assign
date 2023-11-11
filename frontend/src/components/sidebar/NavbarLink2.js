import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import { IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import './Navbar.css'

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: 'block',
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingTop:0,
    marginTop:0,
    marginBottom:"1.5vh",
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    
  },
  navlinks:{
    '&.active': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    },
  },

  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    marginBottom:"2vh",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    '&.active': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
      borderLeft:"5px solid green"
    },
  },


  chevron: {
    transition: 'transform 200ms ease',
  },

}));


export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link, number, number2,isOpened, setOpenLink,opened, setOpened }) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [isOpen, setIsOpen] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink 
    to={link.link} 
    className={classes.link} 
    activeClassName="active" 
    key={link.label}>
    {link.number2+" "+link.label}
  </NavLink>
  ));

  const handleClick = () => {
    // setIsOpen((o) => !o);
    if(label === isOpened){
      setOpenLink(false)
    }else{
    setOpenLink(label)};
    setOpened(isOpen)
  };


  return (
    <>
      <NavLink to={link} style={{color:"transparent"}} className={classes.navlinks} activeClassName="active">
  <UnstyledButton onClick={handleClick} className={classes.control} 
  >
    <Group position="apart" spacing={0}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <img src={Icon} className={classes.icons} style={{width:'75%'}}/>
          {/* <Icon size="2rem" className={classes.icons}/> */}
        </ThemeIcon>
        {number?(<>
          <Box ml="md" style={{border:"none", }}>{number+". "+label}</Box></>):(<>
            <Box ml="md" style={{border:"none", }}>{label}</Box></>)}
        
      </Box>          
      {hasLinks && (
        <ChevronIcon
          className={classes.chevron}
          size="1rem"
          stroke={1.5}
          style={{
            transform: initiallyOpened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
          }}
        />
      )}
    </Group>
  </UnstyledButton>
</NavLink>
      {hasLinks ? <Collapse in={initiallyOpened}>{items}</Collapse> : null}
    </>
  );
}

