import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import Layout from "../components/layout";
import CardProgress from "../components/card_progress";
import Datatable from "../components/datatable/Datatable";

const Customers: NextPage = () => {
  const [customerDetails, setCustomer] = useState(
      {
          totalFilteredRecords: "",
      }
  );
  const [userLoanAccounts, setUserLoanAccount] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loanSummary, setLoanSummary] = useState({});
  const [totalLoanPaidSummary, setTotalLoanPaidSummary] = useState("")

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loans?orderBy=submittedOnDate&sortOrder=DESC`, {
        headers: {
          'fineract-platform-tenantid': 'default',
          'Authorization': 'Basic bWlmb3M6OUtxeSZzcDgmRCFp'
        }

      })
      
      setCustomer(response.data)
      console.log("my target data",response.data)
      setFilteredResults(response.data.pageItems)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
      axios
          .get(
              `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/runreports/Active%20Loans%20-%20Summary?R_currencyId=KES&R_fundId=-1&R_loanOfficerId=-1&R_loanProductId=-1&R_loanPurposeId=-1&R_officeId=1&R_parType=1`,
              {
                  headers: {
                      "fineract-platform-tenantid": "default",
                      Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
                  },
              }
          )
          .then((res) => {
              setLoanSummary(res.data);
              console.log("loan summary", res.data)

              console.log("total paid",res.data.data[0].row[6]);
              // @ts-ignore
              setTotalLoanPaidSummary(parseInt(res.data.data[0].row[6]));
          })
          .catch((err) => {
              console.log(err);
          });
    }, []);

  return (
    <Layout>
      <h1 className="text-2xl text-primary mb-6">Customers</h1>
      <div className="mb-4 grid gap-2 sm:grid-cols-3 lg:gap-4 xl:gap-8 2xl:gap-24">
        <CardProgress
          type="customersonboarded"
          customersProp={
            customerDetails.totalFilteredRecords
              ? customerDetails.totalFilteredRecords
              : "-"
          }
        />
        <CardProgress
          type="epcsold"
          customersProp={
            customerDetails.totalFilteredRecords
              ? customerDetails.totalFilteredRecords
              : "-"
          }
        />
        <CardProgress
          type="repaidinloans"
          customersProp={
             totalLoanPaidSummary
          }
        />
      </div>

      <div>
        <Datatable />
      </div>
    </Layout>
  );
};

export default Customers;
