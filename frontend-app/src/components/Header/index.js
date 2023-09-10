import React from 'react'

const Header = () => {
    return (
        <>
            <header className="mt-2">
                <nav>
                    <div className="d-flex flex-row align-items-center ">
                        <img src="./logo.png" alt="logo" className="img-fluid logo" />
                        <h5>Encrypted</h5>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
