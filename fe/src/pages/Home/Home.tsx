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
                {/* Trending Topics Section */}
                <div className="trending-topics">
                    <div className="trending-header">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="12" fill="#FFF5EE"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M13.4342 20.0547C14.2298 18.8781 14.3031 17.6074 13.6541 16.2424C13.4736 16.9747 13.1435 17.4191 12.6637 17.5758C13.1093 16.3033 12.737 14.9286 11.5467 13.4515C11.521 14.977 11.1545 16.0883 10.4469 16.7853C9.47224 17.7446 9.48371 18.8272 10.4813 20.0332C6.34011 17.8293 5.75586 14.8736 8.72849 11.166C8.91286 12.0617 9.35964 12.6116 10.0689 12.8157C9.2958 9.53506 10.1092 6.73972 12.5091 4.42969C12.5238 9.55616 14.0959 10.0118 16.0835 12.3002C18.2295 15.0463 16.9683 18.2154 13.4342 20.0547Z" fill="#E32929"/>
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
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <rect x="1.16602" y="1.25781" width="23" height="23" rx="5.5" stroke="#A0A4A8"/>
                                <defs>
                                    <clipPath id="clip0_24530_62949">
                                        <rect x="0.666016" y="0.757812" width="24" height="24" rx="6" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                        <button className="btn-right" aria-label="Scroll right">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_24530_62949)">
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="#333333" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.1661 8.79777L14.4261 12.0578C14.8111 12.4428 14.8111 13.0728 14.4261 13.4578L11.1661 16.7178" stroke="black" strokeOpacity="0.2" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <rect x="1.16602" y="1.25781" width="23" height="23" rx="5.5" stroke="#A0A4A8"/>
                                <defs>
                                    <clipPath id="clip0_24530_62949">
                                        <rect x="0.666016" y="0.757812" width="24" height="24" rx="6" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>            </div>
        </main>
    );
}

export default Home;
