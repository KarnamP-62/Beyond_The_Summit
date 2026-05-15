import { useState } from 'react'
import TitlePage from './pages/TitlePage'
import IntroPage from './pages/IntroPage'
import TimelinePage from './pages/TimelinePage'
import RoutesPage from './pages/RoutesPage'
import DescentPage from './pages/DescentPage'
import DemographicsPage from './pages/DemographicsPage'
import AltitudePage from './pages/AltitudePage'
import AccidentsPage from './pages/AccidentsPage'
import ConclusionPage from './pages/ConclusionPage'

const tabs = [
  { id: 'title', label: 'Home' },
  { id: 'intro', label: 'Introduction' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'routes', label: 'Routes' },
  { id: 'descent', label: 'Descent' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'altitude', label: 'Altitude Effects' },
  { id: 'accidents', label: 'Accidents' },
  { id: 'conclusion', label: 'Conclusion' }
]

function App() {
  const [activeTab, setActiveTab] = useState('title')

  const renderPage = () => {
    switch (activeTab) {
      case 'title': return <TitlePage />
      case 'intro': return <IntroPage />
      case 'timeline': return <TimelinePage />
      case 'routes': return <RoutesPage />
      case 'descent': return <DescentPage />
      case 'demographics': return <DemographicsPage />
      case 'altitude': return <AltitudePage />
      case 'accidents': return <AccidentsPage />
      case 'conclusion': return <ConclusionPage />
      default: return <TitlePage />
    }
  }

  return (
    <>
      <nav className="nav-container">
        <div className="nav-header">
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className={`tab-content active ${activeTab === 'title' ? 'title-tab' : ''} ${activeTab === 'intro' ? 'intro-tab' : ''} ${activeTab === 'timeline' ? 'timeline-tab' : ''} ${activeTab === 'routes' ? 'routes-tab' : ''} ${activeTab === 'descent' ? 'descent-tab' : ''} ${activeTab === 'demographics' ? 'demographics-tab' : ''} ${activeTab === 'accidents' ? 'accidents-tab' : ''} ${activeTab === 'conclusion' ? 'conclusion-tab' : ''}`}>
          {renderPage()}
        </div>
      </main>
    </>
  )
}

export default App
