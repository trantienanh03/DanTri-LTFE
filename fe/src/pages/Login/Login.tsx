import React from "react";
import { Mail, Lock, Facebook, Globe, Phone } from "lucide-react";
import "./Login.scss";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-branding">
          <div className="branding-text">
            <h1>Dân trí</h1>
            <p>Thông tin cập nhật từng phút, chính xác và nhân văn.</p>
          </div>
          <div className="branding-overlay"></div>
          <img
            src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
            alt="News background"
            className="branding-image"
          />
        </div>

        <div className="login-form-section">
          <div className="login-header">
            <h2>Đăng nhập</h2>
            <p>Chào mừng bạn quay lại với cộng đồng Dân trí</p>
          </div>

          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email hoặc số điện thoại</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="text"
                  id="email"
                  placeholder="Nhập email hoặc số điện thoại của bạn"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  id="password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Ghi nhớ đăng nhập
              </label>
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="btn-login">
              Đăng nhập
            </button>
          </form>

          <div className="divider">
            <span>Hoặc đăng nhập bằng</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <Globe size={20} />
              <span>Google</span>
            </button>
            <button className="social-btn facebook">
              <Facebook size={20} />
              <span>Facebook</span>
            </button>
            <button className="social-btn zalo">
              <Phone size={20} />{" "}
              {/* Using Phone as generic placeholder for Zalo if specific icon unavailable */}
              <span>Zalo</span>
            </button>
          </div>

          <div className="login-footer">
            <p>
              Chưa có tài khoản? <a href="#">Đăng ký ngay</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
