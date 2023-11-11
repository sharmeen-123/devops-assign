import React, { useState, useEffect, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Source, Layer } from 'react-map-gl';
import { AuthContext } from "../../App";
import { HeaderTabs } from '../header/header';
import Loading from '../Loader/loading';
import "./UserInfo.css"
import { Avatar } from '@mantine/core';
import axios from 'axios';


const Maps = () => {
    const [lng, setLng] = useState(73.0663);
    const [lat, setLat] = useState(33.7294);
    const { shift, setShift } = useContext(AuthContext);
    const [ location, setLocation ] = useState();
    const { user, setUser } = useContext(AuthContext);
    const [address, setAddress] = useState()
    const [data, setData] = useState([])
    let arr = [];

    const getAddress = async (latitude, longitude) => {
        try {

            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const addresss = response.data.display_name;
            arr.push(addresss)
            setLocation(arr)
            setAddress(response.data.display_name);

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        let loc1 = shift.locations
        loc1?.map((val,ind) => {
            getAddress(val.latitude, val.longitude)
        })
        let coordinates = [];
        let loc = shift.locations
        loc?.map((val) => {
            let cord = [val.longitude, val.latitude]
            coordinates.push(cord)
        })
        setData({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        })
    }, []);

    return (
        <div>

            <HeaderTabs title={"User Details"} />
            {shift && location &&user &&data?(<>
                <div style={{ display: "flex", marginTop: "5vw", backgroundColor: "#f5f6fa", borderRadius: '3%', margin: '1.3%' }} className="main">
                <Map
                    mapboxAccessToken= {process.env.REACT_APP_API2}
                    style={{
                        width: "30vw",
                        height: "45vw",
                        borderRadius: "15px",
                        border: "2px solid gray",
                        marginLeft: "13%",
                        marginTop: "1.5%",
                        marginBottom: "1.5%"
                    }}
                    initialViewState={{
                        longitude: lng,
                        latitude: lat,
                        zoom: 8,
                    }}
                    mapStyle='mapbox://styles/mapbox/streets-v11'
                >
                    {/* <Marker
                        // key={6}
                        latitude={33.6518}
                        longitude={73.1566}
                    /> */}
                    {shift.locations?.map((val, ind) => {
                        return (

                            <Marker
                                key={ind}
                                longitude={val.longitude}
                                latitude={val.latitude}
                            />

                        );
                    })}
                    <Source id="my-data" type="geojson" data={data}>
                        <Layer
                            id="my-line-layer"
                            type="line"
                            data={data}
                            stroked={true}
                            lineWidthScale={20}
                            lineWidthMinPixels={2}
                            getLineColor={[255, 0, 0]}
                        />
                    </Source>




                    <NavigationControl position='bottom-right' />
                    <FullscreenControl />
                    <GeolocateControl />

                </Map>
                <div style={{ marginLeft: "5vw" }}>
                    <div className="card" style={{ border: "2px solid rgb(226, 225, 225)", margin: "1vw", width: "25vw" }}>
                        <div style={{ textAlign: "center" }}>
                            <h3 style={{ marginLeft: "0.5vw" }}>check-in Location: </h3>
                            <p style={{ marginLeft: "0.5vw" }}>{" " + location[0]}</p>
                        </div>

                    </div>

                    <div className="card" style={{ border: "2px solid rgb(226, 225, 225)", margin: "1vw", width: "25vw" }}>
                    <Avatar src={user.image} size={90} radius={120} mx="auto" />
                        {user ? (<>
                            <div>
                                <h3 style={{ textAlign: "center" }}>{user.firstName + " " + user.lastName}</h3>
                                <p style={{ textAlign: "center" }}>{user.email}</p>
                                <p style={{ textAlign: "center" }}>{user.userType}</p>
                            </div>


                        </>) : (<></>)}
                    </div>

                    <div className="card" style={{ border: "2px solid rgb(226, 225, 225)", margin: "1vw", width: "25vw", height: "32%" }}>
                        <h3 style={{ marginRight: "0.5vw", marginLeft: "0.5vw", borderBottom: "2px solid rgb(226, 225, 225)", textAlign: "center" }}>All Locations</h3>
                        <div style={{ overflow: "auto", margin: "1vw", scrollbarColor: 'rebeccapurple green' }}>
                            {location ? (<>
                                {location?.map((val) => {
                                    return (
                                        <>
                                            <p style={{ textAlign: "center", borderBottom: "2px double rgb(226, 225, 225)", padding: 0, margin: 0 }}>{val}</p>
                                            
                                        </>
                                    )

                                })}
                            </>) : (<></>)}
                        </div>

                    </div>

                </div>
            </div>
            </>):(<>
            <Loading/>
            </>)}
            

        </div>

    );
};

export default Maps;

