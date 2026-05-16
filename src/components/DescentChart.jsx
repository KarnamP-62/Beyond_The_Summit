import { useState } from 'react'

function DescentChart({ records = [] }) {
  const [tooltip, setTooltip] = useState({ show: false, name: '', year: '', nationality: '', success: '', x: 0, y: 0 })

  // Group records by year
  const byYear = {}
  records.forEach(record => {
    if (!byYear[record.year]) {
      byYear[record.year] = []
    }
    byYear[record.year].push(record)
  })

  // Convert to array and sort by year
  const yearData = Object.entries(byYear)
    .map(([year, data]) => ({
      year: parseInt(year),
      records: data
    }))
    .sort((a, b) => a.year - b.year)

  const handleMouseEnter = (e, record) => {
    const rect = e.target.getBoundingClientRect()
    setTooltip({
      show: true,
      name: record.name,
      year: record.year,
      nationality: record.nationality || 'Unknown',
      success: record.success || 'Unknown',
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
  }

  const handleMouseLeave = () => {
    setTooltip({ show: false, name: '', year: '', nationality: '', success: '', x: 0, y: 0 })
  }

  if (yearData.length === 0) {
    return (
      <div className="descent-chart-container">
        <p className="descent-chart-empty">No data available</p>
      </div>
    )
  }

  const maxCount = Math.max(...yearData.map(d => d.records.length), 1)

  return (
    <div className="descent-chart-container">
      <div className="descent-chart-wrapper">
        <div className="descent-chart-content">
          <div className="descent-chart-bars">
            {yearData.map((d, index) => (
              <div key={index} className="descent-chart-boxes">
                {d.records.map((record, i) => (
                  <div
                    key={i}
                    className="descent-box"
                    onMouseEnter={(e) => handleMouseEnter(e, record)}
                    onMouseLeave={handleMouseLeave}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <div className="descent-chart-xlabels">
            {yearData.map((d, index) => (
              <span key={index} className="descent-chart-xlabel">{d.year}</span>
            ))}
          </div>
          <div className="descent-chart-xaxis-title">Year</div>
          <span className="chart-hover-hint">hover for more information</span>
        </div>
      </div>
      {tooltip.show && (
        <div
          className="descent-tooltip"
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div><strong>Name:</strong> {tooltip.name}</div>
          <div><strong>Year:</strong> {tooltip.year}</div>
          <div><strong>Nationality:</strong> {tooltip.nationality}</div>
        </div>
      )}
    </div>
  )
}

export default DescentChart
