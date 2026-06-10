import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiUserPlus } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Login.css'

export default function Register() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }
    if (form.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    setLoading(true)
    const { error: err } = await signUp(form.email, form.password, form.username)
    setLoading(false)
    if (err) {
      setError(err.message === 'User already registered' ? '이미 등록된 이메일입니다.' : '회원가입 중 오류가 발생했습니다.')
    } else {
      setSuccess('가입 확인 이메일을 발송했습니다. 이메일을 확인해 주세요.')
      setTimeout(() => navigate('/login'), 3000)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">A</span>
          <h1>ARK<span>IT</span></h1>
          <p>새 계정을 만드세요</p>
        </div>

        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <FiUser className="auth-field__icon" />
            <input
              name="username"
              type="text"
              placeholder="닉네임"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>
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
              placeholder="비밀번호 (6자 이상)"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="auth-field">
            <FiLock className="auth-field__icon" />
            <input
              name="confirm"
              type="password"
              placeholder="비밀번호 확인"
              required
              value={form.confirm}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            <FiUserPlus size={16} />
            {loading ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p className="auth-footer">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  )
}
