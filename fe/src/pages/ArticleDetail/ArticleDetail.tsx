import './ArticleDetail.scss';

function ArticleDetail() {
  // Dữ liệu bài viết
  const category = "Thể thao";
  const title = "Tuyển nữ Việt Nam đại thắng Indonesia 5-0, vào chung kết SEA Games 33";
  const publishDate = "14/12/2024 15:20";
  const author = "Văn Quyết";
  const thumbnail = "https://via.placeholder.com/800x450";
  const sapo = "Tuyển nữ Việt Nam đã có chiến thắng ấn tượng 5-0 trước Indonesia trong trận bán kết bóng đá nữ SEA Games 33, qua đó giành quyền vào chung kết.";

  return (
    <div className="article-detail">
      <div className="article-container">
        
        {/* Đường dẫn */}
        <div className="breadcrumb">
          <a href="/">Trang chủ</a>
          <span className="separator">/</span>
          <a href="#">{category}</a>
          <span className="separator">/</span>
          <span className="current">{title}</span>
        </div>

        {/* Tiêu đề bài viết */}
        <div className="article-header">
          <span className="category-tag">{category}</span>
          <h1 className="article-title">{title}</h1>
          <div className="article-meta">
            <span className="publish-date">📅 {publishDate}</span>
            <span className="author">✍️ {author}</span>
          </div>
        </div>

        {/* Tóm tắt */}
        <div className="article-sapo">
          <p>{sapo}</p>
        </div>

        {/* Ảnh đại diện */}
        <div className="article-thumbnail">
          <img src={thumbnail} alt={title} />
        </div>

      

      </div>
    </div>
  );
}

export default ArticleDetail;
