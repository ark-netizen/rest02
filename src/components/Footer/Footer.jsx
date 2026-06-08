import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="logo-icon">A</span>
              <span className="logo-text">ARK<span className="logo-accent">IT</span></span>
            </div>
            <p className="footer__desc">
              컴퓨터 판매부터 웹개발, 프로그램 개발까지.<br />
              IT 모든 분야의 파트너가 되어 드립니다.
            </p>
          </div>

          <div className="footer__links">
            <h4>메뉴</h4>
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/about">회사소개</Link></li>
              <li><Link to="/services">서비스</Link></li>
              <li><Link to="/contact">문의하기</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h4>서비스</h4>
            <ul>
              <li><Link to="/services">컴퓨터 판매</Link></li>
              <li><Link to="/services">웹 개발</Link></li>
              <li><Link to="/services">프로그램 개발</Link></li>
              <li><Link to="/services">IT 컨설팅</Link></li>
            </ul>
          </div>

          <div className="footer__contact">
            <h4>연락처</h4>
            <ul>
              <li>
                <FiPhone size={14} />
                <span>010-0000-0000</span>
              </li>
              <li>
                <FiMail size={14} />
                <span>contact@arkit.co.kr</span>
              </li>
              <li>
                <FiMapPin size={14} />
                <span>대한민국</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2026 ARK IT. All rights reserved. | 사업자등록번호: 000-00-00000
          </p>
          <p className="footer__est">Est. 2026.06.08</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
