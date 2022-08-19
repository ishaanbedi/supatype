import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion"

export default function Auth() {
    const notifyForSuccess = () => toast.success('Check your email for a link to sign in!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const notifyForFailure = () => toast.error("Please fill in valid email", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const handleLogin = async (email) => {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signIn({ email })
            if (error) throw error
            notifyForSuccess();
        } catch (error) {
            notifyForFailure();
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <section className='bg-[#1B2430] min-h-screen md:block'>
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-5xl tracking-tight font-bold text-[#E8F1F2]">
                                Let&apos; get started!
                            </h2>
                            <p className="mt-4 text-center text-md text-[#E8F1F2]">
                                Sign in easily using a {' '}
                                <a className="font-medium text-[#A5C9CA]">
                                    magic link
                                </a>
                            </p>
                        </div>
                        <form className="mt-12 text-[#395B64] space-y-6" action="" >
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        className="inputField w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                        type="email"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.9 }}
                                >

                                    <button
                                        type="submit"
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#395B64] bg-[#E8F1F2] hover:text-[#395B64]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D5DFE5]"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleLogin(email)
                                        }}
                                        disabled={loading}
                                    >
                                        <span>{loading ? 'Sending...' : 'Send me a magic link'}</span>

                                    </button>
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}
