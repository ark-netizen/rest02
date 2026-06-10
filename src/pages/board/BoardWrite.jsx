import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { FiArrowLeft, FiSend, FiLock } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { BOARD_CONFIG } from './boardConfig'
import './Board.css'

export default function BoardWrite({ boardType }) {
  const config = BOARD_CONFIG[boardType]
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('edit')

  const [form, setForm] = useState({
    title: '',
    content: '',
    is_pinned: false,
    is_private: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editId) fetchEditPost()
  }, [editId])

  async function fetchEditPost() {
    const { data } = await supabase.from(config.table).select('*').eq('id', editId).single()
    if (data) setForm({ title: data.title, content: data.content, is_pinned: data.is_pinned ?? false, is_private: data.is_private ?? false })
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      title: form.title,
      content: form.content,
      ...(boardType === 'notice' && { is_pinned: form.is_pinned }),
      ...(config.hasPrivate && { is_private: form.is_private }),
    }

    let error
    if (editId) {
      const res = await supabase.from(config.table).update(payload).eq('id', editId)
      error = res.error
    } else {
      const res = await supabase.from(config.table).insert({ ...payload, author_id: user.id })
      error = res.error
    }

    setLoading(false)
    if (error) {
      setError('저장 중 오류가 발생했습니다. 다시 시도해주세요.')
    } else {
      navigate(`/board/${boardType}`)
    }
  }

  return (
    <div className="board-page">
      <section className="section" style={{ paddingTop: '7rem' }}>
        <div className="container board-container">
          <div className="detail-back">
            <Link to={`/board/${boardType}`} className="btn-back">
              <FiArrowLeft size={16} /> {config.label} 목록
            </Link>
          </div>

          <div className="write-card">
            <h2 className="write-title">{editId ? '글 수정' : '새 글 작성'}</h2>

            {error && <div className="auth-error">{error}</div>}

            <form className="write-form" onSubmit={handleSubmit}>
              <div className="write-field">
                <label htmlFor="write-title">제목 *</label>
                <input
                  id="write-title"
                  name="title"
                  type="text"
                  placeholder="제목을 입력하세요"
                  required
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="write-field">
                <label htmlFor="write-content">내용 *</label>
                <textarea
                  id="write-content"
                  name="content"
                  rows={12}
                  placeholder="내용을 입력하세요"
                  required
                  value={form.content}
                  onChange={handleChange}
                />
              </div>

              <div className="write-options">
                {boardType === 'notice' && profile?.is_admin && (
                  <label className="write-checkbox">
                    <input type="checkbox" name="is_pinned" checked={form.is_pinned} onChange={handleChange} />
                    상단 고정
                  </label>
                )}
                {config.hasPrivate && (
                  <label className="write-checkbox">
                    <FiLock size={14} />
                    <input type="checkbox" name="is_private" checked={form.is_private} onChange={handleChange} />
                    비공개 글
                  </label>
                )}
              </div>

              <div className="write-submit-row">
                <button type="button" className="btn btn-outline" onClick={() => navigate(`/board/${boardType}`)}>
                  취소
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <FiSend size={15} />
                  {loading ? '저장 중...' : editId ? '수정 완료' : '글 등록'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
