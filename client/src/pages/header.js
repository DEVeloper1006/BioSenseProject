import React from "react"
import Link from "next/link"

export default function Header () {
    return (
    <header className="navbar px-3">
        <div className="navbar-start">
            <Link href="/">LOGO</Link>
        </div>
        <div className="navbar-end">
            <div className="px-3">
                <Link href="/">BLOG</Link>
            </div>
            <div className="px-3">CONCEPT</div>
            <div className="px-3">CONNECTIONS</div>
        </div>
    </header>
    )
}