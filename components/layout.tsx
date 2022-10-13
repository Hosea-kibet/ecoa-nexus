import Sidebar from './sidebar';

type Props = {
  children: JSX.Element | JSX.Element[]
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Sidebar />
      <main className='max-w-screen-3xl mx-auto flex flex-1 flex-col lg:pl-80 lg:mt-6'>
        <div className='mx-2 lg:mx-4'>
          { children }
        </div>
      </main>
    </>
  )
}

export default Layout;
