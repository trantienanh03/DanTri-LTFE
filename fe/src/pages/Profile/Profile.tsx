import React from 'react';
import { useAuth } from '../../context/AuthContext.hooks';
import { 
  User, 
  MessageSquare, 
  Layout, 
  Eye, 
  Bookmark, 
  LogOut, 
  Mail, 
  Calendar, 
  Users, 
  Phone, 
  MapPin
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SavedNews from './components/SavedNews';
import RecentlyViewed from './components/RecentlyViewed';
import './Profile.scss';

const Profile: React.FC = () => {
  const { 
    user, 
    signOut, 
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    unlinkSocialAccount,
    displayName
  } = useAuth();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = React.useState(searchParams.get('section') || 'account');

  React.useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setActiveSection(section);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const email = user.email || '';

  // Danh sách các tài khoản đã liên kết thực tế từ Supabase
  const connectedProviders = user.identities?.map(identity => ({
    provider: identity.provider,
    name: identity.identity_data?.full_name || identity.identity_data?.name
  })) || [];

  const isConnected = (provider: string) => {
    return connectedProviders.find(p => p.provider === provider);
  };

  const getProviderDisplay = (provider: string, defaultLabel: string) => {
    const conn = isConnected(provider);
    // Ưu tiên hiện tên từ identity đó, nếu không có thì hiện label mặc định (vd: Facebook)
    return conn?.name || defaultLabel;
  };

  const sidebarItems = [
    { id: 'account', icon: <User size={20} />, label: 'Thông tin tài khoản' },
    { id: 'comments', icon: <MessageSquare size={20} />, label: 'Hoạt động bình luận' },
    { id: 'newsfeed', icon: <Layout size={20} />, label: 'Bảng tin của bạn' },
    { id: 'history', icon: <Eye size={20} />, label: 'Tin đã xem' },
    { id: 'saved', icon: <Bookmark size={20} />, label: 'Tin đã lưu' },
  ];

  const handleConnect = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      if (provider === 'google') await signInWithGoogle();
      if (provider === 'facebook') await signInWithFacebook();
      if (provider === 'github') await signInWithGithub();
    } catch (error) {
      console.error(`Lỗi kết nối ${provider}:`, error);
    }
  };

  const handleDisconnect = async (provider: string) => {
    try {
      await unlinkSocialAccount(provider);
    } catch (error) {
      console.error(`Lỗi ngắt kết nối ${provider}:`, error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container container">
        <aside className="profile-sidebar">
          <nav className="sidebar-nav">
            {sidebarItems.map((item, index) => (
              <div 
                key={index} 
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </div>
            ))}
            <div className="sidebar-item logout" onClick={signOut}>
              <span className="item-icon"><LogOut size={20} /></span>
              <span className="item-label">Đăng xuất</span>
            </div>
          </nav>
        </aside>

        <main className="profile-main">
          {activeSection === 'account' ? (
            <>
              <section className="profile-header-card">
                <div className="user-info-summary">
                  <span className="info-label">TÊN HIỂN THỊ</span>
                  <h2 className="display-name">{displayName}</h2>
                </div>
              </section>

              <h1 className="section-main-title">Quản lý tài khoản</h1>

              <section className="info-section">
                <div className="info-row">
                  <div className="info-icon-col">
                    <Mail size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">EMAIL</span>
                    <span className="row-value">{email}</span>
                  </div>
                </div>

                <div className="social-linking-section">
                  <h3 className="sub-section-title">LIÊN KẾT TÀI KHOẢN</h3>
                  
                  {[
                    { 
                      id: 'google' as const, 
                      label: 'Google', 
                      icon: <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" /> 
                    },
                    { 
                      id: 'facebook' as const, 
                      label: 'Facebook', 
                      icon: <img src="https://www.facebook.com/favicon.ico" alt="Facebook" width="20" height="20" /> 
                    },
                    { 
                      id: 'github' as const, 
                      label: 'Github', 
                      icon: (
                        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#24292e"/>
                        </svg>
                      )
                    }
                  ].map((provider) => (
                    <div key={provider.id} className="social-row">
                      <div className="social-info">
                        {provider.icon}
                        <span className="social-name">{getProviderDisplay(provider.id, provider.label)}</span>
                      </div>
                      {isConnected(provider.id) ? (
                        <button className="social-action-btn disconnect" onClick={() => handleDisconnect(provider.id)}>Ngắt kết nối</button>
                      ) : (
                        <button className="social-action-btn connect" onClick={() => handleConnect(provider.id)}>Kết nối</button>
                      )}
                    </div>
                  ))}
                  
                  <p className="social-note">Sau khi liên kết, bạn có thể đăng nhập bằng tài khoản mạng xã hội</p>
                </div>
              </section>

              <h1 className="section-main-title">Thông tin cá nhân</h1>

              <section className="info-section">
                <div className="info-row">
                  <div className="info-icon-col">
                    <User size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">HỌ VÀ TÊN</span>
                    <span className="row-value">{displayName}</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-col">
                    <Calendar size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">NGÀY SINH</span>
                    <span className="row-value placeholder">dd/mm/yyyy</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-col">
                    <Users size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">GIỚI TÍNH</span>
                    <span className="row-value">Khác</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-col">
                    <Phone size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">SỐ ĐIỆN THOẠI</span>
                    <span className="row-value placeholder">Chưa có thông tin</span>
                  </div>
                </div>

                <div className="info-row">
                  <div className="info-icon-col">
                    <MapPin size={20} />
                  </div>
                  <div className="info-content-col">
                    <span className="row-label">ĐỊA CHỈ</span>
                    <span className="row-value placeholder">Chưa có thông tin</span>
                  </div>
                </div>
              </section>
            </>
          ) : activeSection === 'saved' ? (
            <SavedNews />
          ) : activeSection === 'history' ? (
            <RecentlyViewed />
          ) : (
            <div className="placeholder-section">
              <h1 className="section-main-title">{sidebarItems.find(i => i.id === activeSection)?.label}</h1>
              <p>Tính năng đang được phát triển...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
