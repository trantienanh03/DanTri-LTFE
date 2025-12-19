import './Home.scss';

function Home() {
    return (
        <main className="homepage-container container">
            <div className="homepage-content">
                <div className="grid highlight">
                    {/* KHỐI HIGHLIGHT (BÊN TRÁI) */}
                    <article className="article highlight">
                        {/* Bài viết chính lớn nhất - Float Right */}
                        <article className="article-item">
                            <div className="article-thumb">
                                <a href="/thoi-su/tuyen-giao-va-dan-van">
                                    <img src="https://cdnphoto.dantri.com.vn/U7TI97ttqio126Ls37QweKCf0bk=/zoom/774_516/2025/12/19/tong-bi-thu-to-lam-phat-bieu-cropped-1766123368098.jpg" alt="thumbnail" width="480" height="320" />
                                </a>
                            </div>
                            <h3 className="article-title">
                                <a href="/thoi-su/tuyen-giao-va-dan-van">
                                    Tuyên giáo và Dân vận "bắt đúng mạch nguồn, thấu từng nhịp đập" nhân dân
                                </a>
                            </h3>
                            <div className="article-excerpt">
                                <a href="/thoi-su/tuyen-giao-va-dan-van">
                                    Tổng Bí thư khẳng định công tác Tuyên giáo và Dân vận đã thể hiện rõ vai trò "đi trước mở đường, đi cùng thực hiện, đi sau tổng kết" và "kiến tạo niềm tin", là cầu nối giữa Đảng với Nhân dân…
                                </a>
                            </div>
                        </article>

                        {/* Hai bài viết nhỏ - Float Left */}
                        <article className="article-item">
                            <div className="article-thumb">
                                <a href="/thoi-su/95-thi-sinh">
                                    <img src="https://cdnphoto.dantri.com.vn/dk9icsrRF5ZTJEqHguj-B6PyRHo=/zoom/351_234/2025/12/19/trao-giai-cropped-1766135317311.jpg" alt="sub" width="282" height="188" />
                                </a>
                            </div>
                            <h3 className="article-title">
                                <a href="/thoi-su/95-thi-sinh">95 thí sinh xuất sắc đạt giải tại 2 cuộc thi tìm hiểu về giao thông</a>
                            </h3>
                        </article>

                        <article className="article-item">
                            <div className="article-thumb">
                                <a href="/the-thao/bao-thai-lan">
                                    <img src="https://cdnphoto.dantri.com.vn/eoutvptRrQ4tRxv-yC6p-62XHVE=/thumb_w/1020/2025/12/19/z7341298550449b2376907fcbcf4d8f8ff227ef0db90f5jpg-1766136577617.jpg?watermark=v1" alt="sub" width="282" height="188" />
                                </a>
                            </div>
                            <h3 className="article-title">
                                <a href="/the-thao/bao-thai-lan">Báo Thái Lan ngả mũ thán phục HLV Kim Sang Sik</a>
                            </h3>
                        </article>
                    </article>

                    {/* KHỐI SPECIAL (BÊN PHẢI) */}
                    <article className="article special">
                        {/* Các item trong cột phải */}
                        {[1, 2, 3].map((item) => (
                            <article className="article-item" key={item}>
                                <div className="article-container">
                                    <div className="article-content">
                                        <h3 className="article-title">
                                            <a href="#">U22 Việt Nam rời Thái Lan, khép lại hành trình ở SEA Games 33</a>
                                        </h3>
                                    </div>
                                    <div className="article-thumb">
                                        <img src="https://cdnphoto.dantri.com.vn/_rK6K1SrFgS5OYimGmW_CbKwY64=/zoom/192_128/2025/12/19/u22vn2anan-edited-cropped-1766133102785.jpg" alt="thumb" width="120" height="80" />
                                    </div>
                                </div>
                            </article>
                        ))}

                        {/* Dạng Blog đặc biệt có Avatar */}
                        <article className="article-item blog">
                            <div className="article-container">
                                <div className="article-content">
                                    <a className="article-logo-blog" href="https://dantri.com.vn/tam-diem.htm"></a>
                                    <h3 className="article-title"><a href="#">Từ "vực thẳm" đến chiến công kỳ diệu của bóng đá Việt Nam</a></h3>
                                </div>
                                <div className="article-avatar">
                                    <img src="https://cdnphoto.dantri.com.vn/rC8GGNchRFAnzb0S48TKDygwkDw=/zoom/132_132/2023/04/29/untitled-project-crop-1682739339657.jpeg" alt="author" width="88" height="88" />
                                </div>
                            </div>
                            <div className="article-bottom">
                                <button
                                    className="article-total-comment"
                                    onClick={() => window.location.href = '#comment'}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.33203 8.3314H10.332M5.33529 4.99988L7.66535 4.99805" stroke="#097668" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M13.3329 1.33398H2.66732C1.93094 1.33398 1.33398 1.93094 1.33398 2.66732V10.6654C1.33398 11.4017 1.93094 11.9987 2.66732 11.9987H4V13.3562C4 13.9011 4.61814 14.2158 5.05878 13.8953L7.66665 11.9987H13.3329C14.0693 11.9987 14.6662 11.4017 14.6662 10.6654V2.66732C14.6662 1.93094 14.0693 1.33398 13.3329 1.33398Z" stroke="#097668" strokeWidth="1.5" strokeLinejoin="round"></path>
                                    </svg>
                                    <span className="comment-count">10</span>
                                </button>
                                <a className="article-author" href="https://dantri.com.vn/tac-gia/huu-binh-3217.htm">
                                    <span className="author-name">Hữu Bình</span>
                                </a>
                            </div>
                        </article>
                    </article>
                </div>
            </div>
        </main>
    );
}

export default Home;
