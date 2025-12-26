import React from 'react';
import { Link } from 'react-router-dom';
import './SavedNews.scss';

const SavedNews: React.FC = () => {

  return (
    <div className="saved-news-container">
      <h1 className="saved-news-title">Tin đã lưu</h1>
      
      <div className="empty-saved-news">
        Chưa có tin đã lưu, cùng khám phá các nội dung của Dân trí tại <Link to="/" className="home-link">trang chủ</Link> ngay!
      </div>
    </div>
  );
};

export default SavedNews;
