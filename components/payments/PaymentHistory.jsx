import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import DataTable, { createTheme } from "react-data-table-component";
import { Button, inputAdornmentClasses } from "@mui/material";
import Link from 'next/link'
import { useRouter } from "next/router";
import { MagnifyingGlassIcon, PlusIcon, EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/outline'



import Paper from "@mui/material/Paper";

createTheme("dark", {
  background: {
    default: "transparent",
  },
});

const moment= require('moment') ;


const PaymentHistory = () => {
  const router = useRouter()
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
            `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/datatables/raw_transaction/${userLoanAccounts[0].id}`,
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
            console.log("resp",response.data);

            //setTransactions(response.data)
            setCustomer(response.data);

            setFilteredResults(response.data);
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
      selector: (row) => moment(row.created_at ).subtract(1, 'months').subtract(2, 'hours').subtract(30, 'minutes').format('MMMM Do YYYY, h:mm:ss a') ,
      sortable: true,

    },
    {
      name: "Transaction ID",
      selector: (row) => row.TransactionId,
    },
    {
      name: "Channel",
      selector: (row) => row.Channel
      ,
    },
    {
      name: "Name",
      selector: (row) => row.PaidByName,
    },
    {
      name: "Phone Number",
      selector: (row) => row.PaidByAccount,
    },


    {
      name: "Amount",
      selector: (row) => row.PaidAmountCurrentyCode +[' ']+ row.PaidAmount,
    }
  ];

  useEffect(() => {
    const result = data.filter((transaction) => {
      return transaction.PaidByName.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilteredResults(result);
  }, [data, search]);

  const customStyles = {
    subHeader: {
      style: {
        padding: 0,
        paddingRight: 0,
        paddingBottom: "1px",
      },
    },
    table: {
        width: '100%',
        borderRadius:'30%'



    },
    rows: {
      style: {
        minHeight: "72px", // override the row height
        width: '100%',
        top:'1rem',
        background: 'fffffff',
        color:'#707883'
      },
    },
    headCells: {
      style: {
        paddingRight: '0%',
        paddingLeft: '0.2rem',
        paddingTop:'0.8rem',
        paddingBottom:'0.8rem',
        backgroundColor:'#5f6062',
        color:'white',
        fontFamily: 'Ubuntu',
        fontSize: '0.9rem',
        letterSpacing:'0.01em'
      },
      body: {
        borderRadius: "0.2rem",
      },
    },
    cells: {
      style: {
        left: '0.2rem', // override the cell padding for data cells
        fontFamily: 'Ubuntu',
        paddingLeft:'0.2rem',
        letterSpacing:'0.01em'
      },
    },
  };

  return (
            <div>
              <h1 className='text-xl text-primary mb-0 mt-6 uppercase'>Payment History</h1>
              <DataTable
                columns={columns}
                data={filteredResults}
                fixedHeader
                fixedHeaderScrollHeight="450px"
                // selectableRows
                selectableRowsHighlight
                highlightOnHover
                responsive
                // pagination
                theme="solarized"
                subHeaderAlign="left"
                customStyles={customStyles}
                actions={<div className='mt-10 mb-3 flex flex-col gap-3 md:gap-0 md:flex-row'>
                  <div className='w-full md:w-full flex md:justify-end items-end gap-4'>
                    {/* <button className='bg-[#5F6062] text-white text-xs px-3 py-2 rounded-md'><PencilIcon className="w-3 h-3 inline-block mr-2" /> Edit Loan Type</button>
                    <button className='bg-[#5F6062] text-white text-xs px-3 py-2 rounded-md'>Share</button>
                    <button><EllipsisHorizontalIcon className='w-8 h-8' /></button> */}
                  </div>
                </div>}
                subHeader 
                subHeaderComponent={
                <form className='bg-gray-100 w- md:w-1/2 rounded-lg overflow-hidden flex items-center'>
                <MagnifyingGlassIcon className='w-8 h-8 p-2 mx-2 text-gray-400 flex-shrink-0 flex-grow-0' />
                <input
                  type="text indent-8"
                  placeholder="Search Name"
                  className="py-3 mt-0 bg-gray-100 w-full placeholder:text-sm focus-visible:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />   </form>
              }
               
              />
              {/* <div className="">
                <Link href="/payment-tracker">
                  <a className="bg-[#5F6062] text-white inline-block p-3 ml-4 my-4 rounded-md">Show more</a>
                </Link>
              </div> */}
            </div>
         
  );
};

export default PaymentHistory;
