import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./Charts.css";

const Charts = (props) => {
  const [optionsBar, setOptionsBar] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["shift 1", "shift 2", "shift 3", "shift 4", "shift 5", "shift 6", "shift 7", "shift 8"],
    },
    colors: ["#93dba4"],
  });

  let series= [{data: props.prevShifts,}];
  let prevseries = [{data: props.prevAmount}];

  const [options2, setOptions2] = useState({
    labels: ["Others", "Admin", "Site Workers", "Not Verified"]
  });
  let series2 = [
   props.users.allUsers-props.users.admin-props.users.employees,
   props.users.admin,
   props.users.employees,
   props.users.unverified
  ];

  const [options3, setOptions3] = useState({
    labels: ["Active Shifts", "Completed Shifts"]
  });
  let series3 = [
   props.shifts.activeShifts,
   props.shifts.completedShifts
  ];

  // const [options4, setOptions4] = useState({
  //   labels: ["Current Cycle Amount", "Previous Amount"]
  // });
  // const [series4, setSeries4] = useState([
  //   props.amount.thisCyclePayment,
  //   props.amount.totalAmountPaid-props.amount.thisCyclePayment
  // //  props.shifts.completedShifts
  // ]); 

  useEffect (()=>{
    // setSeries( [{data: props.prevShifts,}])
    // setprevSeries([{data: props.prevAmount}])
  },[])
  //   const [labels, setLabels] = useState(["A", "B", "C", "D", "E"]);

  return (
    <div>
    <div className="container">
      <div className="mini">
        <Chart options={optionsBar} series={series} type="bar" width="500" />
        <p>Chart for Previous Shifts</p>
      </div>
      <div className="mini">
        <Chart options={optionsBar} series={prevseries} type="bar" width="500" />
        <p>Chart for Previous Amounts</p>
      </div>
    </div>

    <div className="container">
    <div className="mini">
        <Chart options={options3} series={series3} type="donut" width="400" />
        <p>Current Cycle Shifts</p>
      </div>
      <div className="mini">
        <Chart options={options2} series={series2} type="donut" width="400" />
        <p>Chart for Employees</p>
      </div>
  </div>

  
  </div>
  );
};

export default Charts;
