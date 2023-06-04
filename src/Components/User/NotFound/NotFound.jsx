import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>

            <div className="not-found-container d-flex flex-column align-items-center justify-content-center vh-100 text-center">
                <h1 className="display-4">Page Not Found</h1>
                <p className="lead">The page you requested does not exist.</p>
                <Link to="/" className="btn btn-primary">Go back to homepage</Link>
            </div>
        </div>
    )
}

export default NotFound
