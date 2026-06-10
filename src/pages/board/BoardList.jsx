import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEdit, FiEye, FiLock, FiSearch, FiBell, FiMessageSquare, FiHelpCircle } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import { BOARD_CONFIG, canWrite, formatDate } from './boardConfig'
import './Board.css'

const ICONS = {
  notice: <FiBell size={20} />,
  free: <FiMessageSquare size={20} />,
  qna: <FiHelpCircle size={20} />,
}

const PAGE_SIZE = 15

export default function BoardList({ boardType }) {
  const config = BOARD_CONFIG[boardType]
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [boardType, page, query])

  async function fetchPosts() {
    setLoading(true)
    let q = supabase
      .from(config.table)
      .select('id, title, author_id, created_at, views, is_pinned, is_private, profiles(username)', { count: 'exact' })
      .order('is_pinned', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (query) q = q.ilike('title', `%${query}%`)

    const { data, count, error } = await q
    if (!error) {
      setPosts(data ?? [])
      setTotal(count ?? 0)
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="board-page">
      <section className="board-hero">
        <div className="container">
          <span className="board-hero__icon">{ICONS[boardType]}</span>
          <h1>{config.label}</h1>
          <p>{config.desc}</p>
        </div>
      </section>

      <section className="section">
        <div className="container board-container">
          <div className="board-toolbar">
            <form className="board-search" onSubmit={(e) => { e.preventDefault(); setQuery(search); setPage(0) }}>
              <FiSearch className="board-search__icon" />
              <input
                placeholder="제목으로 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">검색</button>
            </form>
            {canWrite(boardType, user, profile) && (
              <button className="btn btn-primary board-write-btn" onClick={() => navigate(`/board/${boardType}/write`)}>
                <FiEdit size={15} /> 글쓰기
              </button>
            )}
          </div>

          <div className="board-table-wrap">
            <table className="board-table">
              <thead>
                <tr>
                  <th className="col-num">번호</th>
                  <th className="col-title">제목</th>
                  <th className="col-author">작성자</th>
                  <th className="col-date">날짜</th>
                  <th className="col-views">조회</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="board-empty">불러오는 중...</td></tr>
                ) : posts.length === 0 ? (
                  <tr><td colSpan={5} className="board-empty">{config.emptyText}</td></tr>
                ) : posts.map((post, idx) => (
                  <tr key={post.id} className={post.is_pinned ? 'row-pinned' : ''}>
                    <td className="col-num">
                      {post.is_pinned ? <span className="badge-notice">공지</span> : total - page * PAGE_SIZE - idx}
                    </td>
                    <td className="col-title">
                      <Link to={`/board/${boardType}/${post.id}`} className="board-title-link">
                        {post.is_private && <FiLock size={13} className="icon-private" />}
                        {post.title}
                      </Link>
                    </td>
                    <td className="col-author">{post.profiles?.username ?? '익명'}</td>
                    <td className="col-date">{formatDate(post.created_at)}</td>
                    <td className="col-views"><FiEye size={13} /> {post.views ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="board-pagination">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>이전</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={i === page ? 'active' : ''} onClick={() => setPage(i)}>
                  {i + 1}
                </button>
              ))}
              <button disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>다음</button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
