import './SocialSidebar.scss';

interface SocialSidebarProps {
  articleUrl: string;
  articleId?: string;
}

const SocialSidebar = ({ articleUrl, articleId = '' }: SocialSidebarProps) => {
  const fullUrl = `https://dantri.com.vn${articleUrl}`;
  const encodedUrl = encodeURIComponent(fullUrl);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    alert('Đã sao chép liên kết!');
  };

  const handleComment = () => {
    const commentSection = document.querySelector('.article-comments');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveArticle = () => {
    // Logic to save article
    console.log('Lưu bài viết');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="singular-sidebar side-bar-height">
      <ul className="cpanel-action social-pin">
        <li>
          <a
            className="cpanel-item facebook"
            target="_blank"
            rel="nofollow noreferrer"
            href={`https://www.facebook.com/sharer.php?u=${encodedUrl}`}
            title="Chia sẻ bài viết lên facebook"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M16.5 13.04v2.32h2.34c.18 0 .27.16.27.32l-.36 1.52c0 .08-.18.16-.27.16H16.5v5.84h-2.7v-5.76h-1.53c-.18 0-.27-.08-.27-.24v-1.52c0-.16.09-.24.27-.24h1.53V12.8c0-1.36 1.17-2.4 2.7-2.4h2.43c.18 0 .27.08.27.24v1.92c0 .16-.09.24-.27.24h-2.16c-.18 0-.27.08-.27.24Z" fill="#000"></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            className="cpanel-item twitter"
            href={`https://twitter.com/intent/tweet?text=${encodedUrl}`}
            target="_blank"
            rel="nofollow noreferrer"
            title="Chia sẻ bài viết lên twitter"
          >
            <svg width="32" height="33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="1.1" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="1.1" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M17.332 15.428 22.544 9.5h-1.235l-4.526 5.147L13.17 9.5H9l5.466 7.784L9 23.5h1.235l4.78-5.436L18.83 23.5H23l-5.668-8.072ZM10.68 10.41h1.897l8.732 12.222h-1.897L10.68 10.41Z" fill="#000" stroke="#000" strokeWidth="0.5"></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            className="cpanel-item linkedin"
            target="_blank"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            rel="nofollow noreferrer"
            title="Chia sẻ bài viết lên linkedin"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <g clipPath="url(#IconLinkedin_svg__a)">
                <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7ZM12.7 21.6h-2.3V14h2.4v7.6h-.1ZM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4Zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1Z" fill="#000"></path>
              </g>
              <defs>
                <clipPath id="IconLinkedin_svg__a">
                  <path fill="#fff" transform="translate(8 8)" d="M0 0h16v16H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </a>
        </li>
        <li>
          <button
            type="button"
            className="cpanel-item link"
            onClick={handleCopyLink}
            title="Copy"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="m14.848 19.537-1.59 1.59a1.686 1.686 0 1 1-2.386-2.385l3.18-3.18a1.686 1.686 0 0 1 2.386 0 .562.562 0 0 0 .795-.795 2.81 2.81 0 0 0-3.975 0l-3.18 3.18a2.81 2.81 0 1 0 3.975 3.975l1.59-1.59a.562.562 0 0 0-.795-.795Z" fill="#333"></path>
              <path d="M21.925 10.076a2.811 2.811 0 0 0-3.976 0l-1.907 1.908a.562.562 0 0 0 .795.795l1.907-1.908a1.687 1.687 0 0 1 2.386 2.385l-3.498 3.498a1.686 1.686 0 0 1-2.385 0 .562.562 0 0 0-.795.795 2.81 2.81 0 0 0 3.975 0l3.498-3.498a2.81 2.81 0 0 0 0-3.975Z" fill="#333"></path>
            </svg>
          </button>
        </li>
        <li className="line">
          <button
            type="button"
            className="cpanel-item comment"
            onClick={handleComment}
            title="Bình luận"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M13.334 21.333h.333c.556 0 1 0 1.667.667.44.587 1.16.587 1.6 0 .48-.8 1.067-.667 1.733-.667 2.667 0 4-1.333 4-4V14c0-2.667-1.333-4-4-4h-5.333c-2.667 0-4 1.333-4 4v3.333c0 3.334 1.333 4 4 4Z" stroke="#000" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12.666 14h6.667m-6.667 3.333h4" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </li>
        <li className="save">
          <button
            className="cpanel-item save-btn"
            onClick={handleSaveArticle}
            title="Lưu bài viết"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M16 9v8.5l2.5-2m-2.5 2-2.5-2" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M9 16v3c0 2 1 3 3 3h8c2 0 3-1 3-3v-3" stroke="#000" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </li>
        <li>
          <a
            rel="nofollow"
            href="#"
            className="cpanel-item print"
            onClick={(e) => { e.preventDefault(); handlePrint(); }}
            title="In"
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M12.834 12.666h6.333v-1.333c0-1.333-.5-2-2-2h-2.333c-1.5 0-2 .667-2 2v1.333ZM22 14.667V18c0 1.334-.667 2-2 2v-1.6h-8V20c-1.333 0-2-.666-2-2v-3.333c0-1.333.667-2 2-2h8c1.333 0 2 .667 2 2ZM20 18.4h-8m.666-3.067h2" stroke="#000" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M20 18.4v2.286c0 1.143-1 1.714-3 1.714h-2c-2 0-3-.571-3-1.714V18.4h8Z" stroke="#000" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </a>
        </li>
        <li>
          <button
            className="cpanel-item back"
            onClick={handleBack}
          >
            <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" fill="#fff"></rect>
              <rect x="0.6" y="0.6" width="30.8" height="30.8" rx="15.4" stroke="#E3E6E8" strokeWidth="1.2"></rect>
              <path d="M14.38 11.953 10.335 16l4.047 4.047M21.667 16h-11.22" stroke="#292D32" strokeWidth="1.2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SocialSidebar;
