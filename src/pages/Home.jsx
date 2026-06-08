import { Link } from 'react-router-dom'
import { FiArrowRight, FiMonitor, FiCode, FiGlobe, FiShield, FiZap, FiUsers } from 'react-icons/fi'
import './Home.css'

const services = [
  {
    icon: <FiMonitor size={28} />,
    title: '컴퓨터 판매',
    desc: '비즈니스 맞춤형 PC, 노트북, 서버 장비 구매 및 설치 서비스를 제공합니다.',
    color: 'blue',
  },
  {
    icon: <FiGlobe size={28} />,
    title: '웹 개발',
    desc: '반응형 웹사이트, 쇼핑몰, 기업 홈페이지 등 최신 기술로 구현합니다.',
    color: 'green',
  },
  {
    icon: <FiCode size={28} />,
    title: '프로그램 개발',
    desc: '업무 자동화, ERP, 맞춤형 소프트웨어로 비즈니스 효율을 높입니다.',
    color: 'red',
  },
]

const stats = [
  { value: '2026', label: '창업 연도' },
  { value: '3+', label: '핵심 서비스' },
  { value: '100%', label: '고객 만족 목표' },
  { value: '24/7', label: '지원 체계' },
]

const features = [
  { icon: <FiZap size={20} />, title: '빠른 납기', desc: '신속한 프로젝트 진행으로 업무 공백을 최소화합니다.' },
  { icon: <FiShield size={20} />, title: '품질 보증', desc: '체계적인 품질 관리로 안정적인 결과물을 제공합니다.' },
  { icon: <FiUsers size={20} />, title: '전문 팀', desc: '분야별 전문가가 최적의 솔루션을 설계합니다.' },
]

function Home() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__gradient" />
          <div className="hero__grid" />
        </div>
        <div className="container hero__content">
          <div className="hero__badge">
            <span className="badge-dot" />
            2026년 6월 개업 · IT 전문기업
          </div>
          <h1 className="hero__title">
            당신의 비즈니스를<br />
            <span className="gradient-text">IT로 완성하다</span>
          </h1>
          <p className="hero__desc">
            컴퓨터 판매부터 웹개발, 프로그램 개발까지<br />
            IT 전반의 파트너가 되어 드립니다.
          </p>
          <div className="hero__actions">
            <Link to="/services" className="btn btn-primary btn-lg">
              서비스 보기 <FiArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              무료 상담하기
            </Link>
          </div>

          <div className="hero__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">OUR SERVICES</span>
            <h2 className="section-title">핵심 서비스</h2>
            <div className="divider" />
            <p className="section-desc">IT의 모든 영역에서 전문적인 서비스를 제공합니다.</p>
          </div>
          <div className="services-grid">
            {services.map((svc) => (
              <div key={svc.title} className={`service-card service-card--${svc.color}`}>
                <div className="service-card__icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to="/services" className="service-card__link">
                  자세히 보기 <FiArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section why-section">
        <div className="container">
          <div className="why-inner">
            <div className="why-text">
              <span className="section-label">WHY ARKIT</span>
              <h2 className="section-title">왜 ARK IT인가요?</h2>
              <div className="divider" style={{ margin: '1rem 0' }} />
              <p style={{ marginBottom: '2rem' }}>
                고객의 비즈니스 성장을 최우선으로 생각하며,
                맞춤형 IT 솔루션으로 최고의 결과를 만들어냅니다.
              </p>
              <div className="features-list">
                {features.map((f) => (
                  <div key={f.title} className="feature-item">
                    <div className="feature-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                회사 소개 보기 <FiArrowRight size={16} />
              </Link>
            </div>
            <div className="why-visual">
              <div className="visual-card visual-card--main">
                <div className="visual-icon"><FiCode size={36} /></div>
                <h3>풀스택 개발</h3>
                <p>프론트엔드부터 백엔드까지</p>
              </div>
              <div className="visual-card visual-card--accent-green">
                <div className="visual-icon"><FiMonitor size={28} /></div>
                <h3>하드웨어</h3>
                <p>맞춤 PC 구성</p>
              </div>
              <div className="visual-card visual-card--accent-red">
                <div className="visual-icon"><FiGlobe size={28} /></div>
                <h3>웹 솔루션</h3>
                <p>반응형 웹 개발</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <h2>지금 바로 시작하세요</h2>
            <p>IT 프로젝트에 대한 무료 상담을 제공합니다. 전문가와 함께 최적의 솔루션을 찾아보세요.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              무료 상담 신청 <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
