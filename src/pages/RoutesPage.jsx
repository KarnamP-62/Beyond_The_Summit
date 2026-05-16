import { BarChart } from '../components/ChartWrapper'
import { useData } from '../data/DataContext'
import Routesmap from '../assets/Routesmap.svg'

function RoutesPage() {
  const { data, loading } = useData()

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { hostCountryData, mainRoutesData, otherRoutesData } = data

  const mainRoutesChartData = {
    labels: mainRoutesData.routes,
    datasets: [
      { label: 'Summit Members', data: mainRoutesData.summitMembers, backgroundColor: '#00508D' },
      { label: 'Deaths', data: mainRoutesData.deaths, backgroundColor: '#E0312E' }
    ]
  }

  const alternateRoutesChartData = {
    labels: otherRoutesData.routes,
    datasets: [
      { label: 'Summit Members', data: otherRoutesData.summitMembers, backgroundColor: '#00508D' },
      { label: 'Deaths', data: otherRoutesData.deaths, backgroundColor: '#E0312E' }
    ]
  }

  // Calculate stats
  const totalNepal = hostCountryData.nepal.reduce((a, b) => a + b, 0)
  const totalChina = hostCountryData.china.reduce((a, b) => a + b, 0)
  const nepalPercent = Math.round((totalNepal / (totalNepal + totalChina)) * 100)

  // Calculate death rates for all routes (combining main and alternate)
  // Death rate = deaths / (summitMembers + deaths) * 100 to get proper percentage
  const allRoutes = [
    ...mainRoutesData.routes.map((route, i) => ({
      name: route,
      summits: mainRoutesData.summitMembers[i],
      deaths: mainRoutesData.deaths[i],
      deathRate: (mainRoutesData.summitMembers[i] + mainRoutesData.deaths[i]) > 0
        ? (mainRoutesData.deaths[i] / (mainRoutesData.summitMembers[i] + mainRoutesData.deaths[i])) * 100
        : 0
    })),
    ...otherRoutesData.routes.map((route, i) => ({
      name: route,
      summits: otherRoutesData.summitMembers[i],
      deaths: otherRoutesData.deaths[i],
      deathRate: (otherRoutesData.summitMembers[i] + otherRoutesData.deaths[i]) > 0
        ? (otherRoutesData.deaths[i] / (otherRoutesData.summitMembers[i] + otherRoutesData.deaths[i])) * 100
        : 0
    }))
  ].filter(r => r.summits > 0 || r.deaths > 0) // Routes with any activity

  const deadliestRoute = allRoutes.reduce((max, r) => r.deathRate > max.deathRate ? r : max, allRoutes[0])
  const safestRoute = allRoutes.reduce((min, r) => r.deathRate < min.deathRate ? r : min, allRoutes[0])

  return (
    <div className="routes-page">
      <div className="routes-left">
        <div className="routes-section">
          <img src={Routesmap} alt="Everest Routes Map" className="routes-map-image" />
          <p className="routes-map-description">
            Different Everest routes show varying expedition and termination patterns based on terrain difficulty, weather exposure, and technical challenges. Although there are <span className="highlight-text">136 documented routes</span> on Mount Everest, expedition activity is concentrated on just two major routes: the <span className="highlight-text">South Col–Southeast Ridge</span> and the <span className="highlight-text">North Col–Northeast Ridge</span>, which together account for nearly <span className="highlight-text">89% of all climbs</span>. In contrast, nearly 100 routes have been attempted only once, often as exploratory missions, route variations, or partial expeditions.
          </p>
        </div>
      </div>

      <div className="routes-right">
        <h1 className="routes-title">ROUTES</h1>

        <p className="routes-description">
          The <span className="highlight-text">South Col route from Nepal</span> dominates Everest expeditions, accounting for <span className="highlight-text">{nepalPercent}%</span> of all climbs. Better infrastructure, established camps, and experienced Sherpa support make it the preferred choice over the North Col route from Tibet.
        </p>

        <div className="routes-kpis">
          <div className="routes-kpi">
            <span className="routes-kpi-value routes-kpi-danger">{deadliestRoute.name}</span>
            <span className="routes-kpi-label">Deadliest Route ({deadliestRoute.deathRate.toFixed(1)}% death rate)</span>
          </div>
          <div className="routes-kpi">
            <span className="routes-kpi-value routes-kpi-safe">{safestRoute.name}</span>
            <span className="routes-kpi-label">Safest Route ({safestRoute.deathRate.toFixed(1)}% death rate)</span>
          </div>
        </div>

        <h3 className="routes-section-title">Main Routes - Summit Members & Deaths</h3>
        <div className="routes-chart routes-chart-small">
          <BarChart data={mainRoutesChartData} />
        </div>

        <h3 className="routes-section-title">Alternate Routes - Summit Members & Deaths</h3>
        <div className="routes-chart">
          <BarChart
            data={alternateRoutesChartData}
            options={{
              scales: {
                x: {
                  ticks: {
                    maxRotation: 90,
                    minRotation: 90,
                    font: { size: 8 }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default RoutesPage
