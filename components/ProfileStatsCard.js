import React from 'react'

function ProfileStatsCard(props) {
    return (
        <>
            <a
                className="block p-8 transition border bg-[#25303e] border-gray-800 shadow-xl rounded-xl hover:shadow-[#D6D5A8] hover:border-[#D6D5A8]"
            >
                <h3 className="mt-4 text-xl font-bold text-white">{props.title}</h3>
                <p className="mt-1 text-sm text-gray-300">
                    {props.stat}
                </p>
            </a>

        </>
    )
}

export default ProfileStatsCard