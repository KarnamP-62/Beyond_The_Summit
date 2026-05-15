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
      { label: 'Summit Members', data: mainRoutesData.summitMembers, backgroundColor: '#1E7197' },
      { label: 'Deaths', data: mainRoutesData.deaths, backgroundColor: '#DC2626' }
    ]
  }

  const alternateRoutesChartData = {
    labels: otherRoutesData.routes,
    datasets: [
      { label: 'Summit Members', data: otherRoutesData.summitMembers, backgroundColor: '#1E7197' },
      { label: 'Deaths', data: otherRoutesData.deaths, backgroundColor: '#DC2626' }
    ]
  }

  // Calculate stats
  const totalNepal = hostCountryData.nepal.reduce((a, b) => a + b, 0)
  const totalChina = hostCountryData.china.reduce((a, b) => a + b, 0)
  const nepalPercent = Math.round((totalNepal / (totalNepal + totalChina)) * 100)

  return (
    <div className="routes-page">
      <div className="routes-left">
        <div className="routes-section">
          <img src={Routesmap} alt="Everest Routes Map" className="routes-map-image" />
          <p className="routes-map-description">
            Different Everest routes show varying expedition and termination patterns based on terrain difficulty, weather exposure, and technical challenges. Although there are 136 documented routes on Mount Everest, expedition activity is concentrated on just two major routes: the South Col–Southeast Ridge and the North Col–Northeast Ridge, which together account for nearly 89% of all climbs. In contrast, nearly 100 routes have been attempted only once, often as exploratory missions, route variations, or partial expeditions.
          </p>
        </div>
      </div>

      <div className="routes-right">
        <h1 className="routes-title">ROUTES</h1>

        <p className="routes-description">
          The South Col route from Nepal dominates Everest expeditions, accounting for {nepalPercent}% of all climbs. Better infrastructure, established camps, and experienced Sherpa support make it the preferred choice over the North Col route from Tibet.
        </p>

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
