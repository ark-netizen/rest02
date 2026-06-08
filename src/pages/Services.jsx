import { FiMonitor, FiCode, FiGlobe, FiCheckCircle, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './Services.css'

const serviceDetails = [
  {
    id: 'computer',
    icon: <FiMonitor size={32} />,
    color: 'blue',
    title: '컴퓨터 판매',
    subtitle: 'Computer Sales',
    desc: '비즈니스 환경에 최적화된 하드웨어를 제공합니다. 사무용 PC부터 고성능 워크스테이션, 서버 장비까지 전문적인 상담을 통해 최적의 구성을 안내해 드립니다.',
    features: [
      '사무용 데스크탑 & 노트북',
      '맞춤형 조립 PC',
      '서버 & 네트워크 장비',
      '주변기기 & 부품',
      '장비 설치 및 A/S',
      '법인 구매 할인 혜택',
    ],
  },
  {
    id: 'web',
    icon: <FiGlobe size={32} />,
    color: 'green',
    title: '웹 개발',
    subtitle: 'Web Development',
    desc: '최신 웹 기술을 활용하여 비즈니스 목적에 맞는 웹사이트를 제작합니다. 기업 홈페이지, 쇼핑몰, 포트폴리오 등 다양한 형태의 반응형 웹을 구현합니다.',
    features: [
      '기업 홈페이지 제작',
      '쇼핑몰 & 이커머스',
      '랜딩페이지 & 마케팅',
      'React / Next.js 개발',
      '모바일 반응형 필수 적용',
      'SEO 최적화 서비스',
    ],
  },
  {
    id: 'program',
    icon: <FiCode size={32} />,
    color: 'red',
    title: '프로그램 개발',
    subtitle: 'Software Development',
    desc: '기업 맞춤형 소프트웨어로 업무 효율을 극대화합니다. 단순 반복 업무 자동화부터 복잡한 ERP 시스템 개발까지 다양한 솔루션을 제공합니다.',
    features: [
      '업무 자동화 솔루션',
      'ERP / CRM 시스템',
      '데이터 관리 프로그램',
      'API 연동 개발',
      '레거시 시스템 현대화',
      '유지보수 & 운영 지원',
    ],
  },
]

function Services() {
  return (
    <div className="services-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-label">SERVICES</span>
          <h1>전문적인 IT 서비스<br /><span className="gradient-text">하나로 해결</span></h1>
          <p>컴퓨터 판매부터 웹개발, 프로그램 개발까지 IT 전반을 담당합니다.</p>
        </div>
      </section>

      {/* Service Details */}
      <div className="services-detail">
        {serviceDetails.map((svc, i) => (
          <section
            key={svc.id}
            className={`section service-detail-section ${i % 2 === 1 ? 'service-detail-section--alt' : ''}`}
          >
            <div className="container">
              <div className="service-detail-inner">
                <div className="service-detail-text">
                  <span className={`service-badge service-badge--${svc.color}`}>{svc.subtitle}</span>
                  <div className={`service-detail-icon service-detail-icon--${svc.color}`}>{svc.icon}</div>
                  <h2>{svc.title}</h2>
                  <p className="service-detail-desc">{svc.desc}</p>
                  <ul className="service-features">
                    {svc.features.map((f) => (
                      <li key={f}>
                        <FiCheckCircle size={16} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" className={`btn btn-${svc.color === 'blue' ? 'primary' : svc.color}`}>
                    서비스 문의하기 <FiArrowRight size={16} />
                  </Link>
                </div>
                <div className={`service-detail-visual service-detail-visual--${svc.color}`}>
                  <div className="visual-icon-large">{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>전문가와 함께 시작하세요</p>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <span className="section-label">GET STARTED</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>어떤 서비스가 필요하신가요?</h2>
          <div className="divider" />
          <p className="section-desc">원하시는 서비스를 자세히 상담해 드립니다.</p>
          <Link to="/contact" className="btn btn-primary btn-lg" style={{ marginTop: '2rem' }}>
            무료 상담 신청 <FiArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Services
