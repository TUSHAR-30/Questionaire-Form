import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Error404Page.module.css"

function Error404Page() {
    return (
        <div className={styles.section}>
            <h1 className={styles.error}>404</h1>
            <div className={styles.page}>Ooops!!! The page you are looking for is not found</div>
            <Link className={styles.back_home} to={"/"}>Back to home</Link>
        </div>
    )
}

export default Error404Page