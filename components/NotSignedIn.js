import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
export default function NotSignedIn (props) {
  return (
    <>
      <Head>
        <title>Not Signed In : SupaType ⚡️</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section>
        <section className='text-white bg-[#1B2430] min-h-screen'>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className='max-w-screen-xl px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex'>
              <div className='max-w-3xl mx-auto text-center'>
                <h1 className='text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-[#E8F1F2] to-[#395B64]'>
                  Oops! You are not signed in.
                </h1>
                <div className='flex flex-wrap justify-center gap-4 mt-8'>
                  <Link href='/profile'>
                    <a className='block w-full px-12 py-3 text-sm font-medium text-white bg-[#395B64] border border-[#395B64] rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring'>
                      Sign In
                    </a>
                  </Link>
                  <Link href='/'>
                    <a className='block w-full px-12 py-3 text-sm font-medium text-white border border-[#395B64] rounded sm:w-auto hover:bg-[#395B64] active:bg-[#395B64] focus:outline-none focus:ring'>
                      Home
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </section>
    </>
  )
}
