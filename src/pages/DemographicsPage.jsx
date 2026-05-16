import { useEffect, useState } from 'react'
import { BarChart, PieChart } from '../components/ChartWrapper'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { useData } from '../data/DataContext'
import 'leaflet/dist/leaflet.css'

function DemographicsPage() {
  const { data, loading } = useData()
  const [geoData, setGeoData] = useState(null)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(setGeoData)
      .catch(console.error)
  }, [])

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { countrySummitsData, genderData, ageData, geoJsonSummitMap } = data

  // Calculate totals for pie chart
  const totalMaleCount = genderData.male.reduce((a, b) => a + b, 0)
  const totalFemaleCount = genderData.female.reduce((a, b) => a + b, 0)

  const genderPieData = {
    labels: ['Male', 'Female'],
    datasets: [{
      data: [totalMaleCount, totalFemaleCount],
      backgroundColor: ['#00508D', '#E0312E'],
      borderColor: ['#00508D', '#E0312E'],
      borderWidth: 2
    }]
  }

  const ageChartData = {
    labels: ageData.ageGroups,
    datasets: [{
      label: 'Summiters',
      data: ageData.counts,
      backgroundColor: '#00508D'
    }]
  }

  const getCountryStyle = (feature) => {
    const countryName = feature.properties.name
    const count = geoJsonSummitMap[countryName] || 0
    return {
      fillColor: count > 1000 ? '#10183A' : count > 500 ? '#00508D' : count > 100 ? '#1E7197' : count > 0 ? '#CDE3F3' : '#EBE9E2',
      weight: 1,
      opacity: 1,
      color: '#555',
      fillOpacity: 1
    }
  }

  const onEachCountry = (feature, layer) => {
    const countryName = feature.properties.name
    const count = geoJsonSummitMap[countryName] || 0
    layer.bindPopup(`<b>${countryName}</b><br>Summits: ${count}`)
  }

  // Calculate stats
  const totalCountries = Object.keys(geoJsonSummitMap).length
  const topCountry = countrySummitsData.countries[0] || 'Nepal'
  const topCountrySummits = countrySummitsData.summits[0] || 0

  return (
    <div className="demographics-page">
      <div className="demographics-left">
        <div className="demographics-section">
          <h3 className="demographics-section-title">Summit Members by Nation</h3>
          <div className="demographics-map-container">
            <MapContainer
              center={[27.9881, 86.9250]}
              zoom={2}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap, &copy; CARTO'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
              {geoData && (
                <GeoJSON
                  data={geoData}
                  style={getCountryStyle}
                  onEachFeature={onEachCountry}
                />
              )}
            </MapContainer>
            <div className="demographics-map-legend">
              <span className="legend-item"><span className="legend-color" style={{background: '#EBE9E2'}}></span> 0</span>
              <span className="legend-item"><span className="legend-color" style={{background: '#CDE3F3'}}></span> 1-100</span>
              <span className="legend-item"><span className="legend-color" style={{background: '#1E7197'}}></span> 100-500</span>
              <span className="legend-item"><span className="legend-color" style={{background: '#00508D'}}></span> 500-1000</span>
              <span className="legend-item"><span className="legend-color" style={{background: '#10183A'}}></span> 1000+</span>
            </div>
          </div>
        </div>

        <div className="demographics-section">
          <h3 className="demographics-section-title">Age Distribution of Summiters</h3>
          <div className="demographics-chart">
            <BarChart data={ageChartData} hideLegend />
          </div>
        </div>
      </div>

      <div className="demographics-right">
        <h1 className="demographics-title">DEMOGRAPHICS</h1>

        <p className="demographics-description">
          <span className="highlight-text">Nepal</span> has highest summits, largely due to the <span className="highlight-text">Sherpa community</span> who serve as guides and support staff. <span className="highlight-text">Women</span> remain significantly underrepresented at <span className="highlight-text">~7%</span>, though participation has grown steadily since <span className="highlight-text">1975</span>.
        </p>

        <div className="demographics-kpis-list">
          <div className="demographics-kpi-pair">
            <div className="demographics-kpi-row">
              <span className="demographics-kpi-value">{totalCountries}</span>
              <span className="demographics-kpi-label">Countries Represented</span>
            </div>
            <div className="demographics-kpi-row">
              <span className="demographics-kpi-value">{topCountrySummits.toLocaleString()}</span>
              <span className="demographics-kpi-label">{topCountry} Summits</span>
            </div>
          </div>
          <div className="demographics-kpi-row">
            <div className="demographics-kpi-dual">
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Edmund Hillary</span>
                <span className="kpi-dual-sub">First Man to Summit (1953)</span>
              </div>
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Junko Tabei</span>
                <span className="kpi-dual-sub">First Woman to Summit (1975)</span>
              </div>
            </div>
          </div>
          <div className="demographics-kpi-row">
            <div className="demographics-kpi-dual">
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Jordan Romero (13)</span>
                <span className="kpi-dual-sub">Youngest Male to Summit</span>
              </div>
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Malavath Purna (13)</span>
                <span className="kpi-dual-sub">Youngest Female to Summit</span>
              </div>
            </div>
          </div>
          <div className="demographics-kpi-row">
            <div className="demographics-kpi-dual">
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Yuichiro Miura (80)</span>
                <span className="kpi-dual-sub">Oldest Male to Summit</span>
              </div>
              <div className="kpi-dual-item">
                <span className="kpi-dual-value">Tamae Watanabe (73)</span>
                <span className="kpi-dual-sub">Oldest Female to Summit</span>
              </div>
            </div>
          </div>
        </div>

        <div className="demographics-section">
          <h3 className="demographics-section-title">Gender Distribution</h3>
          <div className="demographics-chart demographics-pie">
            <PieChart data={genderPieData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemographicsPage
