import './Nav.scss';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="nav-wrapper">
            <div className="nav-container container">
                <ol className="menu-wrap">
                    <li className="home">
                        <Link aria-label="Báo điện tử Dân trí - Tin tức cập nhật liên tục 24/7" to="/">
                            <svg aria-labelledby="svg-home" aria-hidden="true" width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title id="svg-home">Trang chủ</title>
                                <path d="M16.7334 22.6665H15.2667C14.9353 22.6665 14.6667 22.3979 14.6667 22.0665V19.2665C14.6667 18.9351 14.9353 18.6665 15.2667 18.6665H16.7334C17.0647 18.6665 17.3334 18.9351 17.3334 19.2665V22.0665C17.3334 22.3979 17.0647 22.6665 16.7334 22.6665Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M4 12.6665L16 5.33317L28 12.6665" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M25.3334 17.3335V26.0668C25.3334 26.3982 25.0647 26.6668 24.7334 26.6668H7.26669C6.93532 26.6668 6.66669 26.3982 6.66669 26.0668V17.3335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </Link>
                    </li>
                    <li className="newest">
                        <Link to="/">Mới nhất</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/the-gioi">Thế giới</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/thoi-su">Thời sự</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/phap-luat">Pháp luật</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/suc-khoe">Sức khỏe</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/doi-song">Đời sống</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/du-lich">Du lịch</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/kinh-doanh">Kinh doanh</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/bat-dong-san">Bất động sản</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/tam-long-nhan-ai">Nhân ái</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/giai-tri">Giải trí</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/the-thao">Thể thao</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/giao-duc">Giáo dục</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/o-to-xe-may">Xe ++</Link>
                    </li>
                    <li className="has-child">
                        <Link to="/category/cong-nghe">Công nghệ</Link>
                    </li>


                    <li className="menu-more"><svg aria-hidden="true" className="more" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 13.7379C19.5523 13.7379 20 13.2902 20 12.7379C20 12.1857 19.5523 11.7379 19 11.7379C18.4477 11.7379 18 12.1857 18 12.7379C18 13.2902 18.4477 13.7379 19 13.7379Z" stroke="#4D4D4D" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13.7379C12.5523 13.7379 12.9999 13.2902 12.9999 12.7379C12.9999 12.1857 12.5523 11.7379 12 11.7379C11.4477 11.7379 11 12.1857 11 12.7379C11 13.2902 11.4477 13.7379 12 13.7379Z" stroke="#4D4D4D" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 13.7379C5.55228 13.7379 5.99999 13.2902 5.99999 12.7379C5.99999 12.1857 5.55228 11.7379 5 11.7379C4.44771 11.7379 4 12.1857 4 12.7379C4 13.2902 4.44771 13.7379 5 13.7379Z" stroke="#4D4D4D" stroke-width="1.3125" stroke-linecap="round" stroke-linejoin="round"></path></svg> <svg aria-hidden="true" className="close" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.43635 17.804C6.50318 17.8703 6.58245 17.9228 6.6696 17.9584C6.75674 17.994 6.85006 18.012 6.9442 18.0115C7.13309 18.0116 7.31437 17.937 7.44848 17.804L12.0013 13.2512L16.5541 17.804C16.6882 17.937 16.8694 18.0116 17.0583 18.0115C17.1997 18.0116 17.3379 17.9698 17.4555 17.8914C17.5731 17.8131 17.6649 17.7016 17.7192 17.5711C17.7736 17.4407 17.788 17.297 17.7608 17.1583C17.7335 17.0196 17.6658 16.8921 17.5662 16.7919L13.0134 12.2391L17.5662 7.68632C17.7004 7.5521 17.7758 7.37006 17.7758 7.18025C17.7758 6.99044 17.7004 6.8084 17.5662 6.67419C17.432 6.53997 17.2499 6.46457 17.0601 6.46457C16.8703 6.46457 16.6883 6.53997 16.5541 6.67419L12.0013 11.227L7.44848 6.67419C7.31426 6.53997 7.13222 6.46457 6.94241 6.46457C6.7526 6.46457 6.57056 6.53997 6.43635 6.67419C6.30213 6.8084 6.22673 6.99044 6.22673 7.18025C6.22673 7.37006 6.30213 7.5521 6.43635 7.68632L10.9891 12.2391L6.43635 16.7919C6.36984 16.8583 6.31708 16.9372 6.28109 17.0241C6.24509 17.1109 6.22656 17.204 6.22656 17.298C6.22656 17.392 6.24509 17.485 6.28109 17.5719C6.31708 17.6587 6.36984 17.7376 6.43635 17.804Z" fill="black"></path></svg></li>
                </ol>
            </div>
        </nav>
    );
}

export default Nav