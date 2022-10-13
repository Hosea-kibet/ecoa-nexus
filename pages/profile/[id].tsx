import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { MagnifyingGlassIcon, PlusIcon, EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/outline'

import Layout from "../../components/layout"
import CardProfile from '../../components/card_profile'
import CardAccount from '../../components/card_account'
import CardDevice from '../../components/card_device'
import CardDate from '../../components/card_date'
import PaymentHistory from '../../components/payments/PaymentHistory'
import Device from '../../components/devices/Device'
import Communicationhistory from '../../components/communicationhistory/Communicationhistory'

export default function Customer() {
  const router = useRouter();

  const [devicesSerial,setDevicesSerial]= useState("");

  const { id } = router.query;
  const[Account, setAccount]=useState({
      externalId: "",
      loanProductName:"",
      // repaymentEvery:"",
      numberOfRepayments:"",
      repaymentFrequencyType:"",
      principal:"",
      currency:{
        displaySymbol:"",
          inMultiplesOf: ""
      },
      status: {
          value: ""
      }
      
  });
  const [user, setUser] = useState({
    displayName: "",
    mobileNo:"",
});
  const [payterm, setPayterm] = useState({value:""});
  const [loanSummary, setLoanSummary] = useState({});
  const [status, setStatus] = useState({});

  const [userLoanAccounts, setUserLoanAccount] = useState<any[]>([]);

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
          console.log("setuser ans",res.data);
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
                    `http://delivery-ms.us-west-1.elasticbeanstalk.com/api/devices/${id}`,
                    {
                        headers: {
                            "fineract-platform-tenantid": "default",
                            Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
                        },
                    }
                )
                .then((res) => {
                    if (res.data.length > 0 ){
                        console.log("Device User general",res.data);
                        console.log("Device User",res.data[0]);
                        console.log("Device User Serial:",res.data[0].deviceSerial);
                        console.log("Customer National ID",res.data[0].customerId);
                        console.log("PayGo Status:",res.data[0].paygoStatus);
                        setDevicesSerial(res.data[0].deviceSerial);
                    }
                })
                .catch((err) => {
                    console.log(err);


                });
        }
    }, [id]);

  useEffect(() => {
    if (userLoanAccounts && userLoanAccounts.length > 0) {
      console.log("loan accounts:", userLoanAccounts);
      axios
        .get(
          `${process.env.NEXT_PUBLIC_FINERACT_URL}/fineract-provider/api/v1/loans/${userLoanAccounts[0].id}?associations=all&exclude=guarantors,futureSchedule/`,
          {
            headers: {
              "fineract-platform-tenantid": "default",
              Authorization: "Basic bWlmb3M6OUtxeSZzcDgmRCFp",
            },
          }
        )
        .then((res) => {
          //setLoandetails(res.data)
          setLoanSummary(res.data.summary);
          setStatus(res.data);
          console.log("loanss:", res.data);
          setAccount( res.data);
          setPayterm(res.data.repaymentFrequencyType);
        })
        .catch((err) => {
          console.log(`errror is ${err}`);
        });
    }
  }, [id, userLoanAccounts]);



  // @ts-ignore
    // @ts-ignore
    return (
    <Layout>
        <div className="">
          {/* <div className="flex  mb-1.5">
            <span className="mr-3 font-normal text-sm cursor-pointer">Home{">"}</span>
            <span className="mr-3 font-normal text-sm cursor-pointer">Customers{">"}</span>
            <span className="mr-3 font-normal text-sm cursor-pointer text-orange-400 ">Customer Log</span>
          </div> */}
          <div className=" flex flex-col mb-6">
            <span className="not-italic  text-3xl mb-1.5">Customer Profile</span>
            <span className="not-italic  text-lg">{user.displayName}</span>
          </div>
          <div className="topbottom">
            
          </div>
        </div>
      <h1 className='text-xl text-primary mb-6 uppercase'>Basic Details</h1>
      <div className="grid gap-2 sm:grid-cols-3 xl:grid-cols-6">
        <CardProfile className=""
        userName = {user.displayName
        ?user.displayName:"..."}
         userStatus ={Account.status.value} 
         userPhone={user.mobileNo
          ?user.mobileNo:"..."}
        />
        <CardAccount className="sm:col-span-2"
        userAccount= {Account.externalId
          ?Account.externalId:"..."} 
        userPhone={user.mobileNo
          ?user.mobileNo:"..."}
         />
        <CardDevice className="sm:col-span-3" 
         userAccount= {Account.externalId
          ?Account.externalId:"..."} />
      </div>

      <h1 className='text-xl text-primary my-6 uppercase'>PayPlan  Details</h1>

      <div className='my-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-2'>
        <CardDate type="loantype"
        loanProduct={Account.loanProductName
        ?Account.loanProductName:"..."}/>

        <CardDate type="deposit"
        deposit= {Account.principal
        ?Account.currency.displaySymbol + " "+ Account.principal   :"..." }/>

        <CardDate type="paymentperiod"
        userloan={Account.numberOfRepayments
        ?Account.numberOfRepayments + " " + payterm.value :"..."}
        />
        <CardDate type="installement"
          repayment={Account.currency.inMultiplesOf 
           ?Account.currency.displaySymbol + " " + Account.currency.inMultiplesOf  :"..."
          }
        />
      </div>
      <div className="overflow-x-scroll p-0">
        <PaymentHistory />
      </div>

      <Device deviceSerialId={devicesSerial}/>

      <h1 className='text-xl text-primary mb-6 mt-6 uppercase'>COMMUNICATION HISTORY</h1>
      <Communicationhistory />
      
    </Layout>
  );
}
