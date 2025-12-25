import './Home.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface NewsItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
    imageUrl: string;
}

function Home() {
    const { slug } = useParams();
    const [news, setNews] = useState<NewsItem[]>([]);
    const [educationNews, setEducationNews] = useState<NewsItem[]>([]);
    const [technologyNews, setTechnologyNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                let rssUrl = 'https://dantri.com.vn/rss/home.rss';
                if (slug) {
                    rssUrl = `https://dantri.com.vn/rss/${slug}.rss`;
                }
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent(rssUrl)}`);
                setNews(response.data);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [slug]);

    useEffect(() => {
        const fetchEducationNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/giao-duc.rss')}`);
                setEducationNews(response.data);
            } catch (error) {
                console.error("Failed to fetch education news", error);
            }
        };

        fetchEducationNews();
    }, []);

    useEffect(() => {
        const fetchTechnologyNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/cong-nghe.rss')}`);
                setTechnologyNews(response.data);
            } catch (error) {
                console.error("Failed to fetch technology news", error);
            }
        };

        fetchTechnologyNews();
    }, []);

    if (loading) {
        return <div className="loading-container">Đang tải tin tức...</div>;
    }

    if (news.length === 0) {
        return <div className="loading-container">Không có tin tức nào.</div>;
    }

    const firstNews = news[0];
    const restNews = news.slice(1);

    return (
        <main className="homepage-container container">
            <div className="homepage-content">
                <div className="grid highlight">
                    {/* Tin noi bat nhat */}
                    <article className="article highlight">
                        <article className="article-item">
                            <div className="article-thumb">
                                <Link to={`/article?url=${encodeURIComponent(firstNews.link)}`}>
                                    <img src={firstNews.imageUrl} alt="thumbnail" referrerPolicy="no-referrer" />
                                </Link>
                            </div>
                            <h3 className="article-title">
                                <Link to={`/article?url=${encodeURIComponent(firstNews.link)}`}>
                                    {firstNews.title}
                                </Link>
                            </h3>
                            <div className="article-excerpt">
                                <Link to={`/article?url=${encodeURIComponent(firstNews.link)}`}>
                                    {firstNews.description}
                                </Link>
                            </div>
                        </article>

                        {/* 2 tin tiep theo */}
                        {restNews.slice(0, 2).map((item, index) => (
                            <article className="article-item" key={index}>
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl} alt="sub" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>

                    {/* Cac tin khac */}
                    <article className="article special">
                        {restNews.slice(2, 6).map((item, index) => (
                            <article className="article-item" key={index}>
                                <div className="article-container">
                                    <div className="article-content">
                                        <h3 className="article-title">
                                            <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </div>
                                    <div className="article-thumb">
                                        <img src={item.imageUrl} alt="thumb" width="120" height="80" referrerPolicy="no-referrer" />
                                    </div>
                                </div>
                            </article>
                        ))}
                    </article>
                </div>
                <div className="grid hot">
                    <article className="article spotlight">
                        <div className="title">
                            Dân trí <span>Spotlight</span>
                        </div>
                        {restNews.slice(6, 8).map((item, index) => (
                            <article className="article-item" key={index}>
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl} alt={item.title} width="234" height="156" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                    <article className="article-hot">
                        {restNews.slice(8, 13).map((item, index) => (
                            <article className="article-item" key={index}>
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl} alt={item.title} width="150" height="100" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                    <div className="sidebar">
                        <div className="sidebar-widget">
                            <div className="widget-title">Tin liên quan</div>
                            <div className="widget-articles">
                                {restNews.slice(13, 18).map((item, index) => (
                                    <article className="widget-article-item" key={index}>
                                        <div className="article-number">{index + 1}</div>
                                        <div className="article-thumb">
                                            <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl} alt={item.title} width="80" height="60" referrerPolicy="no-referrer" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="trending-topics">
                    <div className="trending-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="12" fill="#FFF5EE" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4342 20.0547C14.2298 18.8781 14.3031 17.6074 13.6541 16.2424C13.4736 16.9747 13.1435 17.4191 12.6637 17.5758C13.1093 16.3033 12.737 14.9286 11.5467 13.4515C11.521 14.977 11.1545 16.0883 10.4469 16.7853C9.47224 17.7446 9.48371 18.8272 10.4813 20.0332C6.34011 17.8293 5.75586 14.8736 8.72849 11.166C8.91286 12.0617 9.35964 12.6116 10.0689 12.8157C9.2958 9.53506 10.1092 6.73972 12.5091 4.42969C12.5238 9.55616 14.0959 10.0118 16.0835 12.3002C18.2295 15.0463 16.9683 18.2154 13.4342 20.0547Z" fill="#E32929" />
                        </svg>
                        Chủ đề nóng
                    </div>
                    <div className="trending-container">
                        <div className="trending-list">
                            <a href="https://dantri.com.vn/event/hoi-nghi-trung-uong-15-8326.htm" title="Hội nghị Trung ương 15"># Hội nghị Trung ương 15</a>
                            <a href="https://dantri.com.vn/event/dien-dan-esg-viet-nam-2025-8325.htm" title="Diễn đàn ESG Việt Nam 2025"># Diễn đàn ESG Việt Nam 2025</a>
                            <a href="https://dantri.com.vn/event/nhieu-gia-dinh-bo-pho-ve-que-8322.htm" title="Nhiều gia đình bỏ phố, về quê"># Nhiều gia đình bỏ phố, về quê</a>
                            <a href="https://dantri.com.vn/event/chien-dich-quang-trung-8324.htm" title="Chiến dịch Quang Trung"># Chiến dịch Quang Trung</a>
                            <a href="https://dantri.com.vn/event/lo-trinh-chuyen-xe-may-xang-sang-xe-may-dien-6495.htm" title="Lộ trình chuyển xe máy xăng sang xe máy điện"># Lộ trình chuyển xe máy xăng sang xe máy điện</a>
                            <a href="https://dantri.com.vn/event/camera-ai-mat-than-giao-thong-8319.htm" title="Camera AI - Mắt thần giao thông"># Camera AI - &quot;Mắt thần&quot; giao thông</a>
                            <a href="https://dantri.com.vn/event/o-nhiem-khong-khi-o-ha-noi-8318.htm" title="Ô nhiễm không khí ở Hà Nội"># Ô nhiễm không khí ở Hà Nội</a>
                        </div>
                    </div>
                    <div className="trending-buttons">
                        <button className="btn-left" aria-label="Scroll left">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_24530_62949)">
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <rect x="1.16602" y="1.25781" width="23" height="23" rx="5.5" stroke="#A0A4A8" />
                                <defs>
                                    <clipPath id="clip0_24530_62949">
                                        <rect x="0.666016" y="0.757812" width="24" height="24" rx="6" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button className="btn-right" aria-label="Scroll right">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_24530_62949)">
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                                <rect x="1.16602" y="1.25781" width="23" height="23" rx="5.5" stroke="#A0A4A8" />
                                <defs>
                                    <clipPath id="clip0_24530_62949">
                                        <rect x="0.666016" y="0.757812" width="24" height="24" rx="6" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="grid normal">
                    <article className="article-list">
                        {restNews.slice(18, 23).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/234x156'} alt={item.title} width="234" height="156" />
                                    </Link>
                                </div>
                                <div className="article-content">
                                    <h3 className="article-title">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                    </h3>
                                    <div className="article-excerpt">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                    </div>
                                </div>
                            </article>
                        ))}

                        {/* TIN HAY */}
                        <div className="featured-box">
                            <div className="title-head">TIN HAY</div>
                            <article className="grid-featured">
                                {restNews.slice(23, 26).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/150x100'} alt={item.title} width="150" height="100" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </article>
                        </div>
                        {restNews.slice(26, 50).map((item, index) => (
                            <article key={index + 23} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/234x156'} alt={item.title} width="234" height="156" />
                                    </Link>
                                </div>
                                <div className="article-content">
                                    <h3 className="article-title">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                    </h3>
                                    <div className="article-excerpt">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </article>
                    <div className="category">
                        <div className="category-wrap">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/kinh-doanh">Kinh doanh</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/tai-chinh">Tài chính</Link></li>
                                    <li><Link to="/category/chung-khoan">Chứng khoán</Link></li>
                                    <li><Link to="/category/chung-khoan">ESG Việt Nam</Link></li> {/*khong biet co cai link nay ko?*/}
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(31, 32).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(32, 35).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục Thời sự */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/thoi-su">Thời sự</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/chinh-tri">Chính trị</Link></li>
                                    <li><Link to="/category/hoc-tap-bac">Học tập Bác</Link></li>
                                    <li><Link to="/category/moi-truong">Môi trường</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(35, 36).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(36, 40).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục sức khoẻ */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/suc-khoe">Sức khỏe</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/ung-thu">Ung thư</Link></li>
                                    <li><Link to="/category/ngoai-than-kinh-cot-song">Ngoại thần kinh - Cột sống</Link></li>
                                    <li><Link to="/category/cham-dut-con-dau">Chấm dứt cơn đau</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(40, 41).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(41, 45).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục BDS */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/bat-dong-san">Bất động sản</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/du-an">Dự án</Link></li>
                                    <li><Link to="/category/thi-truong">Thị trường</Link></li>
                                    <li><Link to="/category/nhip-song-do-thi">Nhịp sống đô thị</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(45, 46).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(46, 50).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục Đời sống */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/doi-song">Đời sống</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/cong-dong">Cộng đồng</Link></li>
                                    <li><Link to="/category/nha-dep">Nhà đẹp</Link></li>
                                    <li><Link to="/category/thuong-luu">Thượng lưu</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(50, 51).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(51, 55).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục Thể thao */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/the-thao">Thể thao</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/bong-da">Bóng đá</Link></li>
                                    <li><Link to="/category/pickleball">Pickleball</Link></li>
                                    <li><Link to="/category/tennis">Tennis</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(55, 56).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(56, 60).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục Giải trí */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/giai-tri">Giải trí</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/hau-truong">Hậu trường</Link></li>
                                    <li><Link to="/category/sach-hay">Sách hay</Link></li>
                                    <li><Link to="/category/dien-anh">Điện ảnh</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(60, 61).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(61, 65).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục noi vu */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/noi-vu">Nội vụ</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/chinh-sach">Chính sách</Link></li>
                                    <li><Link to="/category/to-chuc-bo-may">Tổ chức bộ máy</Link></li>
                                    <li><Link to="/category/tien-luong">Tiền lương</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(65, 66).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(66, 70).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục tam long nhan ai*/}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/tam-long-nhan-ai">Tấm lòng nhân ái</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/nhip-cau-nhan-ai">Nhịp cầu nhân ái</Link></li>
                                    <li><Link to="/category/vuot-len-so-phan">Vượt lên số phận</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(70, 71).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(71, 75).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* native article */}
                        <div className="native-article">
                            <div className="native-container">
                                {restNews.slice(90, 92).map((item, index) => (
                                    <article key={index} className="native-item">
                                        <figure className="native-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img
                                                    src={item.imageUrl || 'https://via.placeholder.com/282x188'}
                                                    alt={item.title}
                                                    width="282"
                                                    height="188"
                                                />
                                            </Link>
                                        </figure>
                                        <div className="native-content">
                                            <Link to="/category/featured" className="native-category">
                                                {index === 0 ? 'Lao động - Việc làm' : 'Khoa học'}
                                            </Link>
                                            <h3 className="native-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                    {item.title}
                                                </Link>
                                            </h3>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục the gioi */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/the-gioi">Thế giới</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/quan-su">Quân sự</Link></li>
                                    <li><Link to="/category/phan-tich-binh-luan">Phân tích - Bình luận</Link></li>
                                    <li><Link to="/category/the-gioi-do-day">Thế giới đó đây</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(75, 76).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(76, 80).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục du lich */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/du-lich">Du lịch</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/tin-tuc">Tin tức</Link></li>
                                    <li><Link to="/category/kham-pha">Khám phá</Link></li>
                                    <li><Link to="/category/mon-ngon-diem-dep">Món ngon - Điểm đẹp</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(80, 81).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(81, 85).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* danh mục oto-xe may */}
                        <div className="category-wrap line">
                            <div className="category-head">
                                <h2 className="title">
                                    <Link to="/category/o-to-xe-may">Ô tô - Xe máy</Link>
                                </h2>
                                <ol className="category-nav">
                                    <li><Link to="/category/thi-truong-xe">Thị trường xe</Link></li>
                                    <li><Link to="/category/xe-dien">Xe điện</Link></li>
                                    <li><Link to="/category/danh-gia">Đánh giá</Link></li>
                                </ol>
                            </div>
                            <div className="category-container">
                                {restNews.slice(85, 86).map((item, index) => (
                                    <article key={index} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/192x128'} alt={item.title} width="192" height="128" />
                                            </Link>
                                        </div>
                                        <div className="article-content">
                                            <h3 className="article-title">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                            </h3>
                                            <div className="article-excerpt">
                                                <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                                {restNews.slice(86, 90).map((item, index) => (
                                    <article key={index + 1} className="article-item">
                                        <div className="article-thumb">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                                <img src={item.imageUrl || 'https://via.placeholder.com/90x60'} alt={item.title} width="90" height="60" />
                                            </Link>
                                        </div>
                                        <h3 className="article-title">
                                            <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                        </h3>
                                    </article>
                                ))}
                            </div>
                        </div>
                        {/* poll page home */}
                        <div className="poll page-home">
                            <div className="poll-left">
                                <div className="bao-giay-banner">
                                    <div className="banner-title">
                                        <a href="https://noivuxahoi.dantri.com.vn/doc-bao-giay-online" target="_blank">
                                            Đọc báo giấy online
                                        </a>
                                    </div>
                                    <a href="https://noivuxahoi.dantri.com.vn/doc-bao-giay-online" target="_blank">
                                        <img
                                            className="banner-img"
                                            alt="Báo giấy | NV&XH số 96"
                                            src="https://icdn.dantri.com.vn/2025/12/23/nvxh-so-96png-1766474250290.png"
                                        />
                                    </a>
                                </div>
                                <div className="poll-widget">
                                    <iframe
                                        frameBorder="0"
                                        src="https://gadgets.dantri.com.vn/polls/1056?embed=fixed"
                                        allowFullScreen
                                        allow="autoplay; encrypted-media; fullscreen; accelerometer; gyroscope; clipboard-write; web-share;"
                                        title="Bình chọn"
                                    />
                                </div>
                            </div>
                            <div className="poll-right">
                                <div className="ad-space">
                                    <iframe
                                        src="https://cdn.dtadnetwork.com/creatives/html5/202511/1762939412/index.html"
                                        frameBorder="0"
                                        scrolling="no"
                                        allowFullScreen={false}
                                        title="Advertisement"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Category Giáo dục */}
            <div className="grid category">
                <div className="head">
                    <h2 className="title">
                        <Link to="/giao-duc">Giáo dục</Link>
                    </h2>
                    <ol className="subcate">
                        <li><Link to="/giao-duc/goc-phu-huynh">Góc phụ huynh</Link></li>
                        <li><Link to="/giao-duc/tuyen-sinh">Tuyển sinh</Link></li>
                        <li><Link to="/giao-duc/tuyen-sinh/tra-cuu-diem">Tra cứu điểm</Link></li>
                    </ol>
                </div>
                <div className="article-container">
                    <article className="article-highlight">
                        {educationNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/516x344'} alt={item.title} width="516" height="344" />
                                    </Link>
                                </div>
                                <div className="article-content">
                                    <h3 className="article-title">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                    </h3>
                                    <div className="article-excerpt">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                        {educationNews.slice(1, 3).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/234x156'} alt={item.title} width="234" height="156" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                    <article className="article-list">
                        {educationNews.slice(3, 8).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/120x80'} alt={item.title} width="120" height="80" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                </div>
            </div>

            {/* Grid Category Công nghệ */}
            <div className="grid category">
                <div className="head">
                    <h2 className="title">
                        <Link to="/cong-nghe">Công nghệ</Link>
                    </h2>
                    <ol className="subcate">
                        <li><Link to="/cong-nghe/ai-internet">AI & Internet</Link></li>
                        <li><Link to="/cong-nghe/an-ninh-mang">An ninh mạng</Link></li>
                    </ol>
                </div>
                <div className="article-container">
                    <article className="article-highlight">
                        {technologyNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/516x344'} alt={item.title} width="516" height="344" />
                                    </Link>
                                </div>
                                <div className="article-content">
                                    <h3 className="article-title">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                    </h3>
                                    <div className="article-excerpt">
                                        <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.description}</Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                        {technologyNews.slice(1, 3).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/234x156'} alt={item.title} width="234" height="156" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                    <article className="article-list">
                        {technologyNews.slice(3, 8).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/120x80'} alt={item.title} width="120" height="80" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article/${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                </div>
            </div>
        </main>
    );
}

export default Home;
