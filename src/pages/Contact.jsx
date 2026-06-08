import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi'
import './Contact.css'

const contactInfo = [
  { icon: <FiPhone size={20} />, title: '전화 문의', value: '010-0000-0000', sub: '평일 09:00 - 18:00' },
  { icon: <FiMail size={20} />, title: '이메일 문의', value: 'contact@arkit.co.kr', sub: '24시간 접수 가능' },
  { icon: <FiMapPin size={20} />, title: '위치', value: '대한민국', sub: '원격 서비스 가능' },
]

const serviceOptions = ['컴퓨터 판매', '웹 개발', '프로그램 개발', '기타 IT 문의']

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container">
          <span className="section-label">CONTACT</span>
          <h1>언제든지<br /><span className="gradient-text">문의하세요</span></h1>
          <p>IT 프로젝트에 대한 무료 상담을 제공합니다.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <h2>연락처 정보</h2>
              <p>아래 정보로 직접 연락하시거나, 우측 폼을 통해 문의를 남겨주세요.</p>
              <div className="contact-cards">
                {contactInfo.map((c) => (
                  <div key={c.title} className="contact-card">
                    <div className="contact-card__icon">{c.icon}</div>
                    <div>
                      <h4>{c.title}</h4>
                      <p className="contact-card__value">{c.value}</p>
                      <p className="contact-card__sub">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="contact-success">
                  <div className="success-icon"><FiCheckCircle size={40} /></div>
                  <h3>문의가 접수되었습니다!</h3>
                  <p>빠른 시일 내에 연락드리겠습니다. 감사합니다.</p>
                  <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }) }}>
                    새 문의하기
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3>문의 남기기</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">이름 *</label>
                      <input id="name" name="name" type="text" placeholder="홍길동" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">연락처</label>
                      <input id="phone" name="phone" type="tel" placeholder="010-0000-0000" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">이메일 *</label>
                    <input id="email" name="email" type="email" placeholder="example@email.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service">문의 서비스</label>
                    <select id="service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">서비스를 선택해주세요</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">문의 내용 *</label>
                    <textarea id="message" name="message" rows={5} placeholder="문의 내용을 입력해주세요..." required value={form.message} onChange={handleChange} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    문의 보내기 <FiSend size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
