import { UserGroupIcon } from "@heroicons/react/24/outline"
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MoneyIcon from '@mui/icons-material/Money';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import { data } from "autoprefixer";

import { classNames } from "../lib/utils"




const CardProgress = ({ className,type ,customersProp}: any ) => {
let data
  switch (type) {
    case "customersonboarded":
      data = {
        title:customersProp,
        titledeveice: "300",
        title2: "Customers Onboarded",
        icon: <UserGroupIcon  style={{ color: "#F58426" ,fontSize: "1px"}} className='w-16 h-16 p-3 rounded-full bg-orange-100 grow-0 shrink-0' />

      };
      break;
      case "epcsold":
        data = {
          title:customersProp,
          // titledeveice: "Products Sold",
          title2: "Products Sold",
          icon: <UserGroupIcon  style={{ color: "#F58426" ,fontSize: "1px" }}  className='w-16 h-16 p-3 rounded-full bg-orange-100 grow-0 shrink-0' />
  
        };
        break;
        break;
        case "repaidinloans":
          data = {
            title: customersProp,
            // titledeveice: "Repaid In Loans",
            title2: "Total Paid",
            icon: <UserGroupIcon    style={{ color: "#F58426", fontSize: "1px" }}  className='w-16 h-16 p-3 rounded-full bg-orange-100 grow-0 shrink-0' />
    
          };
          break;
    default:
      break;
  }



  return (
    <div className={classNames(
      'flex gap-6 p-5 pb-8 lg:pb-12 border rounded-xl shadow-lg',
      className
      )}
    >
      {data?.icon}
      <div className='flex flex-col grow-1 w-full'>
        <span className='text-2xl text-gray-500 font-bold'>{data?.title}</span>
        <span className='text-gray-400 tracking-tight'>{data?.title2}</span>
        <div 
          className='mt-4 w-full bg-gray-200 p-0 h-1 grow-0 relative
            before:content-["0"] before:absolute before:left-0 before:top-[0.2rem] before:text-[0.5rem] before:font-semibold before:text-gray-300
            after:content-["100"] after:absolute after:right-0 after:top-[0.2rem] after:text-[0.5rem] after:font-semibold after:text-gray-300'>
          <span className='inline-block w-1/2  bg-orange-400 h-full m-0 absolute left-0 top-0'></span>
        </div>
      </div>
    </div>
  )
}

export default CardProgress
