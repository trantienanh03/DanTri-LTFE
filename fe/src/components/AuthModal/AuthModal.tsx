import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.hooks';
import { supabase } from '../../lib/supabaseClient';
import './AuthModal.scss';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithFacebook } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError(null);
  };

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    resetForm();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      closeAuthModal();
      resetForm();
    }
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      // Supabase by default might require email confirmation
      alert('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.');
      closeAuthModal();
      resetForm();
    }
    setLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setError(null);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'facebook') {
        await signInWithFacebook();
      } else {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'lỗi khi đăng nhập bằng mạng xã hội.');
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuthModal}>
      <div className="auth-modal-container" onClick={handleContainerClick}>
        <button className="close-btn" onClick={closeAuthModal}>
          <X size={24} />
        </button>

        <div className="auth-tabs">
          <button 
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Đăng nhập
          </button>
          <button 
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => handleTabChange('register')}
          >
            Đăng ký
          </button>
        </div>

        <div className="auth-content">
          {error && <div className="auth-error">{error}</div>}
          
          {activeTab === 'login' ? (
            <>
              <p className="login-title">Đăng nhập với tài khoản</p>
              
              <div className="social-buttons">
                <button 
                  className="social-btn google" 
                  title="Google"
                  onClick={() => handleSocialLogin('google')}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21-1.19-2.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button 
                  className="social-btn facebook" 
                  title="Facebook"
                  onClick={() => handleSocialLogin('facebook')}
                >
                   <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34V21.88C18.34 21.13 22 17 22 12z" fill="#1877F2"/>
                  </svg>
                </button>
                <button 
                  className="social-btn apple" 
                  title="Apple"
                  onClick={() => handleSocialLogin('apple')}
                >
                  <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.82 2.6c-.4 1.77 1.25 3.34 3.06 3.34.34 0 .68-.07.97-.19.04-1.68-1.55-3.32-3.17-3.18-.32.02-.63.03-.86.03zm.25 3.51c-1.66 0-3.08.93-3.89 2.37-.81-1.44-2.23-2.37-3.89-2.37-3 0-4.66 2.45-4.66 5.37 0 2.62 2 6.55 4.3 6.55 1.1 0 1.63-.78 3.12-.78 1.47 0 1.86.76 3.07.78 2.36.05 4.09-3.66 4.09-6.55 0-.08 0-.17-.01-.25-.37-1.07-2.14-1.74-2.13-3.41 0-1.66 1.15-2.6 1.16-2.61-.41-1.01-1.08-1.69-1.9-2.09-.76-.36-1.64-.55-2.52-.55z" fill="#000"/>
                  </svg>
                </button>
              </div>

              <div className="divider">
                <span>Đăng nhập với Email</span>
              </div>

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>EMAIL <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input 
                      type="email" 
                      placeholder="Nhập Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>MẬT KHẨU <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Nhập mật khẩu" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Đăng nhập'}
                </button>
              </form>

              <a href="#" className="forgot-password-link">
                Quên mật khẩu
              </a>
            </>
          ) : (
            <>
              <p className="login-title">Đăng ký với tài khoản</p>
              
              <div className="social-buttons">
                <button 
                  className="social-btn google" 
                  title="Google"
                  onClick={() => handleSocialLogin('google')}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21-1.19-2.63z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </button>
                <button 
                  className="social-btn facebook" 
                  title="Facebook"
                  onClick={() => handleSocialLogin('facebook')}
                >
                   <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.19 2.24.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34V21.88C18.34 21.13 22 17 22 12z" fill="#1877F2"/>
                  </svg>
                </button>
                <button 
                  className="social-btn apple" 
                  title="Apple"
                  onClick={() => handleSocialLogin('apple')}
                >
                  <svg viewBox="0 0 24 24" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.82 2.6c-.4 1.77 1.25 3.34 3.06 3.34.34 0 .68-.07.97-.19.04-1.68-1.55-3.32-3.17-3.18-.32.02-.63.03-.86.03zm.25 3.51c-1.66 0-3.08.93-3.89 2.37-.81-1.44-2.23-2.37-3.89-2.37-3 0-4.66 2.45-4.66 5.37 0 2.62 2 6.55 4.3 6.55 1.1 0 1.63-.78 3.12-.78 1.47 0 1.86.76 3.07.78 2.36.05 4.09-3.66 4.09-6.55 0-.08 0-.17-.01-.25-.37-1.07-2.14-1.74-2.13-3.41 0-1.66 1.15-2.6 1.16-2.61-.41-1.01-1.08-1.69-1.9-2.09-.76-.36-1.64-.55-2.52-.55z" fill="#000"/>
                  </svg>
                </button>
              </div>

              <div className="divider">
                <span>Đăng ký với Email</span>
              </div>

              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label>HỌ VÀ TÊN <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Nhập họ và tên" 
                      maxLength={50} 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <span className="char-count">{fullName.length}/50</span>
                  </div>
                </div>

                <div className="form-group">
                  <label>EMAIL <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input 
                      type="email" 
                      placeholder="Nhập Email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>MẬT KHẨU <span className="required">*</span></label>
                  <div className="input-wrapper">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Nhập mật khẩu" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Đăng ký'}
                </button>
              </form>

              <p className="terms-disclaimer">
                Bằng cách đăng ký tài khoản, bạn cũng đồng thời chấp nhận mọi 
                <strong> điều kiện về quy định và chính sách của Dân trí</strong>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
