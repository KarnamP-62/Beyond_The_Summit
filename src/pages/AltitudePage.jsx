import { LineChart, BarChart } from '../components/ChartWrapper'
import { useData } from '../data/DataContext'
import AltitudeHealthSvg from '../assets/Altitudehealth.svg'

// Different shades of blue
const routeColors = [
  '#001f3f', '#003366', '#00508D', '#0066aa', '#1a7fc4',
  '#3399cc', '#4db8e8', '#66c2e8', '#80d4f2', '#99e0ff'
]

function AltitudePage() {
  const { data, loading } = useData()

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { campsiteData, o2UsageData } = data

  const campsiteChartData = {
    labels: campsiteData.camps,
    datasets: campsiteData.routes.map((route, i) => ({
      label: route.name,
      data: route.heights,
      borderColor: routeColors[i % routeColors.length],
      backgroundColor: routeColors[i % routeColors.length],
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6
    }))
  }

  const o2UsageChartData = {
    labels: o2UsageData.categories,
    datasets: [
      { label: 'Used O2', data: o2UsageData.usedO2, backgroundColor: '#00508D' },
      { label: 'No O2', data: o2UsageData.noO2, backgroundColor: '#E0312E' }
    ]
  }

  const o2UsageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#10183A', padding: 10 }
      }
    },
    scales: {
      x: {
        ticks: { color: '#10183A' },
        grid: { display: false }
      },
      y: {
        title: { display: true, text: 'Number of Expeditions', color: '#10183A' },
        ticks: { color: '#10183A' },
        grid: { color: 'rgba(0, 80, 141, 0.1)' },
        beginAtZero: true
      }
    }
  }

  const campsiteOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Camp', color: '#10183A' },
        ticks: { color: '#10183A' },
        grid: { display: false }
      },
      y: {
        title: { display: true, text: 'Elevation (meters)', color: '#10183A' },
        ticks: {
          color: '#10183A',
          callback: (val) => val.toLocaleString() + 'm'
        },
        grid: { color: 'rgba(0, 80, 141, 0.1)' }
      }
    }
  }

  return (
    <div className="altitude-page">
      <div className="altitude-left">
        <div className="altitude-chart-section">
          <h3 className="altitude-section-title">Camp Elevations by Route (meters)</h3>
          <div className="altitude-chart">
            <LineChart data={campsiteChartData} options={campsiteOptions} hideLegend />
          </div>
        </div>

        <div className="altitude-chart-section">
          <h3 className="altitude-section-title">Oxygen Usage by Activity</h3>
          <div className="altitude-chart">
            <BarChart data={o2UsageChartData} options={o2UsageOptions} />
          </div>
        </div>
      </div>

      <div className="altitude-right">
        <h1 className="altitude-title">ALTITUDE EFFECTS</h1>

        <p className="altitude-description">
          Supplemental oxygen, improved weather forecasting, and advanced climbing gear have increased Everest summit success rates and reduced ascent times. However, the region above 8,000 meters—known as the "Death Zone"—remains extremely dangerous. Time becomes critical, making fast ascents and descents essential for survival, which is why the highest camps are typically established below 8,000 meters.
        </p>

        <img src={AltitudeHealthSvg} alt="Altitude Health Effects" className="altitude-health-img" />
      </div>
    </div>
  )
}

export default AltitudePage
