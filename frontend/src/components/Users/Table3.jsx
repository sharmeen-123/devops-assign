import { useState, useEffect, useContext } from 'react';
import { createStyles, Table, Checkbox, ScrollArea, Group, Avatar, Text, rem, Button,  Paper, Modal, TextInput } from '@mantine/core';
import { IconPhoneCall, IconAt, IconMapPin } from '@tabler/icons-react';
import { AuthContext } from "../../App";
import { NavLink } from "react-router-dom";
import axios from '../../axios';
import "./tableStyle.css"
import { useDisclosure } from '@mantine/hooks';
import { Menu, useMantineTheme } from '@mantine/core';
import Close from "../../imgs/close.png"
import {
  IconSquareCheck,
  IconPackage,
  IconUsers,
  IconCalendar,
  IconChevronDown,
  IconSelector,
  IconPlus,
  IconChevronUp,
} from '@tabler/icons-react';
import { Demo } from '../notification/notification';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
  
    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },


}));
function Popup(props) {
  return (
    <div className="popup">
      <div className="popup-inner">{props.children}</div>
    </div>
  );
}


export function TableSelection({ dataa }) {
  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(['1']);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [id, setId] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false)
  const [phone, setPhone] = useState(false);
  const [designation, setDesignation] = useState(false);
  const [address, setAddress] = useState(false);
  const [image, setImage] = useState(require("../../imgs/upload.png"))
  const [users, setusers] = useState(false);
  const [search, setSearch] = useState(false);
  const [data, setData] = useState(dataa)
  const { update, setUpdate } = useContext(AuthContext);
  const {updateCard, setUpdateCard} =useContext(AuthContext); 
  const { msg, setMsg } = useContext(AuthContext);
  const [opened, { open, close }] = useDisclosure(false);
  const [del, setDelete] = useState(false);
  const [isPending, setIspending] = useState(false);
  const [shouldUpdateTable, setShouldUpdateTable] = useState(false);
  const theme = useMantineTheme();

  function togglePopup(user, del) {
    setShowPopup(!showPopup);
    if (user) {
      setId(user._id)
    } else if (del === true) {
      deleteUser()
    } else {
      setId(false)
    }
  }
  function togglePopup2(item) {
    viewUser(item)
    setShowPopup2(!showPopup2);
    open()
  }

  const viewUser = (user) => {
    setName(user.firstName + " " + user.lastName);
    setEmail(user.email);
    setPhone(user.phone);
    setDesignation(user.userType);
    if (user.image) {
      setImage(user.image);
    }
    if (address) {
      setAddress(user.address)
    } else {
      setAddress("Null")
    }
  }
  // getting users info
  const Users = async () => {
    let res = await axios.get('/user/getAllUsers', 
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {
        setData(res.data.data);
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching verification
  const verification = async (id) => {
    console.log("verification", JSON.parse(localStorage.getItem('token')))
    let res = await axios.put('/user/verifyUser/' + id, {},
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    }
    )
      .then((res) => {
        setUpdateCard(!updateCard)
        Users()
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // switching status
  const status = async (e, id) => {
    let res = await axios.put('/user/switchUserStatus/' + id, {},
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    }
    )
      .then((res) => {
        Users()
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  // deleting User
  const deleteUser = async () => {
    setDelete(false)
    if (id) {
      let res = await axios.delete('/user/deleteUser/' + id, 
      {
        headers: {
          authorization:JSON.parse(localStorage.getItem('token'))
        }
      }
      )
        .then((res) => {
          setMsg("User Deleted Successfully")
          setDelete(true)
          Users()
        
        }

        )
        .catch((error) => {
          // setError(error.response.data);
          setDelete(false)
          console.log(error);
        })
    }

  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    Search()
  }

  const handlePending = () => {
    setIspending(!isPending);
    console.log("is pending is ", isPending)
  }

  // searching user
  const Search = async () => {
    let res = await axios.get('/user/getUserByName/' + search, 
    {
      headers: {
        authorization:JSON.parse(localStorage.getItem('token'))
      }
    })
      .then((res) => {
        setData(res.data.data);
      }

      )
      .catch((error) => {
        // setError(error.response.data);
        console.log(error);
      })
  }

  const SortByName = () => {
    if(shouldUpdateTable != "updateName"){
      setData( data.sort((a, b) => a.firstName.localeCompare(b.firstName)));
      setShouldUpdateTable("updateName");
      
    }else{
      Users()
      setShouldUpdateTable(false)
    }

    // if(shouldUpdateTable){
    //   Users()
    // }else{
    //   setData( data.sort((a, b) => a.firstName.localeCompare(b.firstName)));
    // }
    // setShouldUpdateTable(!shouldUpdateTable);
   

  }

  const SortByStatus = () => {
    if(shouldUpdateTable != "updateStatus"){
      setData( data.sort((a, b) => a.status.localeCompare(b.status)));
      setShouldUpdateTable("updateStatus");
      
    }else{
      Users()
      setShouldUpdateTable(false)
    }
   
    // if(shouldUpdateTable){
    //   Users()
    // }else{
    //   setData( data.sort((a, b) => a.status.localeCompare(b.status)));
    // }
    // setShouldUpdateTable(!shouldUpdateTable);

  }
  const SortByVerified = () => {
    if(shouldUpdateTable != "updateVerified"){
      setData( data.sort((a, b) => a.verified - b.verified));
      setShouldUpdateTable("updateVerified");
      
    }else{
      Users()
      setShouldUpdateTable(false)
    }
   
    
  };


  useEffect(() => {
    Users();
  }, [])

  useEffect(() => {
    if (del) {
      const timeoutId = setTimeout(() => {
        setDelete(false);
        {console.log(del)}
      }, 5000); // set timeout to 20 seconds (20000 milliseconds)
  
      // return a cleanup function to cancel the timeout if the component unmounts
      return () => {
        clearTimeout(timeoutId);
      };
    }
  },);

  const rows = data?.map((item) => {
    {console.log("in map data is*****", data)}
    const selected = selection.includes(item.id);
    return (
      <tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Group spacing="sm" style={{display:'flex', justifyContent:'center'}}>
            <Avatar size={26} src={item.image} radius={26} />
            <Text size="sm" weight={500}>
              {item.firstName + " " + item.lastName}
            </Text>
          </Group>
        </td>
        <td>{item.email}</td>
        <td>{item.userType}</td>
        <td>{item.dateJoined}</td>
        <td>
          {item.status === "block" ? (<>
            <Button  onClick={e => status(e, item._id)} className="block">
          Block
        </Button>
            
            </>) : (<>
              <Button  onClick={e => status(e, item._id)} className="unblock">
          unblock
        </Button>
             
              </>)}
        </td>
        <td>
          {item.verified === true ? (<>
            <Button   onClick={handlePending} className="unblock">
          Verify
        </Button>
          
            </>) : (<>

              <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
      
    >
        <Button onClick={e => verification(item._id)} className="block">
          Pending
        </Button>
      
    </Menu>
       
              </>)}

        </td>
        <td style={{ display:'flex', justifyContent:'center'}}>
          <div className="button-container" >
            <div
              onClick={() => togglePopup2(item)}
              style={{cursor: 'pointer'}}>
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eye" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="2" />
                <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
              </svg>
            </div>
 {/* ..........Popup....... */}
 {showPopup2 && (
              <Popup >
               
                <Paper style={{width:"30vw"}}>

                <div>
                <Group position='apart' style={{padding:"2.5%"}}>
                      <Text>
                        User Info
                      </Text>
                      <img src={Close} onClick={() => setShowPopup2(!showPopup2)} style={{width:"15px"}}/>
                    </Group>
      <Group noWrap style={{padding:"10%"}}>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {designation}
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {phone}
            </Text>
          </Group>
          {/* <Group noWrap spacing={10} mt={5}>
            <IconMapPin stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {address}
            </Text>
          </Group> */}
        </div>
      </Group>
    </div>
              
                            
                    </Paper>
                    </Popup>
            )}
            <NavLink
              to="/updateUser">
              <div
                onClick={() => setUpdate(item)}
                style={{ margin: "0", padding: 0, cursor: 'pointer' }}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="orange" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              </div>
            </NavLink>
            <div

              onClick={() => {togglePopup(item)
                              setDelete(false)}}
                              style={{cursor: 'pointer'}}
                              >
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </div>

            {showPopup && (
              <Popup>
               
                <Paper style={{ width: "25vw", padding:"4%" }}>
                <Group position='apart'>
                      <Text>
                        Delete 
                      </Text>
                      <img src={Close} onClick={() => {setShowPopup(!showPopup)
                                                        setDelete(false)}} style={{width:"15px"}}/>
                    </Group>
                        <p>You want to Delete User!</p>
                        <Button onClick={() => { togglePopup(false, true); }} variant="default" fullWidth mt="md"
                          style={{backgroundColor:"#D2042D", color:'white'}}>
                            Yes</Button>
                          <Button  onClick={() => {togglePopup(false, false)
                                                    setDelete(false)}} variant="default" fullWidth mt="md"
                                                    style={{backgroundColor:"green", color:'white'}}>
                            No
                          </Button>
                        
                        
                    </Paper>
              </Popup>
            )}
          </div>
        </td>
      </tr>
    );
  });
 

  return (
    <ScrollArea>
      {del?(<><Demo/></>):(<></>)}
      <Group position='apart'>
      <TextInput label={"Search User"} style={{marginBottom:"2%", width:"85%"}} placeholder={"Search by name"}
      onChange={e=> handleSearch(e)}/>
       <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-end"
      width={220}
      withinPortal
      
    >
      <Menu.Target>
        <NavLink to="/addUser">
        <Button rightIcon={<IconPlus size="1.05rem" stroke={1.5} />} pr={10} onClick={()=> Users()} className='button'>
          Add User
        </Button>
        </NavLink>
      </Menu.Target>
      {/* <Menu.Dropdown>
        
        <Menu.Item
          icon={<IconSquareCheck size="1rem" color={theme.colors.pink[6]} stroke={1.5} />}
          onClick={sortVerified}
        >
          Sort by Verified
        </Menu.Item>
        <Menu.Item
          icon={<IconUsers size="1rem" color={theme.colors.cyan[6]} stroke={1.5} />}
          onClick={sortBlock}
        >
          Sort by Status
        </Menu.Item>
      </Menu.Dropdown> */}
    </Menu>
    </Group>
    <div style={{backgroundColor:"white", border:"2px solid rgb(226, 225, 225)",boxShadow:"0px 0px 3px 3px rgb(226, 225, 225)", borderRadius:"15px", padding:"3%"}}>
      <Table shouldUpdate={shouldUpdateTable}>
        <thead>
          <tr>
            <th >
              <div style={{display: 'flex', justifyContent:'center', cursor:'pointer', alignItems:'center'}} onClick={SortByName}>
                <div style={{marginRight:10}}>Name</div>
                {shouldUpdateTable=='updateName'?(<>
                  <IconSelector size="1.05rem" stroke={2.5}  />
                </>):(<>
                  <IconSelector size="1.05rem" stroke={2.5} style={{ color:'lightgray'}}/>
                </>)}
                
              </div>
            </th>
            <th>Email</th>
            <th>Designation</th>
            <th>Date Joined</th>
            <th >
            <div style={{display: 'flex', justifyContent:'center', cursor: 'pointer',  alignItems:'center'}} onClick={SortByStatus}>
                <div style={{marginRight:10}}>Status</div>
                {shouldUpdateTable=='updateStatus'?(<>
                  <IconSelector size="1.05rem" stroke={2.5}  />
                </>):(<>
                  <IconSelector size="1.05rem" stroke={2.5} style={{ color:'lightgray'}}/>
                </>)}
                {/* <IconChevronDown size="1.05rem" stroke={1.5} style={{marginLeft:10}}/> */}
              </div>
            </th>
            <th>
            <div style={{display: 'flex', justifyContent:'center', cursor:'pointer', alignItems:'center'}}  onClick={SortByVerified}>
                <div style={{marginRight:10}}>Verified</div>
                {shouldUpdateTable=='updateVerified'?(<>
                  <IconSelector size="1.05rem" stroke={2.5}  />
                </>):(<>
                  <IconSelector size="1.05rem" stroke={2.5} style={{ color:'lightgray'}}/>
                </>)}
                {/* <IconChevronDown size="1.05rem" stroke={1.5}/> */}
              </div>
              </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      </div>
    </ScrollArea>
  );
}
