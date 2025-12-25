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
    const [laborNews, setLaborNews] = useState<NewsItem[]>([]);
    const [lawNews, setLawNews] = useState<NewsItem[]>([]);
    const [loveNews, setLoveNews] = useState<NewsItem[]>([]);
    const [scienceNews, setScienceNews] = useState<NewsItem[]>([]);
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

    useEffect(() => {
        const fetchLaborNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/lao-dong-viec-lam.rss')}`);
                setLaborNews(response.data);
            } catch (error) {
                console.error("Failed to fetch labor news", error);
            }
        };

        fetchLaborNews();
    }, []);

    useEffect(() => {
        const fetchLawNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/phap-luat.rss')}`);
                setLawNews(response.data);
            } catch (error) {
                console.error("Failed to fetch law news", error);
            }
        };

        fetchLawNews();
    }, []);

    useEffect(() => {
        const fetchLoveNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/tinh-yeu-gioi-tinh.rss')}`);
                setLoveNews(response.data);
            } catch (error) {
                console.error("Failed to fetch love news", error);
            }
        };

        fetchLoveNews();
    }, []);

    useEffect(() => {
        const fetchScienceNews = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/news?url=${encodeURIComponent('https://dantri.com.vn/rss/khoa-hoc.rss')}`);
                setScienceNews(response.data);
            } catch (error) {
                console.error("Failed to fetch science news", error);
            }
        };

        fetchScienceNews();
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
        <main className="homepage-container">
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
            <div className="spotlight-wrap line bg-wrap">
                <div className="spotlight-nav">
                    <div className="title">
                        Dân trí <span>Spotlight</span>
                    </div>
                    <ol className="spotlight-menu">
                        <li><a href="https://dantri.com.vn/dmagazine.htm">Dmagazine</a></li>
                        <li><a href="https://dantri.com.vn/infographic.htm">Infographic</a></li>
                        <li><a href="https://dantri.com.vn/collection/dbiz-4030.htm">DBiz</a></li>
                        <li><a href="https://dantri.com.vn/photo-news.htm">Photo News</a></li>
                        <li><a href="https://dantri.com.vn/tam-diem.htm">Tâm điểm</a></li>
                    </ol>
                </div>
                <div className="spotlight-slide">
                    <div className="spotlight-swiper">
                        <div className="spotlight-wrapper">
                            {restNews.slice(6, 12).map((item, index) => (
                                <article className="spotlight-item" key={index}>
                                    <div className="spotlight-thumb">
                                        <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                referrerPolicy="no-referrer"
                                                loading="lazy"
                                            />
                                        </Link>
                                    </div>
                                    <div className="spotlight-category">
                                        <a href="https://dantri.com.vn/photo-news.htm">
                                            <img
                                                alt="PhotoNews"
                                                height="28"
                                                src="https://cdnweb.dantri.com.vn/dist/static-Logo-PhotoNews-Primary-Horizon.1-0-1.6f0823521c2770194b99.svg"
                                                width="191"
                                            />
                                        </a>
                                    </div>
                                    <h3 className="spotlight-title">
                                        <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                            {item.title}
                                        </Link>
                                    </h3>
                                </article>
                            ))}
                        </div>
                        <div className="spotlight-pagination">
                            <span className="spotlight-bullet active"></span>
                            <span className="spotlight-bullet"></span>
                            <span className="spotlight-bullet"></span>
                        </div>
                    </div>
                    <div className="spotlight-next">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_spotlight_next)">
                                <path d="M9.707 5.29292L4.707 0.292919C4.51839 0.110761 4.26579 0.00996641 4.0036 0.0122448C3.7414 0.0145233 3.49059 0.119692 3.30518 0.3051C3.11977 0.490508 3.0146 0.741321 3.01232 1.00352C3.01004 1.26571 3.11084 1.51832 3.293 1.70692L7.586 5.99992L3.293 10.2929C3.19749 10.3852 3.1213 10.4955 3.0689 10.6175C3.01649 10.7395 2.9889 10.8707 2.98775 11.0035C2.98659 11.1363 3.01189 11.268 3.06218 11.3909C3.11246 11.5138 3.18671 11.6254 3.2806 11.7193C3.37449 11.8132 3.48615 11.8875 3.60904 11.9377C3.73194 11.988 3.86362 12.0133 3.9964 12.0122C4.12918 12.011 4.2604 11.9834 4.3824 11.931C4.50441 11.8786 4.61475 11.8024 4.707 11.7069L9.707 6.70692C9.89447 6.51939 9.99978 6.26508 9.99978 5.99992C9.99978 5.73475 9.89447 5.48045 9.707 5.29292Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_spotlight_next">
                                    <rect width="12" height="12" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="spotlight-prev">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_spotlight_prev)">
                                <path d="M2.29298 5.29292L7.29298 0.292919C7.48158 0.110761 7.73418 0.00996641 7.99638 0.0122448C8.25858 0.0145233 8.50939 0.119692 8.6948 0.3051C8.88021 0.490508 8.98538 0.741321 8.98765 1.00352C8.98993 1.26571 8.88914 1.51832 8.70698 1.70692L4.41398 5.99992L8.70698 10.2929C8.80249 10.3852 8.87867 10.4955 8.93108 10.6175C8.98349 10.7395 9.01108 10.8707 9.01223 11.0035C9.01338 11.1363 8.98808 11.268 8.9378 11.3909C8.88752 11.5138 8.81327 11.6254 8.71937 11.7193C8.62548 11.8132 8.51383 11.8875 8.39093 11.9377C8.26804 11.988 8.13636 12.0133 8.00358 12.0122C7.8708 12.011 7.73958 11.9834 7.61758 11.931C7.49557 11.8786 7.38523 11.8024 7.29298 11.7069L2.29298 6.70692C2.10551 6.51939 2.00019 6.26508 2.00019 5.99992C2.00019 5.73475 2.10551 5.48045 2.29298 5.29292Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_spotlight_prev">
                                    <rect width="12" height="12" fill="white" transform="matrix(-1 0 0 1 12 0)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Grid Row */}
            <div className="grid row">
                {/* Lao động - Việc làm */}
                <div className="article-col" data-cate-id="133">
                    <h2 className="title">
                        <Link to="/lao-dong-viec-lam">Lao động - Việc làm</Link>
                    </h2>
                    <ol className="navigation">
                        <li><Link to="/lao-dong-viec-lam/nhan-luc-moi">Nhân lực mới</Link></li>
                        <li><Link to="/lao-dong-viec-lam/lam-giau">Làm giàu</Link></li>
                        <li><Link to="/noi-vu/an-sinh">An sinh</Link></li>
                    </ol>
                    <article className="article-wrap">
                        {laborNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/264x176'} alt={item.title} width="264" height="176" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                        {laborNews.slice(1, 4).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/114x76'} alt={item.title} width="114" height="76" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                </div>

                {/* Pháp luật */}
                <div className="article-col" data-cate-id="170">
                    <h2 className="title">
                        <Link to="/phap-luat">Pháp luật</Link>
                    </h2>
                    <ol className="navigation">
                        <li><Link to="/phap-luat/ho-so-vu-an">Hồ sơ vụ án</Link></li>
                        <li><Link to="/phap-luat/phap-dinh">Pháp đình</Link></li>
                    </ol>
                    <article className="article-wrap">
                        {lawNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/264x176'} alt={item.title} width="264" height="176" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                        {lawNews.slice(1, 4).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/114x76'} alt={item.title} width="114" height="76" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                </div>

                {/* Tình yêu - Giới tính */}
                <div className="article-col" data-cate-id="130">
                    <h2 className="title">
                        <Link to="/tinh-yeu-gioi-tinh">Tình yêu - Giới tính</Link>
                    </h2>
                    <ol className="navigation">
                        <li><Link to="/tinh-yeu-gioi-tinh">Tình yêu - Giới tính</Link></li>
                        <li><Link to="/tinh-yeu-gioi-tinh/gia-dinh">Gia đình</Link></li>
                        <li><Link to="/tinh-yeu-gioi-tinh/tinh-yeu">Tình yêu</Link></li>
                    </ol>
                    <article className="article-wrap">
                        {loveNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/264x176'} alt={item.title} width="264" height="176" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                        {loveNews.slice(1, 4).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/114x76'} alt={item.title} width="114" height="76" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                    </article>
                </div>

                {/* Khoa học */}
                <div className="article-col" data-cate-id="894">
                    <h2 className="title">
                        <Link to="/khoa-hoc">Khoa học</Link>
                    </h2>
                    <ol className="navigation">
                        <li><Link to="/khoa-hoc/the-gioi-tu-nhien">Thế giới tự nhiên</Link></li>
                        <li><Link to="/khoa-hoc/vu-tru">Vũ trụ</Link></li>
                        <li><Link to="/khoa-hoc/kham-pha">Khám phá</Link></li>
                    </ol>
                    <article className="article-wrap">
                        {scienceNews.slice(0, 1).map((item, index) => (
                            <article key={index} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/264x176'} alt={item.title} width="264" height="176" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
                                </h3>
                            </article>
                        ))}
                        {scienceNews.slice(1, 4).map((item, index) => (
                            <article key={index + 1} className="article-item">
                                <div className="article-thumb">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>
                                        <img src={item.imageUrl || 'https://via.placeholder.com/114x76'} alt={item.title} width="114" height="76" referrerPolicy="no-referrer" />
                                    </Link>
                                </div>
                                <h3 className="article-title">
                                    <Link to={`/article?url=${encodeURIComponent(item.link)}`}>{item.title}</Link>
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
