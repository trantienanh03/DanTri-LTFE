import './Footer.scss';

function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-container container">
                <div className="footer-logo">
                    <a href="https://dantri.com.vn/">
                        <img alt="Báo điện tử Dân trí - Tin tức cập nhật liên tục 24/7"
                            data-src="https://cdnweb.dantri.com.vn/dist/static-logo.1-0-1.35b20ba09264084fcb26.svg"
                            height="25" src="https://cdnweb.dantri.com.vn/dist/static-logo.1-0-1.35b20ba09264084fcb26.svg"
                            width="102" data-ll-status="loaded" className="entered loaded"></img>
                    </a>
                </div>
                <div className="footer-wrap">
                    <div className='left-side-footer'>
                        <p>Cơ quan của Bộ Nội vụ</p>
                        <p>Tổng biên tập: Phạm Tuấn Anh</p>
                        <p>Giấy phép hoạt động báo điện tử Dân trí số 15/GP-BVHTTDL Hà Nội, ngày 14-4-2025</p>
                        <p>Địa chỉ tòa soạn: Số 48 ngõ 2 phố Giảng Võ, phường Giảng Võ, thành phố Hà Nội</p>
                        <p>Điện thoại: 024-3736-6491. Hotline HN: 0973-567-567</p>
                        <p>Văn phòng đại diện miền Nam: Số 51-53 Võ Văn Tần, phường Xuân Hòa, thành phố Hồ Chí Minh</p>
                        <p>Hotline TPHCM: 0974-567-567</p>
                        <p>Email: <a href="mailto:info@dantri.com.vn" className="link-hover">info@dantri.com.vn</a></p>
                    </div>
                    <div className='mid-footer'>
                        <h3>RSS</h3>
                        <ul>
                            <li><a href="#" className="link-hover">Liên hệ toà soạn</a></li>
                            <li><span>Liên hệ quảng cáo: </span><a href="#" className="link-hover">0945.54.03.03</a></li>
                            <li><span>Email: </span><a href="mailto:quangcao@dantri.com.vn" className="link-hover">quangcao@dantri.com.vn</a></li>
                            <li><a href="#" className="link-hover">Chính sách bảo mật dữ liệu cá nhân</a></li>
                        </ul>
                    </div>
                    <div className='right-side-footer'>
                        <div className="footer-app">
                            <h3>Đọc báo Dân trí trên mobile:</h3>
                            <div className="app-badges">
                                <div className="footer-app-ico flex-jcc">
                                    <a className="ios" target="_blank" rel="nofollow" href="https://apps.apple.com/vn/app/b%C3%A1o-d%C3%A2n-tr%C3%AD-dantri-com-vn/id1455334618?l=vi">IOS</a>
                                    <a className="android" target="_blank" rel="nofollow" href="https://play.google.com/store/apps/details?id=vn.com.dantrinews.android">Android</a>
                                </div>
                            </div>
                        </div>
                        <div className="social-icons">
                            <h3>Theo dõi Dân trí trên:</h3>
                            <div className="socials">
                                <label className="social-label">Theo dõi Dân trí trên:</label>
                                <div className="social-list">
                                    <a className="facebook" target="_blank" rel="nofollow" href="https://www.facebook.com/baodantridientu">Facebook</a>
                                    <a className="youtube" target="_blank" rel="nofollow" href="https://www.youtube.com/@baodantri7941">Youtube</a>
                                    <a className="tiktok" target="_blank" rel="nofollow" href="https://www.tiktok.com/@dantri.com.vn">Tiktok</a>
                                    <a className="telegram" target="_blank" rel="nofollow" href="https://t.me/baodantri">Telegram</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dantri-copyright">
                    <p>© 2005-2025 Bản quyền thuộc về Báo điện tử Dân trí. Cấm sao chép dưới mọi hình thức nếu không có sự chấp thuận bằng văn bản.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer