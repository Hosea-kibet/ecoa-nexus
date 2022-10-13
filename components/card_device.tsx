import { classNames } from "../lib/utils"
import { useEffect, useState } from "react";
import axios from "axios";
import Switch from "react-switch";
export default function CardDevice({ className, userAccount }:any) {

const id = userAccount;
const [deviceUser, setdeviceUser] = useState([]);
const [devices,setDevices]= useState([]);
const [paygo,setPaygo]= useState({
  paygoStatus:"",
  deviceSerial:"",
  productType:"",

});
const [checked, setChecked] = useState(false);
// @ts-ignore
  const handleChange = nextChecked => {
  console.log("nextchecked:", nextChecked)
  if (nextChecked) {
    postOn()
  } else {
    postOff()
  }
  setChecked(nextChecked);
};
const [devStatus,setdeStatus] = useState({
  status:"",
});
const[deviceOn,setDevOn] =useState({
  state:{
    desired:{
      status:""
    }}
});
const[deviceOff,setDevOff] =useState({
  state:{
    desired:{
      status:""
    }}
});
const [userId, setuserId]=useState({
  customerId:"",
});
const [user, updateUser] =useState({
  id:8,
  paygo_status:"",
  userId: 0
})

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
          console.log("response:", res)
          if (res.data.length > 0 ){
            console.log("Device User general",res.data);
            console.log("Device User",res.data[0]);
            console.log("Device User Serial:",res.data[0].deviceSerial);
            console.log("Customer National ID",res.data[0].customerId);
            console.log("PayGo Status:",res.data[0].paygoStatus);
            setPaygo(res.data[0]);
            setuserId(res.data[0].customerId);
            setdeviceUser(res.data);
            setDevices(res.data[0].deviceSerial);
            setChecked(true);
          }
        })
        .catch((err) => {
          console.log(err);
          
          
        });setChecked(false);
    }
  }, [id]);

  const is=devices; 
  useEffect(() => {
    console.log("devices:", devices)
    if (is) {
      axios
        .get(
          `http://54.146.62.247/api/paygo/${is}`,
          {
            headers: { 
              'Accept': 'application/json', 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }
        )
        .then((res) => {
          if (res.data.status !== "error" ) {
            setdeStatus(res.data.data.state.reported);
            console.log("Device Status  with ID",res.data.data.state.reported.status)
          } else  {
            console.log("error:", res.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [is]);

  const postOff =() =>{
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'status': 'device_off',
      'id': {devices}  
    });
    var config = {
      method: 'post',
      url: 'http://54.146.62.247/api/set_status',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    axios(config)
    .then(function (
        // @ts-ignore
        response
    ) {
      // console.log(JSON.stringify(response.data));
      console.log("Device report OFF",response.data.data.state.desired.status)
      setDevOff(response.data.data.state.desired.status)
    })
    .catch(function (
        // @ts-ignore
        error
    ) {
      console.log(error);
    });
    }

    const postOn =() =>{
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
      'status': 'device_on',
      'id': {devices} 
    });
    var config = {
      method: 'post',
      url: 'http://54.146.62.247/api/set_status',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    // @ts-ignore
      // @ts-ignore
      axios(config)
    .then(function (
        // @ts-ignore
        response
    ) {
      // console.log(JSON.stringify(response.data));
      console.log("Device report ON",response.data.data.state.desired.status)
      setDevOn(response.data.data.state.desired.status)
    })
    .catch(function (
        // @ts-ignore
        error
    ) {
      console.log(error);
    });
    }

  return (
    <div
      className={classNames(
        "p-6 border shadow-[0px_0px_28px_rgba(0,0,0,0.08)] rounded-lg",
        className
        )}
      >
      <h1 className="text-lg text-gray-500 py-2">Account Details</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="col-span-2">
          <h2 className="text-base font-medium mb-1">Device Name</h2>
          <dl className="grid grid-cols-2 ">
            <dt className="text-base text-gray-500 font-normal whitespace-nowrap">{paygo.productType?paygo.productType:"N/A"}</dt>
            <dl className="text-base text-gray-500 font-normal">Serial:{paygo.deviceSerial?paygo.deviceSerial:"No Serial"}</dl>
            {/* <dt className="text-base text-gray-500 font-normal whitespace-nowrap">{paygo.productType?paygo.productType:"N/A"}</dt> */}
            {/* <dl className="text-base text-gray-500 font-normal">{paygo.deviceSerial?paygo.deviceSerial:"No Serial"}</dl> */}
          </dl>
        </div>
        <div>
          <h1 className="text-base font-medium mb-0 ">Paygo Status</h1>
          <div className='grid grid-cols-2  gap-1'>
          <dt className={paygo.paygoStatus=='active'?"uppercase text-green-500 text-sm mt-0 font-bold":"uppercase text-red-500 text-sm mt-1"}>{paygo.paygoStatus?paygo.paygoStatus :"unavailable"}</dt>
         
          {/* <button className='py-1' onClick={()=>postOn()}>
          post
        </button> */}
        <h1 className="text-base font-bold mt-0 "><span>{checked ? "ON" : "OFF"}</span></h1>
       {paygo.paygoStatus=='active'?
        <Switch
        onChange={handleChange}
        checked={checked}
        className={`${
          checked ? 'bg-green-600' : 'bg-gray-600'
        } relative inline-flex h-7 w-14 items-center rounded-full`}
        
      />
       :<Switch
       onChange={() => {}}
       checked
       disabled
       className="react-switch"
       id="disabled-switch"
     />}      
      
     
      </div>
    
      {/* <p>
        The switch is <span>{checked ? "on" : "off"}</span>.
      </p> */}
          </div>
        </div>
      </div>
   
  )
}
