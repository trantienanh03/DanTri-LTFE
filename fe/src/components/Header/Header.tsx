import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.hooks';
import './Header.scss';

function Header() {
    const { openAuthModal } = useAuth();

    return (
        <header className="header-container">
            <div className="header-content">
                <div className="left-section">
                    <Link to="/" className="logo">
                        <img
                            src="https://cdnphoto.dantri.com.vn/pK7DOXhOc-13Ph078-BVL4wZoAU=/2025/07/15/logo-1png-1752569708909.png"
                            alt="Dân trí"
                            height="40"
                        />
                    </Link>
                    <div className="weather-info">
                        <div className='weather-info-container'>
                            <div className='location-date-time'>
                                <span className="location">TP. Hồ Chí Minh</span>
                                <span className="date">Thứ 2, 15/12/2025</span>
                            </div>
                            <div className='separate-line-between'></div>
                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24"><path d="M75 75c-27.578 0-50-22.422-50-50 0-7.344 1.563-14.297 4.453-20.547C12.11 12.266 0 29.688 0 50c0 27.578 22.422 50 50 50 20.313 0 37.734-12.11 45.547-29.453C89.297 73.437 82.344 75 75 75Z" fill="url(#01n_svg__a)"></path><path d="m50 20.313 1.328 3.359L54.688 25l-3.36 1.328L50 29.688l-1.328-3.36L45.312 25l3.36-1.328L50 20.312ZM67.89 13.672l1.329 3.36 3.36 1.327-3.36 1.328-1.328 3.36-1.329-3.36-3.359-1.328 3.36-1.328 1.328-3.36ZM72.578 35.39l1.328 3.36 3.36 1.328-3.36 1.328-1.328 3.36-1.328-3.36-3.36-1.328 3.36-1.328 1.328-3.36Z" fill="#F3BF44"></path><defs><linearGradient id="01n_svg__a" x1="95.547" y1="52.227" x2="0" y2="52.227" gradientUnits="userSpaceOnUse"><stop stop-color="#F7BC00"></stop><stop offset="1" stop-color="#F5CC00"></stop></linearGradient></defs></svg>
                            <span className="temp">28°C</span>
                        </div>
                    </div>
                </div>

                <nav className="nav-links">
                    <a
                        className="nav-item fica"
                        target="_blank"
                        rel="nofollow noopener"
                        href="https://fica.dantri.com.vn"
                    >
                        <img
                            alt="Fica"
                            height="26"
                            src="https://cdnweb.dantri.com.vn/dist/static-fica-logo.1-0-1.2435f041ebf869641575.jpg"
                            width="26"
                        />
                        <span>Fica</span>
                    </a>
                    <div className='separate-line-between'></div>
                    <a
                        className="nav-item dtinews"
                        target="_blank"
                        rel="nofollow noopener"
                        href="https://dtinews.dantri.com.vn"
                    >
                        <img
                            alt="DTiNews"
                            className="dt-rounded-full"
                            height="26"
                            src="https://cdnweb.dantri.com.vn/dist/static-dti-logo.1-0-1.bcb3ae7a10b2d69d8762.svg"
                            width="26"
                        />
                        <span>DTiNews</span>
                    </a>
                    <div className='separate-line-between'></div>
                    <a
                        className="nav-item social"
                        target="_blank"
                        rel="nofollow noopener"
                        href="https://noivuxahoi.dantri.com.vn"
                    >
                        <img
                            alt="NoiVuXaHoi"
                            className="dt-rounded-full"
                            height="26"
                            src="https://cdnweb.dantri.com.vn/dist/static-noivu-xahoi-logo.1-0-1.a4f3595fd7126fe8f384.svg"
                            width="26"
                        />
                        <span>Nội vụ & Xã hội</span>
                    </a>
                </nav>

                <div className="right-section">
                    {}
                    <button 
                        className="btn-login" 
                        onClick={(e) => {
                            e.preventDefault();
                            openAuthModal();
                        }}
                    >
                        <User size={18} />
                        <span>Đăng nhập</span>
                    </button>
                    <button className="search-btn">
                        <Search size={20} />
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Header
