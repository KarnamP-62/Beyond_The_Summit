import Papa from 'papaparse'

// Load and parse a CSV file
export async function loadCSV(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()

  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (header) => header.trim().replace(/\u00A0/g, ''), // Remove NBSP and trim
      complete: (results) => resolve(results.data),
      error: (error) => reject(error)
    })
  })
}

// Load all CSV data
export async function loadAllData() {
  const [expeditions, deaths, ascents] = await Promise.all([
    loadCSV('/src/data/expeditions.csv'),
    loadCSV('/src/data/everest_deaths.csv'),
    loadCSV('/src/data/Mt_Everest_Ascent_Data.csv')
  ])

  return { expeditions, deaths, ascents }
}

// Process expedition data by year
export function processExpeditionData(expeditions) {
  // Filter for Everest only
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER')

  // Group by year
  const byYear = {}
  everestExp.forEach(exp => {
    const year = exp.YEAR
    if (!byYear[year]) {
      byYear[year] = {
        expeditions: 0,
        successful: 0,
        unsuccessful: 0,
        summitMembers: 0,
        summitHired: 0,
        mdeaths: 0,
        hdeaths: 0
      }
    }
    byYear[year].expeditions++
    if (exp.SUCCESS1 === true || exp.SUCCESS1 === 'True') {
      byYear[year].successful++
    } else {
      byYear[year].unsuccessful++
    }
    byYear[year].summitMembers += exp.SMTMEMBERS || 0
    byYear[year].summitHired += exp.SMTHIRED || 0
    byYear[year].mdeaths += exp.MDEATHS || 0
    byYear[year].hdeaths += exp.HDEATHS || 0
  })

  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b)

  return {
    years,
    expeditions: years.map(y => byYear[y].expeditions),
    successful: years.map(y => byYear[y].successful),
    unsuccessful: years.map(y => byYear[y].unsuccessful),
    summitMembers: years.map(y => byYear[y].summitMembers),
    summitHired: years.map(y => byYear[y].summitHired),
    mdeaths: years.map(y => byYear[y].mdeaths),
    hdeaths: years.map(y => byYear[y].hdeaths)
  }
}

// Process summit days data
export function processSummitDaysData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.SMTDAYS)

  const byYear = {}
  everestExp.forEach(exp => {
    const year = exp.YEAR
    if (!byYear[year]) byYear[year] = []
    if (exp.SMTDAYS > 0) byYear[year].push(exp.SMTDAYS)
  })

  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b)
  const avgDays = years.map(y => {
    const days = byYear[y]
    return days.length ? +(days.reduce((a, b) => a + b, 0) / days.length).toFixed(1) : 0
  })

  return { years, avgDays }
}

// Process agency success rates
export function processAgencyData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.AGENCY)

  const agencies = {}
  everestExp.forEach(exp => {
    const agency = exp.AGENCY
    if (!agencies[agency]) agencies[agency] = { total: 0, success: 0 }
    agencies[agency].total++
    if (exp.SUCCESS1 === true || exp.SUCCESS1 === 'True') {
      agencies[agency].success++
    }
  })

  const agencyList = Object.entries(agencies)
    .filter(([_, data]) => data.total >= 5) // Min 5 expeditions
    .map(([name, data]) => ({
      name,
      rate: +((data.success / data.total) * 100).toFixed(1),
      total: data.total
    }))
    .sort((a, b) => b.rate - a.rate)

  return {
    topAgencies: agencyList.slice(0, 10).map(a => a.name),
    topRates: agencyList.slice(0, 10).map(a => a.rate),
    bottomAgencies: agencyList.slice(-10).reverse().map(a => a.name),
    bottomRates: agencyList.slice(-10).reverse().map(a => a.rate)
  }
}

// Process host country data
export function processHostCountryData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER')

  const byYear = {}
  everestExp.forEach(exp => {
    const year = exp.YEAR
    if (!byYear[year]) byYear[year] = { nepal: 0, china: 0 }
    if (exp.HOST === 1) byYear[year].nepal++
    else if (exp.HOST === 2) byYear[year].china++
  })

  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b)

  return {
    years,
    nepal: years.map(y => byYear[y].nepal),
    china: years.map(y => byYear[y].china)
  }
}

// Process host country summits
export function processHostCountrySummits(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER')

  let nepalMembers = 0, nepalHired = 0, chinaMembers = 0, chinaHired = 0

  everestExp.forEach(exp => {
    if (exp.HOST === 1) {
      nepalMembers += exp.SMTMEMBERS || 0
      nepalHired += exp.SMTHIRED || 0
    } else if (exp.HOST === 2) {
      chinaMembers += exp.SMTMEMBERS || 0
      chinaHired += exp.SMTHIRED || 0
    }
  })

  return {
    countries: ['Nepal (South)', 'China (North)'],
    summitMembers: [nepalMembers, chinaMembers],
    summitHired: [nepalHired, chinaHired]
  }
}

// Process route data
export function processRouteData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER')

  // Shorten long route names for display
  const routeNameMap = {
    'N Face (Japanese & Hornbein Couloirs)': 'N Face'
  }

  const routes = {}
  everestExp.forEach(exp => {
    let route = exp.ROUTE1 || 'Unknown'
    route = routeNameMap[route] || route
    if (!routes[route]) routes[route] = { expeditions: 0, summitMembers: 0, summitHired: 0, deaths: 0 }
    routes[route].expeditions++
    routes[route].summitMembers += exp.SMTMEMBERS || 0
    routes[route].summitHired += exp.SMTHIRED || 0
    routes[route].deaths += (exp.MDEATHS || 0) + (exp.HDEATHS || 0)
  })

  // Main routes
  const mainRoutes = ['S Col-SE Ridge', 'N Col-NE Ridge']
  const mainRoutesData = {
    routes: mainRoutes,
    expeditions: mainRoutes.map(r => routes[r]?.expeditions || 0),
    summitMembers: mainRoutes.map(r => routes[r]?.summitMembers || 0),
    summitHired: mainRoutes.map(r => routes[r]?.summitHired || 0),
    deaths: mainRoutes.map(r => routes[r]?.deaths || 0)
  }

  // Other routes
  const otherRoutesList = Object.entries(routes)
    .filter(([name]) => !mainRoutes.includes(name) && name !== 'Unknown')
    .sort((a, b) => b[1].expeditions - a[1].expeditions)
    .slice(0, 10)

  const otherRoutesData = {
    routes: otherRoutesList.map(([name]) => name),
    expeditions: otherRoutesList.map(([_, data]) => data.expeditions),
    summitMembers: otherRoutesList.map(([_, data]) => data.summitMembers),
    deaths: otherRoutesList.map(([_, data]) => data.deaths)
  }

  // Route death rates
  const routeDeathData = Object.entries(routes)
    .filter(([_, data]) => data.expeditions >= 5)
    .map(([name, data]) => ({
      name,
      totalDeaths: data.deaths,
      deathRate: +((data.deaths / (data.summitMembers + data.summitHired || 1)) * 100).toFixed(2)
    }))
    .sort((a, b) => b.deathRate - a.deathRate)
    .slice(0, 10)

  return {
    mainRoutesData,
    otherRoutesData,
    routeData: {
      routes: routeDeathData.map(r => r.name),
      totalDeaths: routeDeathData.map(r => r.totalDeaths),
      deathRate: routeDeathData.map(r => r.deathRate)
    }
  }
}

// Process descent types
export function processDescentData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER')

  // Create individual records for each descent type
  const skiRecords = []
  const parapenteRecords = []
  const traverseRecords = []

  // Helper to check if value is truthy (handles "True", true, 1, etc.)
  const isTruthy = (val) => val === true || val === 'True' || val === 'true' || val === 1

  everestExp.forEach(exp => {
    const year = exp.YEAR
    const name = exp.LEADERS || 'Unknown'

    if (isTruthy(exp.SKI)) {
      skiRecords.push({ year, name })
    }
    if (isTruthy(exp.PARAPENTE)) {
      parapenteRecords.push({ year, name })
    }
    if (isTruthy(exp.TRAVERSE)) {
      traverseRecords.push({ year, name })
    }
  })

  // Sort records by year
  skiRecords.sort((a, b) => a.year - b.year)
  parapenteRecords.sort((a, b) => a.year - b.year)
  traverseRecords.sort((a, b) => a.year - b.year)

  return {
    skiRecords,
    parapenteRecords,
    traverseRecords
  }
}

// Process death causes from deaths CSV
export function processDeathCauses(deaths) {
  const causes = {}
  deaths.forEach(d => {
    const cause = d['Cause of death'] || 'Unknown'
    causes[cause] = (causes[cause] || 0) + 1
  })

  const sorted = Object.entries(causes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)

  return {
    causes: sorted.map(([c]) => c),
    counts: sorted.map(([_, count]) => count)
  }
}

// Process death causes by year
export function processCausesByYear(deaths) {
  const byYear = {}
  const allCauses = new Set()

  deaths.forEach(d => {
    const dateStr = d.Date || ''
    const yearMatch = dateStr.match(/\d{4}/)
    if (!yearMatch) return

    const year = parseInt(yearMatch[0])
    const cause = d['Cause of death'] || 'Unknown'
    allCauses.add(cause)

    if (!byYear[year]) byYear[year] = {}
    byYear[year][cause] = (byYear[year][cause] || 0) + 1
  })

  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b)
  const topCauses = ['Avalanche', 'Fall', 'Altitude Sickness', 'Exposure/Hypothermia', 'Exhaustion', 'Heart/Cardiac', 'Disappeared', 'Serac/Icefall']
    .filter(c => allCauses.has(c))

  const data = {}
  topCauses.forEach(cause => {
    data[cause] = years.map(y => byYear[y][cause] || 0)
  })

  return { years, causes: topCauses, data }
}

// Process termination reasons
export function processTerminationData(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.TERMREASON)

  const termReasons = {
    1: 'Bad Weather (Wind)',
    2: 'Snow/Icefall Conditions',
    3: 'Accident',
    4: 'Illness/Health Issues',
    5: 'Personal Reasons',
    6: 'Route Difficulties',
    7: 'Lack of Supplies',
    8: 'Lack of Time',
    9: 'Loss of Morale',
    10: 'Permit Issues',
    11: 'Did Not Reach BC',
    12: 'Claimed Success'
  }

  const counts = {}
  everestExp.forEach(exp => {
    const reason = termReasons[exp.TERMREASON] || 'Other'
    counts[reason] = (counts[reason] || 0) + 1
  })

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])

  return {
    labels: sorted.map(([label]) => label),
    counts: sorted.map(([_, count]) => count)
  }
}

// Process route termination data
export function processRouteTermination(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.TERMREASON && e.ROUTE1)

  const termReasons = {
    1: 'Bad Weather',
    2: 'Snow/Icefall',
    3: 'Accident',
    4: 'Illness',
    5: 'Personal Reasons',
    7: 'Lack of Supplies'
  }

  const routes = {}
  everestExp.forEach(exp => {
    const route = exp.ROUTE1
    const reason = termReasons[exp.TERMREASON]
    if (!reason) return

    if (!routes[route]) routes[route] = { name: route, counts: [0, 0, 0, 0, 0, 0] }
    const idx = Object.keys(termReasons).indexOf(String(exp.TERMREASON))
    if (idx >= 0) routes[route].counts[idx]++
  })

  const routeList = Object.values(routes)
    .filter(r => !['S Col-SE Ridge', 'N Col-NE Ridge'].includes(r.name))
    .sort((a, b) => b.counts.reduce((x, y) => x + y, 0) - a.counts.reduce((x, y) => x + y, 0))
    .slice(0, 10)

  return {
    reasons: Object.values(termReasons),
    routes: routeList
  }
}

// Process termination height data
export function processTerminationHeight(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.HIGHPOINT && e.TERMREASON && e.ROUTE1)

  const termReasons = {
    1: 'Bad Weather',
    2: 'Snow/Icefall',
    3: 'Accident',
    4: 'Illness',
    5: 'Personal Reasons',
    7: 'Lack of Supplies'
  }

  // Build route list dynamically from data
  const routeCounts = {}
  everestExp.forEach(exp => {
    const route = exp.ROUTE1
    routeCounts[route] = (routeCounts[route] || 0) + 1
  })

  // Get top routes by count
  const topRoutes = Object.entries(routeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name]) => name)

  const routeMap = {}
  topRoutes.forEach((name, idx) => {
    routeMap[name] = idx
  })

  const points = []
  everestExp.forEach(exp => {
    const reason = termReasons[exp.TERMREASON]
    if (!reason) return

    const routeIdx = routeMap[exp.ROUTE1] !== undefined ? routeMap[exp.ROUTE1] : topRoutes.length

    points.push({
      routeIdx,
      height: exp.HIGHPOINT,
      reason,
      route: exp.ROUTE1
    })
  })

  // Sample to avoid too many points - but ensure representation from each route
  const routePoints = {}
  points.forEach(p => {
    if (!routePoints[p.routeIdx]) routePoints[p.routeIdx] = []
    routePoints[p.routeIdx].push(p)
  })

  const sampled = []
  Object.values(routePoints).forEach(rp => {
    const maxPerRoute = 50
    if (rp.length <= maxPerRoute) {
      sampled.push(...rp)
    } else {
      rp.forEach((p, i) => {
        if (i % Math.ceil(rp.length / maxPerRoute) === 0) sampled.push(p)
      })
    }
  })

  return {
    routes: [...topRoutes, 'Other'],
    points: sampled
  }
}

// Process country summits from ascent data
export function processCountrySummits(ascents) {
  const countries = {}
  ascents.forEach(a => {
    const country = (a.Citizenship || '').trim()
    if (country) {
      countries[country] = (countries[country] || 0) + 1
    }
  })

  const sorted = Object.entries(countries)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)

  // Also create geoJson mapping
  const geoJsonMap = {}
  const countryNameMap = {
    'USA': 'United States of America',
    'UK': 'United Kingdom',
    'S Korea': 'South Korea',
    'N Korea': 'North Korea',
    'N Zealand': 'New Zealand',
    'Czech Rep': 'Czech Republic',
    'Bosnia-Herz': 'Bosnia and Herzegovina',
    'S Africa': 'South Africa',
    'UAE': 'United Arab Emirates',
    'Russia': 'Russia'
  }

  Object.entries(countries).forEach(([name, count]) => {
    const mappedName = countryNameMap[name] || name
    geoJsonMap[mappedName] = count
  })

  return {
    countrySummitsData: {
      countries: sorted.map(([c]) => c),
      summits: sorted.map(([_, count]) => count)
    },
    geoJsonSummitMap: geoJsonMap
  }
}

// Process gender data
export function processGenderData(ascents) {
  const byYear = {}
  ascents.forEach(a => {
    const yrSeas = a['Yr/Seas'] || ''
    const yearMatch = yrSeas.match(/\d{4}/)
    if (!yearMatch) return

    const year = parseInt(yearMatch[0])
    const sex = (a.Sex || '').trim().toUpperCase()

    if (!byYear[year]) byYear[year] = { male: 0, female: 0 }
    if (sex === 'M') byYear[year].male++
    else if (sex === 'F') byYear[year].female++
  })

  const years = Object.keys(byYear).map(Number).sort((a, b) => a - b)

  return {
    years,
    male: years.map(y => byYear[y].male),
    female: years.map(y => byYear[y].female)
  }
}

// Process age data
export function processAgeData(ascents) {
  const ageGroups = ['10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84']
  const counts = new Array(ageGroups.length).fill(0)

  ascents.forEach(a => {
    const age = a.Age
    if (!age || age < 10 || age > 84) return

    const groupIdx = Math.floor((age - 10) / 5)
    if (groupIdx >= 0 && groupIdx < counts.length) {
      counts[groupIdx]++
    }
  })

  return { ageGroups, counts }
}

// Process O2 usage
export function processO2Usage(expeditions) {
  // Filter to Everest expeditions with O2 data
  const everestExp = expeditions.filter(e =>
    e.PEAKID === 'EVER' && (e.O2USED !== undefined || e.O2NONE !== undefined)
  )

  let climbO2 = 0, climbNoO2 = 0
  let sleepO2 = 0, sleepNoO2 = 0
  let descentO2 = 0, descentNoO2 = 0

  everestExp.forEach(exp => {
    // Handle boolean or string values
    const o2Climb = exp.O2CLIMB === true || exp.O2CLIMB === 'True'
    const o2Sleep = exp.O2SLEEP === true || exp.O2SLEEP === 'True'
    const o2Descent = exp.O2DESCENT === true || exp.O2DESCENT === 'True'

    if (o2Climb) climbO2++
    else climbNoO2++

    if (o2Sleep) sleepO2++
    else sleepNoO2++

    if (o2Descent) descentO2++
    else descentNoO2++
  })

  return {
    categories: ['Climbing', 'Sleeping', 'Descending'],
    usedO2: [climbO2, sleepO2, descentO2],
    noO2: [climbNoO2, sleepNoO2, descentNoO2]
  }
}

// Process campsite data
export function processCampsiteData(expeditions) {
  // Camp elevation data for various Everest routes
  return {
    camps: ['BC', 'C1', 'C2', 'C3', 'C4'],
    routes: [
      { name: 'S Col-SE Ridge', heights: [5364, 6065, 6500, 7470, 7950] },
      { name: 'N Col-NE Ridge', heights: [5150, 5800, 6400, 7000, 7900] },
      { name: 'N Face (Great Couloir)', heights: [5500, 5900, 6700, 7800, 7700] },
      { name: 'S Pillar-SE Ridge', heights: [5300, 5700, 6500, 7200, 7900] },
      { name: 'SW Face', heights: [5364, 6100, 6700, 7300, 7500] },
      { name: 'N Face (Hornbein)', heights: [5150, 6200, 6600, 8100, 7600] },
      { name: 'Lho La-W Ridge', heights: [5100, 6300, 6900, 7100, 7400] },
      { name: 'NE Ridge', heights: [5150, 5900, 6800, 7500, 7950] },
      { name: 'SW Face (Bonington)', heights: [5364, 6000, 6400, 6500, 7700] },
      { name: 'W Ridge from N', heights: [5150, 5850, 6550, 6700, 7100] }
    ]
  }
}

// Process route summit days
export function processRouteSummitDays(expeditions) {
  const everestExp = expeditions.filter(e => e.PEAKID === 'EVER' && e.SMTDAYS && e.YEAR >= 2020)

  const routes = { 'S Col-SE Ridge': [], 'N Col-NE Ridge': [] }

  everestExp.forEach(exp => {
    if (routes[exp.ROUTE1]) {
      routes[exp.ROUTE1].push(exp.SMTDAYS)
    }
  })

  const median = arr => {
    if (!arr.length) return 0
    const sorted = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
  }

  return {
    routes: Object.keys(routes),
    medianDays: Object.values(routes).map(arr => median(arr))
  }
}
