import React, { useState, useEffect, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup } from 'react-map-gl';
import axios2 from '../../axios';
import axios from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Avatar, Text, Paper } from '@mantine/core';
import { AuthContext } from "../../App";
import { NavLink } from 'react-router-dom';
import circle from "../../imgs/circle.png"
import { HeaderTabs } from '../header/header';
import Loading from '../Loader/loading';
import mapboxgl from 'mapbox-gl';
import "./Tracking.css"
import { UserInfoIcons } from './activeUsers';

const Maps = () => {
    const [lng, setLng] = useState(73.0663);
    const [lat, setLat] = useState(33.7294);
    const [opened, { open, close }] = useDisclosure(false);
    const { shift, setShift } = useContext(AuthContext);
    const [address, setAddress] = useState();
    const [shifts, setShifts] = useState();
    const { location, setLocation } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);
    const [userStatus, setUserStatus] = useState();

    const allShifts = async () => {
        try {
            const res = await axios2.get('/shifts/getActiveShifts', 
            {
                headers: {
                  authorization:JSON.parse(localStorage.getItem('token'))
                }
              });
            setShifts(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserStatus = async () => {
        try {
            const res = await axios2.get('/user/getUserStatus', 
            {
                headers: {
                  authorization:JSON.parse(localStorage.getItem('token'))
                }
              });
            setUserStatus(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await axios2.get('/user/getOneUser/' + id, 
            {
                headers: {
                  authorization:JSON.parse(localStorage.getItem('token'))
                }
              });
            setUser(res.data.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const popup = (val) => {
        setShift(val)
        getUser(val.userID)

        let address = null;
        const getAddress = async (latitude, longitude) => {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
                address = response.data.display_name;
                setAddress(address);
                open();
            } catch (error) {
                console.error(error);
            }
        };

        getAddress(val.lastLocation.latitude, val.lastLocation.longitude);
    }

    useEffect(() => {
        allShifts();
        getUserStatus();
    }, []);

    return (
        <div>

            <HeaderTabs title={"Track Employees"} />

            {shifts && userStatus ? (<>
                <div className="main">

                    <div className="map">
                        <Map
                            mapboxAccessToken= {process.env.REACT_APP_API2}
                            style={{
                                width: "40vw",
                                height: "35vw",
                                borderRadius: "15px",
                                border: "2px solid rgb(226, 225, 225)",

                            }}
                            initialViewState={{
                                longitude: lng,
                                latitude: lat,
                                zoom: 10,
                            }}
                            mapStyle='mapbox://styles/mapbox/streets-v11'
                        >
                            {/* <Marker
                        // key={6}
                        latitude={33.6518}
                        longitude={73.1566}
                    /> */}

                            {shifts?.map((val, ind) => {
                                return (
                                    <Marker
                                        key={ind}
                                        longitude={val.lastLocation.longitude}
                                        latitude={val.lastLocation.latitude}
                                        onClick={() => popup(val)}
                                    />

                                );
                            })}


                            <NavigationControl position='bottom-right' />
                            <FullscreenControl />
                            <GeolocateControl />

                        </Map>
                    </div>
                    <div>
                        <div style={{ height: "30rem", display: "flex", flexDirection: "column", width: "24rem" }}>

                            <div style={{ overflow: "auto" }}>
                                <h1 className="numbers" style={{ marginRight: "1vw", marginBottom: "1vw", textAlign: "center" }}>Active Workers</h1>
                                <div >
                                    {userStatus?.map((val, ind) => {
                                        return (
                                            <div
                                                onClick={() => popup(val)}
                                            >
                                                <UserInfoIcons
                                                    avatar={val.image}
                                                    name={val.name}
                                                    title={val.job}
                                                    startTime={val.startTime}
                                                    location={val.lastLocation}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div></>) : (<>
                    <Loading />
                </>)}

            {/* ..........Popup....... */}
            <Modal opened={opened} onClose={close} title="User Info"
                radius="md"
                withBorder
                centered
                p="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

                })}

            >
                {user ? (<>
                    <Paper>
                        <Avatar src={user.image} size={120} radius={120} mx="auto" />
                        <Text ta="center" fz="lg" weight={500} mt="md">
                            {user.firstName + ' ' + user.lastName}
                        </Text>
                        <Text ta="center" c="dimmed" fz="sm">
                            {user.email} • {user.userType}
                        </Text>
                        <div style={{ marginLeft: "2vw", marginTop: "1vw", display: "flex" }} >

                            <div style={{ marginLeft: "0.5vw", marginRight: "0.5vw", marginTop: "0.7vw" }}>
                                <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12.0311C22 17.5078 15.2969 27.258 12.3578 31.281C11.6531 32.2397 10.3469 32.2397 9.64219 31.281C6.70313 27.258 0 17.5078 0 12.0311C0 5.38895 4.92708 0 11 0C17.0729 0 22 5.38895 22 12.0311Z" fill="#000000" />
                                </svg>
                            </div>

                            <Text c="dimmed" fz="sm">
                                {address}
                            </Text>
                        </div>
                            <NavLink to={"/userInfo"}>

                                <Button variant="default" fullWidth mt="md">
                                    View Details
                                </Button>
                            </NavLink>
                        

                    </Paper>

                </>) : (<>
                    <Loading />
                </>)}


            </Modal>

        </div>

    );
};

export default Maps;

