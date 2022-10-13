import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
import '../components/datatable/datatable.css'
import '../components/payments/payment.css'
import '../components/devices/deviceprofile.css'
import '../components/communicationhistory/communicationhistory.css'
import '../components/associationhisttable/associationhisttable.css'
import '../components/deviceusagetable/deviceusagetable.css'

import type { AppProps } from "next/app"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
  )
}