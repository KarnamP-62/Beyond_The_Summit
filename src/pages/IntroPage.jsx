import everestMapImg from '../assets/Mteverestmap.svg'
import { useData } from '../data/DataContext'

function IntroPage() {
  const { data, loading } = useData()

  // Calculate Nepal and China expeditions
  const nepalExpeditions = data?.hostCountryData?.nepal?.reduce((a, b) => a + b, 0) || 0
  const chinaExpeditions = data?.hostCountryData?.china?.reduce((a, b) => a + b, 0) || 0
  const totalExpeditions = nepalExpeditions + chinaExpeditions
  const maxExpeditions = Math.max(nepalExpeditions, chinaExpeditions)
  const nepalBarPercent = maxExpeditions > 0 ? (nepalExpeditions / maxExpeditions) * 100 : 0
  const chinaBarPercent = maxExpeditions > 0 ? (chinaExpeditions / maxExpeditions) * 100 : 0
  const nepalTotalPercent = totalExpeditions > 0 ? Math.round((nepalExpeditions / totalExpeditions) * 100) : 0
  const chinaTotalPercent = totalExpeditions > 0 ? Math.round((chinaExpeditions / totalExpeditions) * 100) : 0

  return (
    <div className="intro-page">
      <div className="intro-content">
        <p>Mount Everest is the world's highest mountain, rising 8,848.86 meters above sea level along the Himalayan border between Nepal and China. Named after British surveyor George Everest, the mountain is also known as Chomolungma or Qomolangma by Tibetans and Sherpas, meaning "Goddess Mother of the World," while in Nepal it is called Sagarmatha, often translated as "Goddess of the Sky" or "Head of the Earth Touching the Sky." Over time, Everest has become one of the most iconic and ambitious destinations in mountaineering.</p>

        <p>The first successful ascent is in 1953 by Edmund Hillary and Tenzing Norgay. Supported by Sherpas—highly skilled local guides and mountaineers—and the growth of commercial expedition agencies since the 2000s, Everest expeditions have become increasingly accessible to climbers from around the world. A typical expedition lasts between 49 and 55 days and involves extensive preparation, acclimatization, and logistical planning.</p>

        <p>Yet Everest represents far more than a mountaineering challenge alone. It is a complex human system shaped by risk, survival, economics, climate, geopolitics, infrastructure, and environmental change. Modern expeditions are often conducted in guided groups led by experienced climbers, agencies, and Sherpa teams who play a vital role in navigation, safety, and summit success.</p>

        <p>This project explores the history of Everest expeditions, major climbing routes, demographics of climbers, the physiological effects of extreme altitude on the human body, accident and fatality patterns, and the broader statistics surrounding expedition success, deaths, and terminations.</p>
      </div>

      <div className="intro-title">
        <h1>INTRODUCTION</h1>
        <div className="intro-map-box">
          <img src={everestMapImg} alt="Mount Everest Map" className="intro-map" />
        </div>

        <h3 className="intro-bars-heading">Expedition percentage of both countries</h3>
        <div className="intro-bars">
          <div className="intro-bar nepal" style={{ width: `${nepalBarPercent}%` }} title={`${nepalExpeditions.toLocaleString()} Expeditions`}>
            <span className="intro-bar-label">Nepal ({nepalTotalPercent}%)</span>
          </div>
          <div className="intro-bar china" style={{ width: `${chinaBarPercent}%` }} title={`${chinaExpeditions.toLocaleString()} Expeditions`}>
            <span className="intro-bar-label">China ({chinaTotalPercent}%)</span>
          </div>
        </div>

        <div className="intro-kpis">
          <div className="intro-kpi">
            <span className="intro-kpi-value">13,742</span>
            <span className="intro-kpi-label">Total Summits</span>
          </div>
          <div className="intro-kpi">
            <span className="intro-kpi-value">~7,563</span>
            <span className="intro-kpi-label">Individuals</span>
          </div>
          <div className="intro-kpi">
            <span className="intro-kpi-value">1921</span>
            <span className="intro-kpi-label">First Summit Trial</span>
          </div>
          <div className="intro-kpi">
            <span className="intro-kpi-value">1953</span>
            <span className="intro-kpi-label">First Successful Summit</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroPage
