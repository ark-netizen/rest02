import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import BoardList from './pages/board/BoardList'
import BoardDetail from './pages/board/BoardDetail'
import BoardWrite from './pages/board/BoardWrite'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router basename="/rest02">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 공지사항 */}
              <Route path="/board/notice" element={<BoardList boardType="notice" />} />
              <Route path="/board/notice/:id" element={<BoardDetail boardType="notice" />} />
              <Route path="/board/notice/write" element={
                <ProtectedRoute adminOnly><BoardWrite boardType="notice" /></ProtectedRoute>
              } />

              {/* 자유게시판 */}
              <Route path="/board/free" element={<BoardList boardType="free" />} />
              <Route path="/board/free/:id" element={<BoardDetail boardType="free" />} />
              <Route path="/board/free/write" element={
                <ProtectedRoute><BoardWrite boardType="free" /></ProtectedRoute>
              } />

              {/* Q&A */}
              <Route path="/board/qna" element={<BoardList boardType="qna" />} />
              <Route path="/board/qna/:id" element={<BoardDetail boardType="qna" />} />
              <Route path="/board/qna/write" element={
                <ProtectedRoute><BoardWrite boardType="qna" /></ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
