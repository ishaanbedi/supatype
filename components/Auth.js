import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const notifyForFailure = () => toast.error('There was an error. Try again!', {
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
            <section className='bg-[#1B2430] min-h-screen flex md:block'>
                <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 m-auto">
                    <div className="max-w-lg mx-auto text-center">
                        <h1 className="text-2xl font-bold sm:text-4xl text-[#D6D5A8]">Sign in to SupaType!</h1>
                        <p className="mt-4 text-gray-500">
                            Sign in with a magic link, no more forgetting passwords!
                        </p>
                    </div>
                    <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="relative">
                                <input
                                    className="inputField w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span className="absolute inset-y-0 inline-flex items-center right-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleLogin(email)
                                }}
                                className="inline-block px-5 py-3 text-sm font-medium text-white bg-[#816797] rounded-lg"
                                disabled={loading}
                            >
                                <span>{loading ? 'Sending...' : 'Send magic link'}</span>
                            </button>
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
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
