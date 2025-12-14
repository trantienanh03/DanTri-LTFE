import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
    return (
        <header className="header-container">
            <div className="header-content">
                <Link to="/" className="logo">
                   <h2>Dân trí</h2>
                </Link>
                <div className="actions">
                    <Link to="/login" className="btn-login-nav">Đăng nhập</Link>
                </div>
            </div>
        </header>
    );
}

export default Header