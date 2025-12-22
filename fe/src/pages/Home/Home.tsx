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
                                    <img src={firstNews.imageUrl} alt="thumbnail" />
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
                                        <img src={item.imageUrl} alt="sub" />
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
                                        <img src={item.imageUrl} alt="thumb" width="120" height="80" />
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
                                        <img src={item.imageUrl} alt={item.title} width="234" height="156" />
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
                                        <img src={item.imageUrl} alt={item.title} width="150" height="100" />
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
                                                <img src={item.imageUrl} alt={item.title} width="80" height="60" />
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
            </div>
        </main>
    );
}

export default Home;
