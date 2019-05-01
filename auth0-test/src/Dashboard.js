import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = props => {
  const [gotData, setGotData] = useState("not set");

  useEffect(() => {
    props.auth.handleAuthentication();
    axios
      .post("http://localhost:5000/login", null, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then(res => {
        console.log(res);
        setGotData("We did!");
      })
      .catch(err => {
        console.log("Whoops");
      });
  }, []);

  return (
    <div>
      <h3>{gotData}</h3>
    </div>
  );
};

export default Dashboard;
