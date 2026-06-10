import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiEdit2, FiTrash2, FiEye, FiLock, FiCheckCircle } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { BOARD_CONFIG, canEditDelete, formatDate } from './boardConfig'
import './Board.css'

export default function BoardDetail({ boardType }) {
  const config = BOARD_CONFIG[boardType]
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const [post, setPost] = useState(null)
  const [answer, setAnswer] = useState('')
  const [submittingAnswer, setSubmittingAnswer] = useState(false)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [id, boardType])

  async function fetchPost() {
    setLoading(true)
    const { data, error } = await supabase
      .from(config.table)
      .select('*, profiles(username)')
      .eq('id', id)
      .single()

    if (error || !data) {
      setNotFound(true)
    } else {
      setPost(data)
      setAnswer(data.answer ?? '')
      // increment views
      await supabase.rpc('increment_post_views', { p_table: config.table, p_id: Number(id) })
    }
    setLoading(false)
  }

  async function handleDelete() {
    if (!confirm('정말 삭제하시겠습니까?')) return
    const { error } = await supabase.from(config.table).delete().eq('id', id)
    if (!error) navigate(`/board/${boardType}`)
  }

  async function handleAnswerSubmit(e) {
    e.preventDefault()
    setSubmittingAnswer(true)
    const { error } = await supabase
      .from(config.table)
      .update({
        answer,
        answered_by: user.id,
        answered_at: new Date().toISOString(),
      })
      .eq('id', id)
    setSubmittingAnswer(false)
    if (!error) {
      setPost(prev => ({ ...prev, answer, answered_at: new Date().toISOString() }))
    }
  }

  if (loading) return <div className="page-loading">불러오는 중...</div>
  if (notFound) return (
    <div className="board-page">
      <div className="container" style={{ paddingTop: '6rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>게시글을 찾을 수 없습니다.</p>
        <Link to={`/board/${boardType}`} className="btn btn-primary">목록으로</Link>
      </div>
    </div>
  )

  const isPrivate = post.is_private
  const canSeeContent = !isPrivate || user?.id === post.author_id || profile?.is_admin

  return (
    <div className="board-page">
      <section className="section" style={{ paddingTop: '7rem' }}>
        <div className="container board-container">
          <div className="detail-back">
            <Link to={`/board/${boardType}`} className="btn-back">
              <FiArrowLeft size={16} /> {config.label} 목록
            </Link>
          </div>

          <article className="detail-card">
            <div className="detail-header">
              {post.is_pinned && <span className="badge-notice">공지</span>}
              {isPrivate && <span className="badge-private"><FiLock size={12} /> 비공개</span>}
              <h1 className="detail-title">{post.title}</h1>
              <div className="detail-meta">
                <span>{post.profiles?.username ?? '익명'}</span>
                <span>{formatDate(post.created_at)}</span>
                <span><FiEye size={13} /> {(post.views ?? 0) + 1}</span>
              </div>
            </div>

            <div className="detail-body">
              {canSeeContent ? (
                <p className="detail-content">{post.content}</p>
              ) : (
                <div className="detail-private-msg">
                  <FiLock size={24} />
                  <p>비공개 글입니다. 작성자와 관리자만 볼 수 있습니다.</p>
                </div>
              )}
            </div>

            {canEditDelete(post, user, profile) && (
              <div className="detail-actions">
                <button className="btn btn-sm btn-outline" onClick={() => navigate(`/board/${boardType}/write?edit=${id}`)}>
                  <FiEdit2 size={14} /> 수정
                </button>
                <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                  <FiTrash2 size={14} /> 삭제
                </button>
              </div>
            )}
          </article>

          {/* Q&A Answer Section */}
          {config.hasAnswer && (
            <div className="answer-section">
              {post.answer ? (
                <div className="answer-card">
                  <div className="answer-header">
                    <FiCheckCircle size={18} className="answer-check" />
                    <span>답변 완료</span>
                    {post.answered_at && <span className="answer-date">{formatDate(post.answered_at)}</span>}
                  </div>
                  <p className="answer-content">{post.answer}</p>
                  {profile?.is_admin && (
                    <form className="answer-form" onSubmit={handleAnswerSubmit}>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        placeholder="답변을 수정하세요..."
                      />
                      <button type="submit" className="btn btn-primary" disabled={submittingAnswer}>
                        {submittingAnswer ? '저장 중...' : '답변 수정'}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                profile?.is_admin ? (
                  <div className="answer-card">
                    <h3 className="answer-header-title">답변 작성</h3>
                    <form className="answer-form" onSubmit={handleAnswerSubmit}>
                      <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        rows={4}
                        placeholder="답변을 입력하세요..."
                        required
                      />
                      <button type="submit" className="btn btn-primary" disabled={submittingAnswer}>
                        {submittingAnswer ? '저장 중...' : '답변 등록'}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="answer-pending">
                    <p>아직 답변이 등록되지 않았습니다. 빠른 시일 내에 답변드리겠습니다.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
