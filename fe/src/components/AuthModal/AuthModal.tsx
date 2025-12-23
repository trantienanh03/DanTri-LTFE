import React, { useState } from 'react';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.hooks';
import { supabase } from '../../lib/supabaseClient';
import './AuthModal.scss';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, signInWithGoogle, signInWithFacebook, signInWithGithub } = useAuth();
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

  const handleSocialLogin = async (provider: 'google' | 'facebook' | 'github') => {
    setError(null);
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else if (provider === 'facebook') {
        await signInWithFacebook();
      } else if (provider === 'github') {
        await signInWithGithub();
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
                  className="social-btn github" 
                  title="GitHub"
                  onClick={() => handleSocialLogin('github')}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#24292e"/>
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
                  className="social-btn github" 
                  title="GitHub"
                  onClick={() => handleSocialLogin('github')}
                >
                  <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#24292e"/>
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
