import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme, COLOR_THEMES } from '../../context/ThemeContext'
import './ThemeToggle.css'

function ThemeToggle() {
  const { isDark, setIsDark, colorTheme, setColorTheme } = useTheme()

  return (
    <div className="theme-controls">
      {/* 컬러 테마 스와치 */}
      <div className="color-swatches">
        {COLOR_THEMES.map(theme => (
          <button
            key={theme.id}
            className={`swatch ${colorTheme === theme.id ? 'swatch--active' : ''}`}
            style={{ '--swatch-color': theme.color }}
            onClick={() => setColorTheme(theme.id)}
            aria-label={`${theme.label} 테마`}
            title={theme.label}
          />
        ))}
      </div>

      {/* 구분선 */}
      <span className="theme-sep" />

      {/* 다크/라이트 토글 */}
      <button
        className="mode-toggle"
        onClick={() => setIsDark(!isDark)}
        aria-label={isDark ? '라이트 모드' : '다크 모드'}
        title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      >
        <span className={`mode-icon ${!isDark ? 'mode-icon--visible' : ''}`}>
          <FiSun size={16} />
        </span>
        <span className={`mode-icon ${isDark ? 'mode-icon--visible' : ''}`}>
          <FiMoon size={16} />
        </span>
      </button>
    </div>
  )
}

export default ThemeToggle
