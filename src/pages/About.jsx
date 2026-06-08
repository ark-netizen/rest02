import { FiTarget, FiEye, FiAward, FiCalendar } from 'react-icons/fi'
import './About.css'

const values = [
  { icon: <FiTarget size={24} />, title: '고객 중심', desc: '고객의 성공이 곧 우리의 성공입니다. 모든 프로젝트에서 고객의 요구사항을 최우선으로 반영합니다.' },
  { icon: <FiEye size={24} />, title: '기술 혁신', desc: '최신 기술 트렌드를 지속적으로 학습하고 적용하여 최고의 솔루션을 제공합니다.' },
  { icon: <FiAward size={24} />, title: '품질 추구', desc: '타협 없는 품질 관리로 안정적이고 신뢰할 수 있는 제품을 만들어 냅니다.' },
]

const history = [
  { date: '2026.06.08', title: '회사 창립', desc: 'ARK IT 공식 창립. IT 전문 서비스 기업으로 출발.' },
  { date: '2026.06', title: '서비스 런칭', desc: '컴퓨터 판매, 웹개발, 프로그램 개발 서비스 정식 론칭.' },
  { date: '2026.07', title: '첫 프로젝트', desc: '첫 번째 고객사 프로젝트 성공적으로 납품 예정.' },
]

function About() {
  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-label">ABOUT US</span>
          <h1>IT와 비즈니스의<br /><span className="gradient-text">새로운 연결</span></h1>
          <p>2026년 창립한 ARK IT는 컴퓨터 판매, 웹개발, 프로그램 개발을 통해<br />고객의 디지털 전환을 돕는 IT 전문 기업입니다.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card mission-card--blue">
              <h3>미션</h3>
              <p>IT 기술로 모든 비즈니스가 더 스마트하게 성장할 수 있도록 최적의 솔루션을 제공합니다.</p>
            </div>
            <div className="mission-card mission-card--green">
              <h3>비전</h3>
              <p>고객이 가장 먼저 떠올리는 IT 파트너가 되어, 함께 성장하는 미래를 만들어 나갑니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">CORE VALUES</span>
            <h2 className="section-title">핵심 가치</h2>
            <div className="divider" />
          </div>
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="card value-card">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HISTORY</span>
            <h2 className="section-title">회사 연혁</h2>
            <div className="divider" />
          </div>
          <div className="timeline">
            {history.map((item, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
                <div className="timeline-content">
                  <span className="timeline-date"><FiCalendar size={14} /> {item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
