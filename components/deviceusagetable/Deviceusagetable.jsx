import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import DataTable, { createTheme } from "react-data-table-component";
import { Button, inputAdornmentClasses } from "@mui/material";
import { useRouter } from "next/router";



import Paper from "@mui/material/Paper";

createTheme("dark", {
  background: {
    default: "transparent",
  },
});

const moment= require('moment') ;

const Associationhisttable = (deviceSerialId) => {
  const router = useRouter()

  const { id } = router.query;

  const[devices,setDevices]=useState([]);

  const [user, setUser] = useState([]);

  const [userLoanAccounts, setUserLoanAccount] = useState([]);


  const getDeviceUsage = async (deviceSerialId) => {
    try {
      const response = await axios.get(`http://54.146.62.247/api/get_data/${deviceSerialId}`, {
      })
      if (response.data.status !== "error")  {
        setDevices(response.data.data)
        console.log("device usage table",response.data.data)
      } else {
        console.log("error happened")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      name: "Date & Time",
      selector: (row) =>(row.device_data.timestamp) ,
      sortable: true,

    },
    {
      name: "Received Data Log",
      selector: (row) =>  row.device_data.timestamp + [", "]+ parseInt(row.device_data.temp) + [""]+"C" + [","]+row.device_data.CoilState,
      // <span className="inline-block max-w-prose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus vestibulum hendrerit. Ut vestibulum consectetur tincidunt. Fusce molestie ut dui nec porta. Curabitur at viverra metus. Mauris lobortis semper orci maximus efficitur. Pellentesque lacinia metus quis mi</span>,
    },
    {
      name: "Content Type",
      selector: (row) => <span>Production log</span>,
    },
    {
      name: "Device Response",
      selector: (row) => <span>ACK</span>,
    },
  ];



  const customStyles = {
    table: {
      width: '100%',
      margin: '2px'

    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        width: '100%',
        
      },
    },
    headCells: {
      style: {
        // backgroundColor: '8px', // override the cell padding for head cells
        paddingRight: "18px",
        paddingLeft: "18px",
        paddingTop: "12px",
        paddingBottom: "12px",
        backgroundColor: "#5F6062",
        color: "white",
        borderradius:'10px'
      },
      body: {
        fontSize: 14,
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", // override the cell padding for data cells
        // paddingRight: '8px',

        // border: '1px solid #ddd',
        // padding: '8px',
      },
    },
  };

  useEffect(() => {
    getDeviceUsage(deviceSerialId);
  }, [])

  return (
    <div className="homeasc">
      <div className="customerprofile">
        <div className="homeContainer">
          {/* <Topbar/> */}
          <div className="customerprofileContainer">
            {/* <div className="top">
              <div className="widgets">
                <Widget type="customersonboarded" />
                <Widget type="epcsold" />
                <Widget type="repaidinloans" />
              </div>
            </div> */}
            <div className="table w-full rounded-[4px]">
              <DataTable
                columns={columns}
                data={devices}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                // selectableRows
                selectableRowsHighlight
                highlightOnHover
                // subHeader
                responsive
                pagination
                theme="solarized"
                // dense
                // subHeaderAlign="left"
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Associationhisttable;
