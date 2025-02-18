'use client'

import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-gray-800 text-white" data-test-id="footer">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-test-id="footer-container">
                <div className="flex justify-center space-x-8" data-test-id="footer-links">
                    <Link
                        href="/"
                        className="hover:text-gray-300"
                        data-test-id="footer-home-link"
                    >
                        Home
                    </Link>
                    <a
                        href="https://www.agileactors.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-300"
                        data-test-id="footer-about-link"
                    >
                        About
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer 