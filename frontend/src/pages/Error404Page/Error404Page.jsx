// import React from 'react'
// import { Link } from 'react-router-dom'
// import styles from "./Error404Page.module.css"

// function Error404Page() {
//     return (
//         <div className={styles.section}>
//             <h1 className={styles.error}>404</h1>
//             <div className={styles.page}>Ooops!!! The page you are looking for is not found</div>
//             <Link className={styles.back_home} to={"/"}>Back to home</Link>
//         </div>
//     )
// }

// export default Error404Page



import React from 'react'
import { Link } from 'react-router-dom'

function Error404Page() {
    return (
        <div className="text-center py-16 px-8">
            <h1 className="text-green-700 text-6xl sm:text-9xl font-bold mb-4">
                404
            </h1>
            <div className="text-xl font-semibold text-gray-600 mb-8">
                Ooops!!! The page you are looking for is not found
            </div>
            <Link
                to="/"
                className="inline-block border-2 border-gray-900 text-white uppercase font-semibold py-3 px-6 rounded-md bg-gray-900 transition-all duration-200 transform hover:bg-gray-800 hover:text-gray-300 shadow-lg sm:py-2 sm:px-4"
            >
                Back to home
            </Link>
        </div>
    )
}

export default Error404Page;
