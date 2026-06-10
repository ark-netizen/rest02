export const BOARD_CONFIG = {
  notice: {
    table: 'notices',
    label: '공지사항',
    desc: '중요한 공지사항을 확인하세요',
    writeRole: 'admin',
    hasAnswer: false,
    hasPrivate: false,
    emptyText: '등록된 공지사항이 없습니다.',
  },
  free: {
    table: 'posts',
    label: '자유게시판',
    desc: '자유롭게 이야기를 나눠보세요',
    writeRole: 'user',
    hasAnswer: false,
    hasPrivate: false,
    emptyText: '첫 번째 글을 작성해보세요!',
  },
  qna: {
    table: 'qna',
    label: 'Q&A',
    desc: '궁금한 점을 자유롭게 질문하세요',
    writeRole: 'user',
    hasAnswer: true,
    hasPrivate: true,
    emptyText: '아직 등록된 질문이 없습니다.',
  },
}

export function canWrite(boardType, user, profile) {
  const config = BOARD_CONFIG[boardType]
  if (!config) return false
  if (config.writeRole === 'admin') return !!profile?.is_admin
  if (config.writeRole === 'user') return !!user
  return false
}

export function canEditDelete(post, user, profile) {
  if (!user) return false
  if (profile?.is_admin) return true
  return post?.author_id === user?.id
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const now = new Date()
  const diff = now - d
  if (diff < 60000) return '방금 전'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`
  return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}
