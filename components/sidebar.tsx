import { Fragment, useState, useMemo, useEffect } from 'react'
import type { ElementType, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from "next-auth/react"


import {
  XMarkIcon,
  Bars3BottomLeftIcon,
  UserGroupIcon,
  PresentationChartBarIcon,
  RectangleGroupIcon,
  CreditCardIcon,
  ChatBubbleLeftIcon,
  BeakerIcon,
  EllipsisHorizontalIcon,
  ArrowTrendingUpIcon,
  ArrowRightOnRectangleIcon,
  TruckIcon,
  ChartBarSquareIcon
  


} from '@heroicons/react/24/outline'
import { Transition } from '@headlessui/react'
import { useMedia } from 'react-use';

import { classNames } from '../lib/utils';


const navigation = [
  { name: 'Business Summary', href: '/', icon: PresentationChartBarIcon },
  { name: 'Customers', href: '/customers', icon: UserGroupIcon },
  { name: 'Devices', href: '/Devices', icon: RectangleGroupIcon },
  { name: 'Payments', href: '/Payments', icon: CreditCardIcon },
  { name: 'Loans', href: '/Loans', icon: ArrowTrendingUpIcon },
  { name: 'Communications', href: '/Communications', icon: ChatBubbleLeftIcon },
  { name: 'Delivery', href: '/Delivery', icon: TruckIcon }, //to add its linking
  {name: 'Carbon', href: '/Carbon', icon: ChartBarSquareIcon}
]

type SideLinkProps = {
  href: string,
  Icon: ElementType,
  active: Boolean,
  children: ReactNode,
  className?: string
}

const SideLink = ( { href, Icon, active, children, ...props }: SideLinkProps ) => {
  return <Link href={href}>
    <a
      className={classNames(
        active ? 'bg-[#3e3f42] text-[rgba(255,255,255,0.93)]' : 'text-[#46474b] mr-2 hover:bg-[#5F6062] hover:text-gray-100',
          'group flex items-center px-9 py-4 text-sm ml-3 font-medium rounded-md',
        props.className
      )}
    >
      <Icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
      { children }
    </a>
  </Link>
}

const SidebarContent = () => {
  const router = useRouter()

  const logout = () => {
    signOut()
  }

  return <div className="flex flex-grow flex-col overflow-y-auto bg-white/95 lg:mt-0 lg:rounded-xl shadow-[4px_4px_23px_rgba(0,0,0,0.08)]">
    <div className="flex flex-shrink-0 items-center px-10">
      <Link href="/">
        <a>
          <Image
            width={149}
            height={61}
            className="px-10 contrast-120"
            src="/econexus.png"
            alt="Your Company"
          />
        </a>
      </Link>
    </div>
    {/* <div className='px-10 mt-8 mb-5 flex gap-2'>
      <Link href="/">
        <a><Image width={50} height={50} className="rounded-full row-span-2 shrink-0"  src="/profile_photo.png" alt="profile"/></a>
      </Link>
      <div className='flex flex-col justify-top'>
        <span className='whitespace-nowrap font-medium text-base'>Martin Mwanzo</span>
        <span className='font-medium text-sm'>martinmwanzo@burning.com</span>
      </div>
    </div> */}
    <div className="mt-2 flex flex-1 flex-col">
      <nav className="flex-1 flex flex-col gap-y-1 px-0 pb-4">
        {navigation.map((item) => (
          <SideLink key={item.name} Icon={item.icon} href={item.href} active={router.asPath === item.href}>{ item.name }</SideLink>
        ))}

        <SideLink Icon={EllipsisHorizontalIcon} href='/Settings' className='mt-12 border-t' active={router.asPath.startsWith('/logout')}>Settings</SideLink>
        <>
          <button
              onClick={logout}
              className={classNames(
                  'group flex items-center px-10 py-6 text-sm font-medium rounded-md cursor-pointer',
                  'mt-auto text-[rgb(245,132,38,0.93)]'
              )}
          >
            <ArrowRightOnRectangleIcon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
            Logout
          </button>
        </>
      </nav>
    </div>
  </div>
}

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [init, setInit] = useState(false)
  const isWide = useMedia('(min-width: 1024px)', true);

  // unhide sidebar for small devices after initial render
  useEffect(()=>{
    setTimeout(setInit.bind(null, true), 300);
  }, [])

  const openSidebar = useMemo(()=>{
    return isWide || sidebarOpen
  }, [isWide, sidebarOpen])

  return <>
    <Transition show={openSidebar} as={Fragment}>
      <div className={classNames("relative z-40 sm:block", init ? 'block' : 'hidden')}>
        <Transition
          show={sidebarOpen}
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed lg:hidden inset-0 bg-gray-600 bg-opacity-75" onClick={()=>setSidebarOpen(false)} />
        </Transition>

        <div className="fixed inset-0 z-40 flex w-80">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full flex-1 flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="lg:show absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none  "
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon className="h-6 w-6 visible md:invisible" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <SidebarContent />
              
            </div>
          </Transition.Child>
          <div className="lg:hidden w-14 flex-shrink-0" aria-hidden="true"></div>
        </div>
      </div>
    </Transition>

    <div className='lg:hidden flex flex-1 flex-col lg:pl-80'>
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        <button
          type="button"
          className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </>
}

export default Sidebar
