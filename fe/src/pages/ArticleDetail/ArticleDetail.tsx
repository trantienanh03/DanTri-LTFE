import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import articlesData from '../../assets/dantri.json';
import './ArticleDetail.scss';

function ArticleDetail() {
  // Lấy id từ URL
  const { id } = useParams();
  
  // State để lưu dữ liệu bài viết
  const [article, setArticle] = useState(null as any);
  
  // Lấy dữ liệu bài viết khi component load
  useEffect(() => {
    const articleIndex = parseInt(id || '0');
    if (articleIndex >= 0 && articleIndex < articlesData.length) {
      setArticle(articlesData[articleIndex]);
    }
  }, [id]);
  
  // Nếu chưa có dữ liệu thì hiển thị loading
  if (!article) {
    return <div className="loading">Đang tải bài viết...</div>;
  }

  return (
    <div className="body-container">
      {/* Sidebar với các action buttons */}
      <div className="singular-sidebar">
        <ul className="social-pin">
          <li><button className="cpanel-item facebook" title="Chia sẻ lên Facebook">FB</button></li>
          <li><button className="cpanel-item twitter" title="Chia sẻ lên Twitter">TW</button></li>
          <li><button className="cpanel-item comment" title="Bình luận">💬</button></li>
          <li><button className="cpanel-item save" title="Lưu bài viết">⭐</button></li>
          <li><button className="cpanel-item print" title="In">🖨️</button></li>
        </ul>
      </div>

      {/* Container chính */}
      <div className="grid-container">
        <div className="singular-wrap">
          <article className="singular-container">
            
            {/* Tiêu đề */}
            <h1 className="title-page detail">{article.title}</h1>

            {/* Thông tin tác giả */}
            <div className="author-wrap">
              <div className="author-meta">
                <div className="author-name"><b>{article.author}</b></div>
                <time className="author-time">{article.publishDate}</time>
              </div>
            </div>

            {/* Sapo (tóm tắt) */}
            <h2 className="singular-sapo">{article.sapo}</h2>

            {/* Ảnh đại diện */}
            {article.thumbnailUrl && (
              <figure className="image">
                <img src={article.thumbnailUrl} alt={article.title} />
              </figure>
            )}

            {/* Nội dung bài viết */}
            <div className="singular-content">
              {article.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}

              {/* Hiển thị hình ảnh trong bài */}
              {article.imageUrls && article.imageUrls.map((imageUrl, index) => (
                <figure key={index} className="image">
                  <img src={imageUrl} alt={`Hình ${index + 1}`} />
                </figure>
              ))}
            </div>

            {/* Nguồn */}
            <div className="singular-source">
              Theo <strong>{article.author}</strong>
            </div>

          </article>

          {/* Tin liên quan */}
          <aside className="article-related">
            <div className="title-head">Tin liên quan</div>
            {articlesData.slice(0, 2).map((relatedArticle, index) => (
              <article key={index} className="article-item">
                <div className="article-thumb">
                  <a href={`/article/${index}`}>
                    <img src={relatedArticle.thumbnailUrl} alt={relatedArticle.title} />
                  </a>
                </div>
                <div className="article-content">
                  <h3 className="article-title">
                    <a href={`/article/${index}`}>{relatedArticle.title}</a>
                  </h3>
                  <div className="article-excerpt">
                    <a href={`/article/${index}`}>{relatedArticle.sapo}</a>
                  </div>
                </div>
              </article>
            ))}
          </aside>

          {/* Bình luận */}
          <div className="comment-wrap">
            <div className="comment-head">
              <div className="comment-title">Bình luận (0)</div>
              <div className="comment-action">
                <button className="login">Đăng nhập</button>
                <button className="register">Đăng kí</button>
                <span>để gửi bình luận</span>
              </div>
            </div>
            <div className="comment-box">
              <textarea className="textarea" placeholder="Bạn nghĩ gì về tin này?" readOnly></textarea>
              <div className="action">
                <div className="note">Ý kiến của bạn sẽ được xét duyệt trước khi đăng</div>
                <button className="submit" disabled>Gửi bình luận</button>
              </div>
            </div>
            <div className="comment-empty">
              <span>Hiện chưa có bình luận nào, hãy trở thành người đầu tiên bình luận!</span>
            </div>
          </div>

        </div>

        {/* Sidebar phải */}
        <div className="sidebar">
          <div className="article-lot">
            <div className="article-head">Đọc nhiều trong {article.categoryName}</div>
            {articlesData.slice(0, 5).map((item, index) => (
              <article key={index} className="article-item">
                <div className="article-thumb">
                  <a href={`/article/${index}`}>
                    <img src={item.thumbnailUrl} alt={item.title} width="120" height="80" />
                  </a>
                </div>
                <h3 className="article-title">
                  <a href={`/article/${index}`}>{item.title}</a>
                </h3>
              </article>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArticleDetail;
