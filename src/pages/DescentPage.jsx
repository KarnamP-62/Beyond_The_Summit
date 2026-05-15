import DescentChart from '../components/DescentChart'
import { useData } from '../data/DataContext'

function DescentPage() {
  const { data, loading } = useData()

  if (loading || !data) {
    return <div className="loading">Loading data...</div>
  }

  const { descentTypesData } = data

  return (
    <div className="descent-page">
      <div className="descent-left">
        <div className="descent-section">
          <div className="descent-row">
            <div className="descent-type-info">
              <h3 className="descent-type-heading">SKI</h3>
              <p className="descent-type-text">
                Ski descents from Everest represent one of the most extreme forms of alpine skiing. Climbers must navigate steep, icy terrain at extreme altitudes where oxygen is scarce and conditions change rapidly.
              </p>
            </div>
            <DescentChart records={descentTypesData.skiRecords} />
          </div>
        </div>

        <div className="descent-section">
          <div className="descent-row">
            <div className="descent-type-info">
              <h3 className="descent-type-heading">PARAPENTE</h3>
              <p className="descent-type-text">
                Paragliding from the summit allows climbers to bypass the dangerous descent through the death zone. However, unpredictable winds and thin air make launches extremely challenging.
              </p>
            </div>
            <DescentChart records={descentTypesData.parapenteRecords} />
          </div>
        </div>

        <div className="descent-section">
          <div className="descent-row">
            <div className="descent-type-info">
              <h3 className="descent-type-heading">TRAVERSE</h3>
              <p className="descent-type-text">
                Traversing Mount Everest by ascending from one side and descending from another remains one of mountaineering's most difficult achievements. This requires extensive logistics with teams on both sides of Everest.
              </p>
            </div>
            <DescentChart records={descentTypesData.traverseRecords} />
          </div>
        </div>
      </div>

      <div className="descent-right">
        <h1 className="descent-title">DESCENT</h1>
        <p className="descent-description">
          What may surprise many is that the descent from Mount Everest is often more dangerous than the climb to the summit itself. Between 1922 and 2025, 122 out of 339 documented deaths occurred during descent. Many climbers push themselves to their physical and mental limits reaching the summit, leaving little energy, oxygen, or focus for the journey back down. Exhaustion and reduced decision-making at extreme altitude often lead to fatal mistakes. The dangers of descent are influenced by several factors, including falls, severe exhaustion, exposure and frostbite, altitude sickness, avalanches, and other high-altitude illnesses and complications.
        </p>

        <div className="descent-kpis">
          <div className="descent-kpi-row">
            <div className="descent-kpi">
              <span className="descent-kpi-name">Yuichiro Miura</span>
              <span className="descent-kpi-info">1970 - First Ski Descent Attempt</span>
            </div>
            <div className="descent-kpi">
              <span className="descent-kpi-name">Kit DesLauriers</span>
              <span className="descent-kpi-info">2006 - First Woman to Ski From the Summit</span>
            </div>
          </div>
          <div className="descent-kpi-row">
            <div className="descent-kpi">
              <span className="descent-kpi-name">Jean-Marc Boivin</span>
              <span className="descent-kpi-info">1988 - First Paragliding Flight From Everest</span>
            </div>
            <div className="descent-kpi">
              <span className="descent-kpi-name">Sano Babu Sunuwar</span>
              <span className="descent-kpi-info">2011 - Highest Tandem Paragliding Launch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescentPage
