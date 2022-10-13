import { BanknotesIcon } from '@heroicons/react/24/outline'

const CardPayment = ({type,userloan,repayment,loanProduct,deposit}:any) => {


  let data
  switch (type) {
    case "loantype":
      data = {
        title: loanProduct,
        title2: "Loan Type",
        icon: <BanknotesIcon  style={{ color: "#5F6062" ,fontSize: "1px"}} className='w-16 h-16 p-3 rounded-full bg-stone-200 grow-0 shrink-0' />,
        btn:<p className='mt-3 border py-1 px-2 w-min text-sm text-gray-500 whitespace-nowrap'>Basic</p>

      };
      break;
      case "deposit":
        data = {
          title: deposit,
          title2: "Total Price",
          icon: <BanknotesIcon  style={{ color: "#5F6062" ,fontSize: "1px"}} className='w-16 h-16 p-3 rounded-full bg-stone-200 grow-0 shrink-0' />,
          btn:<p className='mt-3 border py-1 px-2 w-min text-sm text-gray-500 whitespace-nowrap'>2022-07-23</p>
  
        };
        break;
        case "paymentperiod":
          data = {
            title: userloan,
            title2: "Payment Period",
            icon: <BanknotesIcon  style={{ color: "#5F6062" ,fontSize: "1px"}} className='w-16 h-16 p-3 rounded-full bg-stone-200 grow-0 shrink-0' />,
            btn:<p className='mt-3 border py-1 px-2 w-min text-sm text-gray-500 whitespace-nowrap'>2022-10-203</p>
    
          };
          break;
          case "installement":
            data = {
              title: repayment,
              title2: "Installment",
              icon: <BanknotesIcon  style={{ color: "#5F6062" ,fontSize: "1px"}} className='w-16 h-16 p-3 rounded-full bg-stone-200 grow-0 shrink-0' />,
              btn:<p className='mt-3 border py-1 px-2 w-min text-sm text-gray-500 whitespace-nowrap'>2022-07-30</p>
      
            };
            break;
    default:
      break;
  }
  return (
    <div className='flex gap-6 p-5 pb-8 lg:pb-12 border rounded-xl shadow-lg'>
       {data?.icon}
      <div className='flex flex-col grow-1 w-full'>
        <div className="text-gray-500 font-bold text-2xl">
       {data?.title}
       </div>
       <div className="text-orange-400 text-sm font-medium">
        {data?.title2}
        </div>
        {/* <div className="btn">
        {data?.btn}
        </div> */}
      </div>
    </div>
  )
}

export default CardPayment
