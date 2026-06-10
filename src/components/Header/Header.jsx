import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiChevronDown, FiBell, FiMessageSquare, FiHelpCircle, FiLogOut, FiUser } from 'react-icons/fi'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { useAuth } from '../../context/AuthContext'
import './Header.css'

const navLinks = [
  { path: '/', label: '홈' },
  { path: '/about', label: '회사소개' },
  { path: '/services', label: '서비스' },
  { path: '/contact', label: '문의하기' },
]

const boardLinks = [
  { path: '/board/notice', label: '공지사항', icon: <FiBell size={15} /> },
  { path: '/board/free', label: '자유게시판', icon: <FiMessageSquare size={15} /> },
  { path: '/board/qna', label: 'Q&A', icon: <FiHelpCircle size={15} /> },
]

function Header() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [boardOpen, setBoardOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const boardRef = useRef(null)
  const userRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClick(e) {
      if (boardRef.current && !boardRef.current.contains(e.target)) setBoardOpen(false)
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUserOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  const closeAll = () => { setMenuOpen(false); setBoardOpen(false); setUserOpen(false) }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={closeAll}>
          <span className="logo-icon">A</span>
          <span className="logo-text">ARK<span className="logo-accent">IT</span></span>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
              onClick={closeAll}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Board Dropdown */}
          <div className="nav-dropdown" ref={boardRef}>
            <button
              className={`nav-link nav-dropdown__btn ${boardLinks.some(b => location.pathname.startsWith(b.path)) ? 'nav-link--active' : ''}`}
              onClick={() => setBoardOpen(v => !v)}
            >
              게시판 <FiChevronDown size={14} className={`dropdown-chevron ${boardOpen ? 'open' : ''}`} />
            </button>
            {boardOpen && (
              <div className="nav-dropdown__menu">
                {boardLinks.map(b => (
                  <Link key={b.path} to={b.path} className="nav-dropdown__item" onClick={closeAll}>
                    {b.icon} {b.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile board links */}
          <div className="mobile-board-links">
            {boardLinks.map(b => (
              <NavLink
                key={b.path}
                to={b.path}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link--active' : ''}`}
                onClick={closeAll}
              >
                {b.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile auth */}
          <div className="mobile-auth">
            {user ? (
              <>
                <span className="mobile-username">{profile?.username ?? user.email}</span>
                <button className="btn btn-sm btn-outline" onClick={handleSignOut}>로그아웃</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-sm btn-primary" onClick={closeAll}>로그인</Link>
            )}
          </div>

          <Link to="/contact" className="btn btn-cyan btn-sm header__cta" onClick={closeAll}>
            견적 문의
          </Link>
        </nav>

        <div className="header__right">
          <ThemeToggle />

          {/* Desktop auth */}
          {user ? (
            <div className="user-menu" ref={userRef}>
              <button className="user-menu__btn" onClick={() => setUserOpen(v => !v)}>
                <span className="user-avatar">{(profile?.username ?? user.email)?.[0]?.toUpperCase()}</span>
                <FiChevronDown size={13} className={`dropdown-chevron ${userOpen ? 'open' : ''}`} />
              </button>
              {userOpen && (
                <div className="user-menu__dropdown">
                  <div className="user-menu__info">
                    <span className="user-menu__name">{profile?.username ?? '사용자'}</span>
                    <span className="user-menu__email">{user.email}</span>
                    {profile?.is_admin && <span className="user-menu__badge">관리자</span>}
                  </div>
                  <button className="user-menu__item" onClick={handleSignOut}>
                    <FiLogOut size={14} /> 로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary header-login-btn">
              <FiUser size={14} /> 로그인
            </Link>
          )}

          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
