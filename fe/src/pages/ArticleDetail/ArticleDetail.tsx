import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ArticleDetail.scss';

// Define types for Article
interface BodyContent {
  type: 'text' | 'image';
  content: string;
}

interface Article {
  title: string;
  sapo: string;
  body: BodyContent[];
}

const ArticleDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const url = searchParams.get('url');

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError("Không tìm thấy đường dẫn bài báo.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        // Backend API chạy ở port 8080
        const response = await axios.get(`http://localhost:8080/api/article?url=${encodeURIComponent(url)}`);
        setArticle(response.data);
      } catch (err: any) {
        console.error("Lỗi khi tải bài báo:", err);
        setError("Có lỗi xảy ra khi tải bài báo. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [url]);

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  if (loading) {
    return (
      <div className="article-loading">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-error">
        <p>{error}</p>
        <button onClick={handleBack} className="back-button">Quay lại</button>
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="article-detail-container">
      {/* Custom Back Button */}
      <button className="back-button" onClick={handleBack}>
        Quay lại
      </button>

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
