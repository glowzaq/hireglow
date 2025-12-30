import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
    const { user, logout } = useAuth() || {};
    const navigate = useNavigate()
    // const location = useLocation()

    const handleLogout = () => {
        logout?.()
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-4 py-3">
            <div className="container-fluid">
                <a className="navbar-brand ms-5" href="#">
                    <span style={{ color: "#1D4289", fontWeight: 'bolder' }}>Hire</span>
                    <span style={{ color: '#F4A950', fontWeight: 'bolder' }}>Glow</span>
                    <span style={{ color: '#333333', fontWeight: 'bolder' }}> ATS</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fw-bold ps-5 pe-2 ms-5" aria-current="page" href="/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fw-bold px-2 ms-5" href="/jobs">Jobs</a>
                        </li>
                        {(user?.role === 'employer' || user?.role === 'admin') && (
                            <li className='nav-item'>
                                <Link className='nav-link fw-bold px-2 ms-5' href="/pipeline">Pipeline</Link>
                            </li>
                        )}
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success me-5" type="submit">Search</button>
                    </form>
                    {user ? (
                        <div className="dropdown">
                            <button className="btn btn-outline-light btn-sm px-3 py-1 rounded-pill fw-semibold dropdown-toggle transition-all"
                                type="button" data-bs-toggle="dropdown">
                                <i className="fas fa-user-circle me-1"></i>
                                {user?.name?.split(' ')[0] || 'User'}
                                <span className={`ms-1 badge badge-sm ${user?.role === 'admin' ? 'bg-danger' : 'bg-success'}`}>
                                    {user?.role?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2">
                                <li><Link className="dropdown-item fw-semibold" to="/profile"><i className="fas fa-user me-2"></i>Profile</Link></li>
                                {user?.role === 'admin' && (
                                    <li><Link className="dropdown-item fw-semibold text-warning" to="/admin"><i className="fas fa-cog me-2"></i>Admin</Link></li>
                                )}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <button className="dropdown-item fw-semibold text-danger" onClick={handleLogout}>
                                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar