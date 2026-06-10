import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Login() {
  const { signIn, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(form.email, form.password)
    setLoading(false)
    if (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate('/')
    }
  }

  const handleKakao = async () => {
    setError('')
    const { error: err } = await signInWithKakao()
    if (err) setError('카카오 로그인 중 오류가 발생했습니다.')
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">A</span>
          <h1>ARK<span>IT</span></h1>
          <p>계속하려면 로그인하세요</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <FiMail className="auth-field__icon" />
            <input
              name="email"
              type="email"
              placeholder="이메일"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="auth-field">
            <FiLock className="auth-field__icon" />
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            <FiLogIn size={16} />
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="auth-divider"><span>또는</span></div>

        <button className="btn-kakao" onClick={handleKakao}>
          <span className="kakao-icon">K</span>
          카카오로 로그인
        </button>

        <p className="auth-footer">
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  )
}
