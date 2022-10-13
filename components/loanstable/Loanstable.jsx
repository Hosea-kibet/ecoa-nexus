import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
import { Button, inputAdornmentClasses } from "@mui/material";
import Link from 'next/link';
import Paper from "@mui/material/Paper";
import FadeLoader from "react-spinners/FadeLoader";
import DataTable, { createTheme } from 'react-data-table-component';
import { MagnifyingGlassIcon,EllipsisHorizontalIcon} from '@heroicons/react/24/outline'
createTheme('dark', {
    background: {
      default: 'transparent',
    },
  });

  const moment = require('moment')
  
const   Loanstable = () => {

  const id = null;
  

  const [customers, setCustomer] = useState([])
  const [search, setSearch] = useState("")
  const [filteredResults, setFilteredResults] = useState([]);
  const [mobileno ,setMobileno] = useState([])

  
  const [user, setUser] = useState([])
  
  const [data, setTransactions] = useState([])
  const [userLoanAccounts, setUserLoanAccount] = useState([])

  console.log(mobileno)

  const[lastPage, setLastPage] =useState(0);
  const perPage =9;


  const getCustomers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loanproducts`, {
        headers: {
          'fineract-platform-tenantid': 'default',
          'Authorization': 'Basic bWlmb3M6OUtxeSZzcDgmRCFp'
        }

      })
      
      setCustomer(response.data)
      console.log('............xdsdss....',response.data)
      setMobileno(response.data)

      setFilteredResults(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (userLoanAccounts && userLoanAccounts.length > 0) {
        try {
            axios.get(`${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loans/${userLoanAccounts[0].id}?associations=all&exclude=guarantors,futureSchedule`, {
                headers: {
                    'fineract-platform-tenantid': 'default',
                    'Authorization': 'Basic bWlmb3M6OUtxeSZzcDgmRCFp'
                }

            }).then(response => {
                                // setTransactions(response.data.transactions)
                    setTransactions(response.data)
                    console.log('aaaa............aaaa',response.data)
                    console.log(response)
                    console.log(row.loanType)
        
                    //setTransactions(response.data)
                    setCustomer(response.data.transactions)
        
                    setFilteredResults(response.data.transactions)
                 

            }).catch(err => {
                console.log(`error is ${err}`)
            })


        } catch (error) {
            console.log(error)
        }
    }
}, [id, userLoanAccounts]);

  const[loading,setLoading]=useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
        setLoading(false)
    },1000)
  },[])

  const columns = [
    {
      name: 'Date',
      sortable: true,
      selector: (row) => 
      moment(row.startDate).subtract(10, 'days').calendar()
      
    },
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.name
      
    },

    {
      name: 'Deposit',
      selector: (row) =><span>-</span>

    },
    
   
    {
      name: 'Installment',
      sortable: true,
      selector: (row) => row.currency.inMultiplesOf 
      
    },
    
    {
      name: 'Payment Period',
      selector: (row) => row.numberOfRepayments  + " " +  row.repaymentFrequencyType.value


    },
    {
      name: 'Status',
      sortable: true,
      selector: (row) => row.status  ===  ("loanProduct.active" )  ?  ("active") : "inactive"


    },
  ]

  useEffect(() => {
    getCustomers();
  }, [])


  // for search only limited to one column,name
  useEffect(() => {
    const result = customers.filter(customer => {
      return customer.name.toLowerCase().match(search.toLowerCase());
    })
    setFilteredResults(result);
  }, [search]);
  

  const customStyles = {
    subHeader: {
      style: {
        padding: 0,
        paddingRight: 0
      },
    },
    table: {
      width: '100%',
        marginTop: 0,
        borderRadius:'30%'
       
      

    },
    rows: {
      style: {
        Height: '1rem', // override the row height
        top:'1rem',
        background: 'fffffff',
        color:'#707883',

        minHeight: "50px", // override the row height
        width: '100%',
      },
    },
    headCells: {
      style: {
        paddingRight: '0%',
        paddingLeft: '0.2rem',
        paddingTop:'0.2rem',
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
    {
        loading?
        <div className="sweet-loading">
        <FadeLoader color={'#5F6062'} loading={loading} size={150} /></div>
        :
        <Paper>
        
        <DataTable
          columns={columns}
          data={filteredResults}
          // fixedHeader
          fixedHeaderScrollHeight="200px"
          direction="auto"
          // selectableRows
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          selectableRowsHighlight
          highlightOnHover
          responsive
          pagination
          theme="solarized"
          subHeader
        //   actions={<div className='mt-1  mr-0 flex  md:gap-0 md:flex-row'>
        //   <div className='md:w-full flex md:justify-end  gap-4'> */}
        //     <button className='bg-[#5F6062] text-gray-100 text-sm px-6  py-2 rounded-sm'>Share</button>
        //     <button><EllipsisHorizontalIcon className='w-8 h-8 mr-0' /></button>
        //    </div>
        // </div>}
          subHeaderComponent={
            <form className='bg-gray-100 w-full md:w-1/2 rounded-lg overflow-hidden flex items-center'>
            <MagnifyingGlassIcon className='w-8 h-8 p-2 mx-2 text-gray-400 flex-shrink-0 flex-grow-0' />

       
            <input
              type="text indent-8"
              placeholder="Search Name"
              className="py-3 bg-gray-100 w-full placeholder:text-sm focus-visible:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />   </form>
          }
          subHeaderAlign="left"
  
          customStyles={customStyles}
        />
  
  
  </Paper>
        }
   
    </div>
  )


}

export default Loanstable
