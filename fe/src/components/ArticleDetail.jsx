import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ArticleDetail.css'; // Optional: for custom styling if needed

const ArticleDetail = ({ url, onBack }) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const fetchArticle = async () => {
            setLoading(true);
            setError(null);
            try {
                // Goi API Backend
                const response = await axios.get(`http://localhost:8080/api/article?url=${encodeURIComponent(url)}`);
                setArticle(response.data);
            } catch (err) {
                console.error("Lỗi khi tải bài báo:", err);
                setError("Không thể tải bài báo. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [url]);

    if (loading) {
        return (
            <div className="article-loading">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu từ Dân Trí...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="article-error">
                <p>{error}</p>
                <button onClick={onBack}>Quay lại</button>
            </div>
        );
    }

    if (!article) return null;

    return (
        <div className="article-detail-container">
            <button className="back-button" onClick={onBack}>&larr; Quay lại danh sách</button>

            <h1 className="article-title">{article.title}</h1>
            <h2 className="article-sapo">{article.sapo}</h2>

            <div className="article-body">
                {article.body.map((item, index) => {
                    if (item.type === 'image') {
                        return (
                            <figure key={index} className="article-image">
                                <img src={item.content} alt="Article content" />
                            </figure>
                        );
                    } else {
                        return (
                            <p key={index} className="article-text">{item.content}</p>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default ArticleDetail;
