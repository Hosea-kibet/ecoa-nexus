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

const Communicationhistory = () => {
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
      selector: (row) => <span>2022-09-01</span>,
      sortable: true,

    },
    {
      name: "Text Message",
      selector: (row) => <span className="inline-block max-w-prose">Lorem ipsum dolor <br/>sit amet,consectetur adipiscing elit. Nunc faucibus vestibulum hendrerit. Ut vestibulum consectetur tincidunt. Fusce molestie ut dui nec porta. Curabitur at viverra metus. Mauris lobortis semper orci maximus efficitur. Pellentesque lacinia metus quis mi</span>,
    },
    {
      name: "Type of SMS",
      selector: (row) => <span>SSD</span>,
    },
    {
      name: "Status",
      selector: (row) => <span>Delivered</span>,
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
    <div className="homeasc w-full overflow-x-scroll">
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

export default Communicationhistory;