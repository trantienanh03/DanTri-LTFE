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
  {/* Nội dung bài viết */}
        <div className="article-content">
          <p className="content-paragraph">
            Tối 14/12, trên sân vận động Quốc gia Việt Lào, tuyển nữ Việt Nam đã có màn trình diễn áp đảo trước Indonesia với chiến thắng 5-0 trong trận bán kết bóng đá nữ SEA Games 33.
          </p>

          <figure className="content-image">
            <img src="https://via.placeholder.com/800x450" alt="Tuyển nữ Việt Nam" />
            <figcaption>Tuyển nữ Việt Nam ăn mừng bàn thắng vào lưới Indonesia</figcaption>
          </figure>

          <p className="content-paragraph">
            Ngay từ những phút đầu, tuyển nữ Việt Nam đã chủ động tấn công và tạo ra nhiều cơ hội nguy hiểm. Phút thứ 15, tiền đạo Huỳnh Như đã mở tỷ số cho đội bóng của HLV Mai Đức Chung sau pha dứt điểm chính xác.
          </p>

          <p className="content-paragraph">
            Hiệp 2, các cô gái vàng tiếp tục chơi tấn công và ghi thêm 4 bàn nữa. Đặc biệt, tiền đạo Phạm Hải Yến đã có cú đúp ấn tượng ở phút 52 và 68.
          </p>

          <blockquote className="content-quote">
            "Chúng tôi đã chuẩn bị rất kỹ cho trận đấu này. Các cô gái đã thể hiện tinh thần thi đấu tốt và quyết tâm cao để giành chiến thắng" - HLV Mai Đức Chung chia sẻ sau trận.
          </blockquote>

          <p className="content-paragraph">
            Với chiến thắng này, tuyển nữ Việt Nam chính thức giành vé vào trận chung kết SEA Games 33. Họ sẽ gặp đội chiến thắng trong trận bán kết giữa Thái Lan và Myanmar.
          </p>
        </div>


      

      </div>
    </div>
  );
}

export default ArticleDetail;
