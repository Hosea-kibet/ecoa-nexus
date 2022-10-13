import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Paper from "@mui/material/Paper";
import FadeLoader from "react-spinners/FadeLoader";
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from '@mui/material/styles';
  
const   Datatable = () => {

  const id = null;
  

  const [customers, setCustomer] = useState([])
  const [search, setSearch] = useState("")
  const [filteredResults, setFilteredResults] = useState([]);
  const [mobileno ,setMobileno] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [summary,setSummary]=useState([])
  const [user, setUser] = useState([])
  
  const [data, setTransactions] = useState([])
  const [userLoanAccounts, setUserLoanAccount] = useState([])

  console.log(mobileno)

  const[lastPage, setLastPage] =useState(0);
  const perPage =9;


  
  
  const getCustomers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loans?orderBy=submittedOnDate&sortOrder=DESC`, {
        headers: {
          'fineract-platform-tenantid': 'default',
          'Authorization': 'Basic bWlmb3M6OUtxeSZzcDgmRCFp'
        }

      })
      
      setCustomer(response.data.pageItems)
      setMobileno(response.data)
      setIsLoaded(true);

      setFilteredResults(response.data.pageItems)
    } catch (error) {
      console.log(error)
      setIsLoaded(true);
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
                    // console.log(response)
                    // console.log(row.loanType)
        
                    //setTransactions(response.data)
                    setCustomer(response.data)
                    console.log("target search",response.data)
                    setFilteredResults(response.data.transactions)
                 

            }).catch(err => {
                console.log(`error is ${err}`)
            })


        } catch (error) {
            console.log(error)
        }
    }
}, [id, userLoanAccounts]);

  const columns = [
    {
      name: "clientName",
      label: "Customer Name",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <a href={"/profile/" + value}>{value}</a>
          );
        }
      }

    },
    {
      name: "externalId",
      label: 'Account Number',
      options: {
        filter: true,
        sort:false
        // display: 'excluded',
      }
      // selector: (row) => row.externalId,
      

    },
    
    {
      name: 'loanProductName',
      label: 'Pay Plan',
      options:{
        filter: true,
        sort: false,
      }
      
      
    },
    {
      name: 'summary',
      label: 'Total Paid (Ksh)',
      // selector: (row) => row.summary === undefined ? "" : row.summary.principalPaid
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>{value.principalPaid}</div>
          );
        }
        
      }

    },
    {
      name: 'summary',
      label: 'Outstanding Balance',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>{value.totalOutstanding}</div>
          );
        }
      }


    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>{value.value}</div>
          );
        }
      }


    },
  ]

  useEffect(() => {
    getCustomers();
  }, [])

  

  const getMuiTheme = () =>
  createTheme({
    components: {
      MuiTableCell: {
        styleOverrides:{ root: {
          paddingLightSpacing: '0.1rem',
          paddingLeft: '0.3rem',
          backgroundColor: '#FFFFFF',
          fontFamily: 'Ubuntu',
          fontSize: '0.9rem',
          fontWeight:'inherit'
          
          
        },
        head: {
          backgroundColor: '#5f6062',
          paddingRight: '0%',
          paddingLeft: '0.2rem',
          color: '#FFFFFF',
          fontFamily: 'Ubuntu',
        }}
      },
      MuiToolbar: {
        styleOverrides:{regular: {
          minHeight: '0.2rem',
          minWidth:'0.2rem',
          
        }}
      },
    }
  });


 const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'standard',
  searchPlaceholder: 'Search By Name,Account Number & PayPlans',
  fixedHeader: true,
  fontFamily: 'Ubuntu',
  viewColumns: true,
  selectableRows: false ,
  fixedSelectColumn: true,
  tableBodyHeight: 'auto',
  textLabels: {
    body: {
      noMatch: "Sorry, no matching records exist in ecoa Nexus",
      toolTip: "Sort",
      columnHeaderTooltip: column => `Sort for ${column.label}`
    },
    pagination: {
      next: "Next Page",
      previous: "Previous Page",
      rowsPerPage: "Rows per page:",
      displayRows: "of",
    },
    toolbar: {
      search: "Search A/C Number,Name or Payplans",
      downloadCsv: "Download CSV",
      print: "Print customers",
      viewColumns: "View Columns",
      filterTable: "Filter Table",
    },
    selectableRows: false,
    setFilterChipProps: (colIndex, colName, data) => {
      //console.log(colIndex, colName, data);
      return {
        color: 'primary',
        variant: 'outlined',
        className: 'testClass123',
      };
    },
    viewColumns: {
      title: "Show Columns",
      titleAria: "Show/Hide Table Columns",
    },
    selectedRows: {
      text: "record(s) selected",
      delete: "Delete",
      deleteAria: "Delete Selected Records",
    },
  }
}

  if (!isLoaded) {
    return <div className="sweet-loading mb-10">
    <FadeLoader color={'#5F6062'} size={200} /></div>;
  } else {
  return (

    <div>
    {
        
        <Paper>
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable 
          columns={columns}
          data={filteredResults}
          options={options}
        />
          </ThemeProvider>
        </Paper>
        }
   
    </div>
  )
      }


}

export default Datatable
