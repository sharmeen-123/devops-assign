import Dash from "../../src/imgs/Dash.png";
import User from "../../src/imgs/user.png";
import Location from "../../src/imgs/location.png";
import Setting from "../../src/imgs/Setting.png";
import Payment from "../../src/imgs/Payment.png";
import total from "../../src/imgs/total.png";
import un from "../../src/imgs/un.png";
import ass from "../../src/imgs/ass.png";

export const Sidebardata = [
  {
    icon: Dash,
    heading: "Dashboard",
    link: "/"
  },
  {
    icon: User,
    heading: "Users",
    // link: "/"
  },
  {
    icon: User,
    heading: "Add User",
    link: "/addUser",
    dropdown:'user',
  },
  {
    icon: User,
    heading: "View Users",
    link: "/mainUsers",
    dropdown:'user',
  },
  {
    icon: Location,
    heading: "Tracking",
    // link: "/"
  },
  {
    icon: Payment,
    heading: "Payments",
    // link: "/"
  },
  {
    icon: Payment,
    heading: "View Payments",
    link: "/paymentUsers"
  },
  {
    icon: Payment,
    heading: "Add Payments",
    link: "/paymentForm"
  },
  {
    icon: Setting,
    heading: "Settings",
    // link: "/"
  },
];
export const CardsData = [
  {
    icon: total,
    number: "224",
    title: "Total Employees",
    color: {
      backGround: "#bbfaca",
    },
  },
  {
    icon: ass,
    number: "24",
    title: "Assigned Employees",
    color: {
      backGround: "#bbfaca",
    },
  },
  {
    icon: un,
    number: "200",
    title: "Unassigned Employees",
    color: {
      backGround: "#bbfaca",
    },
  },
];
