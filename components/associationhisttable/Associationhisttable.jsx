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

const Associationhisttable = () => {
  const router = useRouter();

  const { id } = router.query;

  const [customers, setCustomer] = useState([]);
  const [data, setTransactions] = useState([]);

  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const [user, setUser] = useState([]);

  const [userLoanAccounts, setUserLoanAccount] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/clients/${id}/`,
          {
            headers: {
              "fineract-platform-tenantid": "default",
              Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
            },
          }
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/clients/${id}/accounts`,
          {
            headers: {
              "fineract-platform-tenantid": "default",
              Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
            },
          }
        )
        .then((res) => {
          setUserLoanAccount(res.data.loanAccounts);
          console.log("user accounts:", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  useEffect(() => {
    if (userLoanAccounts && userLoanAccounts.length > 0) {
      try {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loans/${userLoanAccounts[0].id}?associations=all&exclude=guarantors,futureSchedule`,
            {
              headers: {
                "fineract-platform-tenantid": "default",
                Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
              },
            }
          )
          .then((response) => {
            // setTransactions(response.data.transactions)
            setTransactions(response.data);
            console.log(response);

            //setTransactions(response.data)
            setCustomer(response.data);

            setFilteredResults(response.data.transactions);
          })
          .catch((err) => {
            console.log(`error is ${err}`);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [id, userLoanAccounts]);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date   ,
      sortable: true,

    },
    {
      name: "Serial",
      selector: (row) => <span>EPC400371</span>,
    },
    {
      name: "Event",
      selector: (row) => <span>Association</span>,
    },
    {
      name: "Changed By",
      selector: (row) => <span>Ceasay Moha</span>,
    },

    {
      name: "Reason",
      selector: (row) => <span className="inline-block max-w-prose">The uick brown fox jumps over the lazy <br/>dog</span>,
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
                data={filteredResults}
                fixedHeader
                fixedHeaderScrollHeight="200px"
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
