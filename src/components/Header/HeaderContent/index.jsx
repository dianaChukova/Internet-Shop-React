import React from 'react';
import '../../../App.css';

function HeaderContent({title, worldCart, activeWord}) {
  return (
    <div className="header-content">
      <div className="header-content-left">
        <div className="vector-object-img">
          <img src="img/vector-object12x12.svg" alt="vector object" />
        </div>
        <div className="content-left">
          <div className="header-title">{title}</div>
          <div className="bread-crumbs">
            <div className="bread-crumbs-contents">
              <div className="bread-crumbs-content">Home</div>
              <div className={`bread-crumbs-content ${activeWord === 'word1' ? 'active' : ''}`}>Shop</div>
              <div className={`bread-crumbs-content ${activeWord === 'word2' ? 'active' : ''}`}>{worldCart}</div>
            </div>
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="header-content-right">
        <div className="header-photo"></div>
      </div>
    </div>
  )
}

export default HeaderContent