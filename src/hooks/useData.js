import { useState, useEffect } from 'react'
import {
  loadCSV,
  processExpeditionData,
  processSummitDaysData,
  processAgencyData,
  processHostCountryData,
  processHostCountrySummits,
  processRouteData,
  processDescentData,
  processDeathCauses,
  processCausesByYear,
  processTerminationData,
  processRouteTermination,
  processTerminationHeight,
  processCountrySummits,
  processGenderData,
  processAgeData,
  processO2Usage,
  processCampsiteData,
  processRouteSummitDays
} from '../utils/dataProcessing'

/**
 * Custom hook to load and manage Everest expedition data
 * @returns {Object} { data, loading, error }
 */
export function useData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        setLoading(true)

        // Load CSV files from public/data/
        const [expeditions, deaths, ascents] = await Promise.all([
          loadCSV('/data/expeditions.csv'),
          loadCSV('/data/everest_deaths.csv'),
          loadCSV('/data/Mt_Everest_Ascent_Data.csv')
        ])

        // Process all data
        const expeditionData = processExpeditionData(expeditions)
        const summitDaysData = processSummitDaysData(expeditions)
        const agencySummitData = processAgencyData(expeditions)
        const hostCountryData = processHostCountryData(expeditions)
        const hostCountrySummitsData = processHostCountrySummits(expeditions)
        const { mainRoutesData, otherRoutesData, routeData } = processRouteData(expeditions)
        const descentTypesData = processDescentData(expeditions)
        const deathCauseData = processDeathCauses(deaths)
        const causeByYearData = processCausesByYear(deaths)
        const termReasonData = processTerminationData(expeditions)
        const routeTermData = processRouteTermination(expeditions)
        const termHeightData = processTerminationHeight(expeditions)
        const { countrySummitsData, geoJsonSummitMap } = processCountrySummits(ascents)
        const genderData = processGenderData(ascents)
        const ageData = processAgeData(ascents)
        const o2UsageData = processO2Usage(expeditions)
        const campsiteData = processCampsiteData(expeditions)
        const routeSummitDaysData = processRouteSummitDays(expeditions)

        if (isMounted) {
          setData({
            expeditionData,
            summitDaysData,
            agencySummitData,
            hostCountryData,
            hostCountrySummitsData,
            mainRoutesData,
            otherRoutesData,
            routeData,
            descentTypesData,
            deathCauseData,
            causeByYearData,
            termReasonData,
            routeTermData,
            termHeightData,
            countrySummitsData,
            geoJsonSummitMap,
            genderData,
            ageData,
            o2UsageData,
            campsiteData,
            routeSummitDaysData
          })
          setError(null)
        }
      } catch (err) {
        console.error('Error loading data:', err)
        if (isMounted) {
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])

  return { data, loading, error }
}
