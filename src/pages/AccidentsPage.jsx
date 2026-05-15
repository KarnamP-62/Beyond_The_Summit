import { useState } from 'react'
import { LineChart, BarChart, ScatterChart } from '../components/ChartWrapper'
import { useData } from '../data/DataContext'

const causeColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e91e63', '#00bcd4']
const reasonColors = ['#e74c3c', '#3498db', '#f39c12', '#2ecc71', '#9b59b6', '#1abc9c']

function AccidentsPage() {
  const { data, loading } = useData()
  const [activeTab, setActiveTab] = useState('deaths')

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { expeditionData, deathCauseData, causeByYearData, termReasonData, routeTermData, termHeightData } = data

  const totalDeaths = expeditionData.mdeaths.map((m, i) => m + expeditionData.hdeaths[i])

  const deathsChartData = {
    labels: expeditionData.years,
    datasets: [
      { label: 'Total Deaths', data: totalDeaths, borderColor: '#005292', backgroundColor: 'rgba(0, 82, 146, 0.4)', fill: true, tension: 0.4, order: 2 },
      { label: 'Sherpa Deaths', data: expeditionData.hdeaths, borderColor: '#DC2626', backgroundColor: 'transparent', fill: false, tension: 0.4, order: 1 }
    ]
  }

  // Shorten long cause labels
  const shortenedCauses = deathCauseData.causes.map(cause =>
    cause === 'Base Camp avalanche following the April 2015 Nepal earthquake'
      ? '2015 Earthquake & Avalanche'
      : cause
  )

  const deathCauseChartData = {
    labels: shortenedCauses,
    datasets: [{
      label: 'Deaths',
      data: deathCauseData.counts,
      backgroundColor: '#00508D'
    }]
  }

  const causeByYearChartData = {
    labels: causeByYearData.years,
    datasets: causeByYearData.causes.map((cause, i) => ({
      label: cause,
      data: causeByYearData.data[cause],
      backgroundColor: causeColors[i] + 'B3'
    }))
  }

  const termReasonChartData = {
    labels: termReasonData.labels,
    datasets: [{
      label: 'Terminations',
      data: termReasonData.counts,
      backgroundColor: '#00508D'
    }]
  }

  const routeTermChartData = {
    labels: routeTermData.routes.map(r => r.name),
    datasets: routeTermData.reasons.map((reason, i) => ({
      label: reason,
      data: routeTermData.routes.map(r => r.counts[i]),
      backgroundColor: reasonColors[i] + 'B3'
    }))
  }

  // Calculate average termination height by route
  const routeHeights = {}
  termHeightData.points.forEach(p => {
    const routeName = termHeightData.routes[p.routeIdx] || 'Other'
    if (!routeHeights[routeName]) {
      routeHeights[routeName] = { total: 0, count: 0 }
    }
    routeHeights[routeName].total += p.height
    routeHeights[routeName].count++
  })

  const termHeightByRouteData = {
    labels: Object.keys(routeHeights),
    datasets: [{
      label: 'Avg Termination Height (m)',
      data: Object.values(routeHeights).map(r => Math.round(r.total / r.count)),
      backgroundColor: '#00508D'
    }]
  }

  // Scatter chart data for termination heights by route
  const scatterChartData = {
    datasets: [{
      label: 'Termination Height',
      data: termHeightData.points.map(p => ({ x: p.routeIdx, y: p.height })),
      backgroundColor: '#00508D',
      pointRadius: 6,
      pointHoverRadius: 8
    }]
  }

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: -0.5,
        max: termHeightData.routes.length - 0.5,
        ticks: {
          color: '#10183A',
          stepSize: 1,
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: { size: 10 },
          callback: function(val) {
            if (Number.isInteger(val) && val >= 0 && val < termHeightData.routes.length) {
              const label = termHeightData.routes[val]
              // Split long labels into multiple lines
              if (label.length > 12) {
                const words = label.split(/[\s-]+/)
                const lines = []
                let currentLine = ''
                words.forEach(word => {
                  if ((currentLine + ' ' + word).trim().length <= 12) {
                    currentLine = (currentLine + ' ' + word).trim()
                  } else {
                    if (currentLine) lines.push(currentLine)
                    currentLine = word
                  }
                })
                if (currentLine) lines.push(currentLine)
                return lines
              }
              return label
            }
            return ''
          }
        },
        grid: { color: 'rgba(0, 80, 141, 0.1)' },
        afterBuildTicks: (axis) => {
          axis.ticks = termHeightData.routes.map((_, i) => ({ value: i }))
        }
      },
      y: {
        ticks: {
          color: '#10183A',
          callback: (val) => val.toLocaleString() + 'm'
        },
        grid: { color: 'rgba(0, 80, 141, 0.1)' },
        title: { display: true, text: 'Elevation (meters)', color: '#10183A' }
      }
    }
  }

  // Calculate stats
  const totalDeathsCount = totalDeaths.reduce((a, b) => a + b, 0)
  const topCause = deathCauseData.causes[0]
  const topCauseCount = deathCauseData.counts[0]
  const topTermReason = termReasonData.labels[0]
  const topTermCount = termReasonData.counts[0]

  // Calculate total terminations
  const totalTerminations = termReasonData.counts.reduce((a, b) => a + b, 0)

  return (
    <div className="accidents-page">
      <div className="accidents-left">
        {activeTab === 'deaths' && (
          <>
            <div className="accidents-chart-section">
              <h3 className="accidents-section-title">Deaths Over Time</h3>
              <div className="accidents-chart">
                <LineChart data={deathsChartData} />
              </div>
            </div>

            <div className="accidents-chart-section causes-chart">
              <h3 className="accidents-section-title">Causes of Death</h3>
              <div className="accidents-chart">
                <BarChart data={deathCauseChartData} horizontal hideLegend />
              </div>
            </div>
          </>
        )}

        {activeTab === 'terminations' && (
          <>
            <div className="accidents-chart-section">
              <h3 className="accidents-section-title">Termination Heights by Route</h3>
              <div className="accidents-chart">
                <ScatterChart data={scatterChartData} options={scatterOptions} />
              </div>
            </div>

            <div className="accidents-chart-section causes-chart">
              <h3 className="accidents-section-title">Expedition Termination Reasons</h3>
              <div className="accidents-chart">
                <BarChart data={termReasonChartData} horizontal hideLegend />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="accidents-right">
        <h1 className="accidents-title">ACCIDENTS</h1>

        <div className="accidents-tabs">
          <button
            className={`accidents-tab ${activeTab === 'deaths' ? 'active' : ''}`}
            onClick={() => setActiveTab('deaths')}
          >
            DEATHS
          </button>
          <button
            className={`accidents-tab ${activeTab === 'terminations' ? 'active' : ''}`}
            onClick={() => setActiveTab('terminations')}
          >
            TERMINATIONS
          </button>
        </div>

        <p className="accidents-description">
          {activeTab === 'deaths'
            ? `Understanding what goes wrong on Mount Everest reveals that the descent is often more dangerous than the ascent itself. Between 1922 and 2025, 348 people lost their lives on Everest despite advancements in technology, forecasting, equipment, and climbing experience. The mountain remains unpredictable, reminding climbers that no amount of preparation can fully eliminate risk or guarantee safety.`
            : `Expeditions can be terminated for various reasons before reaching the summit. Weather remains the dominant factor, but illness, accidents, and personal reasons also play significant roles.`
          }
        </p>

        {activeTab === 'deaths' && (
          <>
            <div className="accidents-kpis">
              <div className="accidents-kpi-row">
                <div className="accidents-kpi danger">
                  <span className="accidents-kpi-value">{totalDeathsCount}</span>
                  <span className="accidents-kpi-label">Total Deaths</span>
                </div>
                <div className="accidents-kpi">
                  <span className="accidents-kpi-value">{topCauseCount}</span>
                  <span className="accidents-kpi-label">{topCause} Deaths</span>
                </div>
              </div>
            </div>

            <div className="accidents-insights">
              <div className="accidents-insight">
                <h4>Deadliest Years</h4>
                <p>2015 saw 28 deaths due to the Nepal earthquake, and 2014 had 17 deaths from an icefall avalanche.</p>
              </div>
              <div className="accidents-insight">
                <h4>Leading Causes</h4>
                <p>{topCause} and {deathCauseData.causes[1]} are the top killers, accounting for nearly half of all deaths.</p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'terminations' && (
          <>
            <div className="accidents-kpis">
              <div className="accidents-kpi-row">
                <div className="accidents-kpi warning">
                  <span className="accidents-kpi-value">{totalTerminations.toLocaleString()}</span>
                  <span className="accidents-kpi-label">Total Terminations</span>
                </div>
                <div className="accidents-kpi">
                  <span className="accidents-kpi-value">{topTermCount}</span>
                  <span className="accidents-kpi-label">{topTermReason}</span>
                </div>
              </div>
            </div>

            <div className="accidents-insights">
              <div className="accidents-insight">
                <h4>Weather Dominates</h4>
                <p>Bad weather causes the majority of expedition terminations, followed by personal reasons and illness.</p>
              </div>
              <div className="accidents-insight">
                <h4>Route Differences</h4>
                <p>Different routes have varying termination patterns based on their unique challenges and exposure to elements.</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AccidentsPage
