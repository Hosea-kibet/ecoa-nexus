import Image from "next/image"
import Avatar from '@mui/material/Avatar';

import { classNames } from "../lib/utils"

export default function CardProfile({ className,userName,userStatus,userPhone}: any) {
  return (
    <div
      className={classNames(
      "border rounded-lg p-6 shadow-[0px_0px_28px_rgba(0,0,0,0.08)] flex flex-col items-center",
      className
      )}
    >
      <div>
        {/* <Image width={90} height={90} className="rounded-full" src="/Lindsey.jpg" alt="profile"/> */}
        <Avatar
        sx={{ width: 60, height: 60}}
       />
      </div> 
      <p className="flex flex-col  items-center">
      <span className="text-base whitespace-nowrap">{userName}</span>
        <span className="text-sm text-gray-400  mt-1">{userPhone}</span>
      </p>
      {/* <p className="uppercase text-green-500 text-sm mt-1">{userStatus}</p> */}
      <p className={userStatus == 'Active' ? "uppercase text-green-500 text-sm mt-1":"uppercase text-red-500 text-sm mt-1"}>{userStatus?userStatus :"loading..."}</p>
    </div>
  )
}
