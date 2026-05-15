import { useState } from 'react'
import { LineChart, BarChart, VerticalLineChart } from '../components/ChartWrapper'
import { useData } from '../data/DataContext'

function TimelinePage() {
  const { data, loading } = useData()
  const [activeTab, setActiveTab] = useState('expeditions')

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { expeditionData, summitDaysData, routeSummitDaysData } = data

  const expeditionsChartData = {
    labels: expeditionData.years,
    datasets: [
      {
        label: 'Total Expeditions',
        data: expeditionData.expeditions,
        borderColor: '#00508D',
        backgroundColor: 'rgba(0, 80, 141, 0.1)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Successful',
        data: expeditionData.successful,
        borderColor: '#E0312E',
        backgroundColor: 'rgba(224, 49, 46, 0.1)',
        fill: false,
        tension: 0.3
      }
    ]
  }

  const summitMembersData = {
    labels: expeditionData.years,
    datasets: [
      { label: 'Members', data: expeditionData.summitMembers, backgroundColor: 'rgba(46, 204, 113, 0.7)' },
      { label: 'Hired Staff', data: expeditionData.summitHired, backgroundColor: 'rgba(243, 156, 18, 0.7)' }
    ]
  }

  const summitDaysChartData = {
    labels: summitDaysData.years,
    datasets: [{
      label: 'Average Days',
      data: summitDaysData.avgDays,
      borderColor: '#00508D',
      backgroundColor: 'rgba(0, 80, 141, 0.1)',
      fill: true,
      tension: 0.3
    }]
  }

  // Calculate totals for Expeditions tab
  const totalExpeditions = expeditionData.expeditions.reduce((a, b) => a + b, 0)
  const totalSuccessful = expeditionData.successful.reduce((a, b) => a + b, 0)
  const successRate = Math.round((totalSuccessful / totalExpeditions) * 100)

  // Calculate totals for Summits tab
  const totalSummitMembers = expeditionData.summitMembers.reduce((a, b) => a + b, 0)
  const totalSummitHired = expeditionData.summitHired.reduce((a, b) => a + b, 0)
  const totalSuccessfulSummits = totalSummitMembers + totalSummitHired

  // Calculate totals for Summit Days tab
  const overallAvgDays = summitDaysData.avgDays.length
    ? (summitDaysData.avgDays.reduce((a, b) => a + b, 0) / summitDaysData.avgDays.length).toFixed(1)
    : 0
  const nepalSideIndex = routeSummitDaysData.routes.indexOf('S Col-SE Ridge')
  const chinaSideIndex = routeSummitDaysData.routes.indexOf('N Col-NE Ridge')
  const nepalAvgDays = nepalSideIndex >= 0 ? routeSummitDaysData.medianDays[nepalSideIndex] : 0
  const chinaAvgDays = chinaSideIndex >= 0 ? routeSummitDaysData.medianDays[chinaSideIndex] : 0

  const tabContent = {
    expeditions: {
      title: 'Expeditions Over Time',
      description: 'Everest has transformed from an elite mountaineering challenge to a commercial venture. Expeditions grew from single digits in the 1970s to over 100 per year in the 2000s. This has improved success rates but raised concerns about overcrowding and environmental impact.'
    },
    summits: {
      title: 'Summit Members vs Hired Staff',
      description: 'Hired staff (primarily Sherpas) now outnumber foreign climbers on successful summits, reflecting their crucial role in expedition success. Nepali climbers, primarily Sherpas, account for the majority of summits. They fix ropes, carry supplies, and guide clients. Without them, commercial Everest climbing would be impossible. They also bear a disproportionate share of the risk.'
    },
    summitDays: {
      title: 'Average Days to Summit',
      description: 'The early slowness of expedition frequency reflected the many difficulties of mounting one at that time, which included expense, travel by conventional means from distant Europe, language and culture barriers, the need to hire large numbers of native porters, access to the mountains (including permission of respective governments), extremely limited communications, weather forecasting and, simply, the unknown, as no-one had ever attempted to climb so high before. Average summit time has decreased from 40+ days in early years to under 25 days today due to improved logistics and better equipment.'
    }
  }

  const summitMembersLineData = {
    labels: expeditionData.years,
    datasets: [
      {
        label: 'Summit Members',
        data: expeditionData.summitMembers,
        borderColor: '#00508D',
        backgroundColor: 'rgba(0, 80, 141, 0.1)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Hired Staff',
        data: expeditionData.summitHired,
        borderColor: '#E0312E',
        backgroundColor: 'rgba(224, 49, 46, 0.1)',
        fill: false,
        tension: 0.3
      }
    ]
  }

  const summitDaysLineData = {
    labels: summitDaysData.years,
    datasets: [{
      label: 'Average Days to Summit',
      data: summitDaysData.avgDays,
      borderColor: '#00508D',
      backgroundColor: 'rgba(0, 80, 141, 0.1)',
      fill: true,
      tension: 0.3
    }]
  }

  const renderLeftChart = () => {
    switch (activeTab) {
      case 'expeditions':
        return <LineChart data={expeditionsChartData} horizontal />
      case 'summits':
        return <LineChart data={summitMembersLineData} horizontal />
      case 'summitDays':
        return <LineChart data={summitDaysLineData} horizontal />
      default:
        return <LineChart data={expeditionsChartData} horizontal />
    }
  }

  const renderRightChart = () => {
    switch (activeTab) {
      case 'expeditions':
        return <LineChart data={expeditionsChartData} hideLegend />
      case 'summits':
        return <BarChart data={summitMembersData} stacked />
      case 'summitDays':
        return <LineChart data={summitDaysChartData} />
      default:
        return <LineChart data={expeditionsChartData} hideLegend />
    }
  }

  const expeditionHighlights = [
    { year: '1921–1922', title: 'Reconnaissance Expedition & First Summit Attempt', text: 'The first British Everest expedition explored possible summit routes from the northern side. In 1922, a second British expedition made the first major climbing attempt and became the first team to climb above 8,000 meters before retreating.' },
    { year: '1950–1953', title: 'Nepal Opens Borders & First Successful Ascent', text: 'After Tibet\'s northern routes became restricted following Chinese control of Tibet, Nepal opened Everest access to foreign climbers in 1950. On May 29, 1953, Edmund Hillary and Tenzing Norgay became the first confirmed climbers to successfully summit Mount Everest.' },
    { year: '1996', title: 'Everest Disaster', text: 'A severe blizzard during the climbing season killed eight climbers in a single event and 12 overall, making it the deadliest Everest season at the time.' },
    { year: '2020', title: 'COVID-19 Closure', text: 'Nepal suspended all Everest climbing permits due to the global COVID-19 pandemic, while China also closed access to Everest from the Tibetan side.' }
  ]

  const summitHighlights = [
    { year: '1975', title: 'First Woman to Summit Everest', text: 'Junko Tabei of Japan became the first woman to successfully reach the summit of Everest.' },
    { year: '1980', title: 'First Winter Ascent', text: 'Polish climbers Leszek Cichy and Krzysztof Wielicki completed the first winter ascent of Mount Everest, marking the first winter summit of any 8,000-meter peak.' },
    { year: '2014–2015', title: 'Khumbu Icefall Tragedy & Nepal Earthquake Avalanche', text: 'In 2014, a massive ice avalanche in the Khumbu Icefall killed 16 Sherpas and led to the cancellation of the climbing season. In 2015, an earthquake-triggered avalanche struck Everest Base Camp, killing at least 18 people in one of Everest\'s deadliest disasters.' }
  ]

  const summitDaysHighlights = [
    { year: '1953', title: 'First Summit - 39 Days', text: 'The first successful expedition took approximately 39 days from base camp to summit.' },
    { year: '1980s', title: 'Commercial Era Begins', text: 'Average summit times began decreasing as commercial expeditions improved logistics and route preparation.' },
    { year: '2000s', title: 'Modern Expeditions', text: 'With better equipment and established routes, average summit times dropped to under 30 days for most climbers.' }
  ]

  const getHighlights = () => {
    switch (activeTab) {
      case 'expeditions':
        return expeditionHighlights
      case 'summits':
        return summitHighlights
      case 'summitDays':
        return summitDaysHighlights
      default:
        return expeditionHighlights
    }
  }


  return (
    <div className="timeline-page">
      <div className="timeline-left">
        <div className={`timeline-highlights highlights-${activeTab}`}>
          {getHighlights().map((item, index) => (
            <div key={index} className="timeline-highlight-item">
              <div className="highlight-header">
                <span className="highlight-year">{item.year} – </span>
                <span className="highlight-title">{item.title}</span>
              </div>
              <p className="highlight-text">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="timeline-chart-vertical">
          {renderLeftChart()}
        </div>
      </div>

      <div className="timeline-right">
        <h1 className="timeline-title">TIMELINE</h1>

        <div className="timeline-tabs">
          <button
            className={`timeline-tab ${activeTab === 'expeditions' ? 'active' : ''}`}
            onClick={() => setActiveTab('expeditions')}
          >
            EXPEDITIONS
          </button>
          <button
            className={`timeline-tab ${activeTab === 'summits' ? 'active' : ''}`}
            onClick={() => setActiveTab('summits')}
          >
            SUMMITS
          </button>
          <button
            className={`timeline-tab ${activeTab === 'summitDays' ? 'active' : ''}`}
            onClick={() => setActiveTab('summitDays')}
          >
            SUMMIT TIME
          </button>
        </div>

        <p className="timeline-description">
          {tabContent[activeTab].description}
        </p>

        <div className="timeline-stats">
          {activeTab === 'expeditions' && (
            <>
              <div className="timeline-stat-card">
                <div className="value">{totalExpeditions.toLocaleString()}</div>
                <div className="label">Total Expeditions</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value success">{totalSuccessful.toLocaleString()}</div>
                <div className="label">Successful</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value warning">{successRate}%</div>
                <div className="label">Success Rate</div>
              </div>
            </>
          )}
          {activeTab === 'summits' && (
            <>
              <div className="timeline-stat-card">
                <div className="value">{totalSuccessfulSummits.toLocaleString()}</div>
                <div className="label">Total Summits</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value success">{totalSummitMembers.toLocaleString()}</div>
                <div className="label">Member Summits</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value warning">{totalSummitHired.toLocaleString()}</div>
                <div className="label">Hired Summits</div>
              </div>
            </>
          )}
          {activeTab === 'summitDays' && (
            <>
              <div className="timeline-stat-card">
                <div className="value">{overallAvgDays}</div>
                <div className="label">Avg Days Overall</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value success">{nepalAvgDays}</div>
                <div className="label">Nepal Side (Days)</div>
              </div>
              <div className="timeline-stat-card">
                <div className="value warning">{chinaAvgDays}</div>
                <div className="label">China Side (Days)</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TimelinePage
