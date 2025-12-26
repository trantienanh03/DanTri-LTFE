import React from 'react';
import { Link } from 'react-router-dom';
import './RecentlyViewed.scss';

const RecentlyViewed: React.FC = () => {

  return (
    <div className="recently-viewed-container">
      <h1 className="recently-viewed-title">Tin đã xem</h1>
      
      <div className="empty-recently-viewed">
        Chưa có tin đã xem, cùng khám phá các nội dung của Dân trí tại <Link to="/" className="home-link">trang chủ</Link> ngay!
      </div>
    </div>
  );
};

export default RecentlyViewed;
