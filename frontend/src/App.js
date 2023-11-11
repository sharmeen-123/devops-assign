import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import MainDash from "./components/MainDash/MainDash";
import MainUsers from "./components/Users/MainUsers";
import PaymentUsers from "./components/Payment/PaymentUsers";
import Tracking from "./components/tracking/tracking";
import Map from "./components/tracking/userInfo";
import { GetInTouch } from "./components/Users/AddUser2";
import "./App.css"
import { NavbarNested2 } from "./components/sidebar/Navbar2";
import { PaymentForm } from "./components/Payment/PymentForm3";
import { Signup } from "./components/Signup/signup";
import { AuthenticationImage } from "./components/login/login";
import { ProfileInfo } from "./components/setting/profileInfo";
import { PasswordSettings } from "./components/setting/passwordSettings";
import { Demo } from "./components/notification/notification";
import Logo from './imgs/logo.png'
export const AuthContext = React.createContext();

const AdminSideBarLayout = () => {
  return (
    <div className={"main_div"} style={{display:"grid",
      backgroundColor:"white",
      overflow:"hidden",
      gridTemplateColumns: "20% auto"
    }}
      >
      
        <div style={{overflow:"hidden", borderRight:"2px solid #f5f6fa"}}>
        <NavbarNested2/>
        </div>
        
      {/* </div> */}
      {/* <Sidebar/> */}
      <div style={{overflow:"scroll"}}>
      <Outlet />
      </div>
      
    </div>
  );
};

function App() {

  const [update, setUpdate] = useState(false);
  const [location, setLocation] = useState();
  const [login, setLogin] = useState(false)
  const [activeUser, setActiveUser] = useState() 
  const [user, setUser] = useState();
  const[shifts, setShifts] = useState()
  const[msg, setMsg] = useState()
  const [alrt, setAlrt] = useState()
  const [logout, setLogout] =useState(false)
  const [updateCard, setUpdateCard] = useState(false)
  const value = {
    updateCard:updateCard,
    setUpdateCard:setUpdateCard,
    login:login,
    setLogin: setLogin,
    activeUser:activeUser,
    setActiveUser: setActiveUser,
    setUpdate: setUpdate,
    update: update,
    location: location,
    setLocation: setLocation,
    user: user,
    setUser: setUser,
    shift: shifts,
    setShift: setShifts,
    msg:msg,
    setMsg:setMsg,
    alrt: alrt,
    setAlrt: setAlrt,
    logout: logout,
    setLogout: setLogout
  };
  // console.log(process.env.REACT_APP_API)

  // useEffect(() => {
  //   document.title = "New Page Title";
  // }, []);
  return (
    <div>
       {/* <header>
        <img src={Logo} alt="My Logo" />
        <h1>My Website</h1>
      </header> */}
    <AuthContext.Provider value={value}>
      {/* <Demo/> */}
      <Router>
        <div className="App">
          <Routes>
          <Route exact path="/" element={<AuthenticationImage update={false} />} ></Route>
          <Route exact path="/signup" element={<Signup update={false} />} ></Route>
            <Route exact element={<AdminSideBarLayout />} >
              <Route exact path="/dashboard" element={<MainDash />} />
              <Route exact path="/mainUsers" element={<MainUsers />} />
              <Route exact path="/addUser" element={<GetInTouch update={false} />} />
              <Route exact path="/settings" element={<ProfileInfo/>} />
              <Route exact path="/passwordSettings" element={<PasswordSettings />} />
              <Route exact path="/updateUser" element={<GetInTouch update={update} />} />
              <Route exact path="/paymentForm" element={<PaymentForm update={false} />} />
              <Route exact path="/updatePaymentForm" element={<PaymentForm update={update} />} />
              <Route exact path="/paymentUsers" element={<PaymentUsers />} />
              <Route exact path="/trackUser" element={<Tracking />} />
              <Route exact path="/userInfo" element={<Map />} />
            </Route>
            
          </Routes>
        </div>
      </Router>

    </AuthContext.Provider>
    </div>
    
  );
}

export default App;
