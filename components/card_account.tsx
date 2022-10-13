import { classNames } from "../lib/utils"

export default function CardAccount({ className, userAccount,userPhone }: any) {
  return <div
    className={classNames(
      "p-6 border shadow-[0px_0px_28px_rgba(0,0,0,0.08)] rounded-lg",
      className
      )}
    >
    <h1 className="text-lg text-gray-500 py-2">Account Details</h1>
    <dl>
      <div className="pb-2">
        <dt className="text-base text-gray-900 font-medium">Account Number</dt>
        <dd className="text-base text-gray-500 font-normal">{userAccount}</dd>
      </div>
      
      <div className="py-2">
        <dt className="text-base text-gray-900 font-medium">Alternative Phone No.</dt>
        <dd className="text-base text-gray-500 font-normal">{userPhone}</dd>
      </div>
      
    </dl>
  </div>
}
