// BEYOND THE SUMMIT - Data Objects
// Everest Expedition Analysis Data (1921-2025)

// Main expedition data
const data = {
    years: [1921,1922,1924,1933,1934,1935,1936,1938,1947,1950,1951,1952,1953,1956,1958,1960,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
    expeditions: [1,1,1,1,1,1,1,1,1,1,2,3,1,1,1,2,2,1,1,2,1,2,1,4,2,2,2,2,3,4,2,2,4,6,9,5,8,12,13,14,15,17,20,28,22,33,33,31,26,24,39,40,41,42,61,54,50,74,66,99,101,96,61,83,85,99,93,90,68,81,80,96,87,99,3,52,43,51,42,44],
    mdeaths: [1,0,2,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,1,1,0,1,2,1,0,1,2,3,0,6,2,6,7,2,2,6,6,2,2,3,6,3,1,12,6,4,4,2,4,3,3,7,6,7,6,1,3,3,4,7,4,0,3,5,5,2,10,0,2,2,12,6,2],
    hdeaths: [1,7,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,7,0,0,1,5,1,0,0,1,4,1,0,5,1,3,0,3,1,4,2,2,0,5,1,2,3,3,3,0,0,0,1,0,1,0,0,4,1,0,2,0,0,3,4,17,11,0,1,3,1,0,3,1,6,2,2],
    successful: [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,1,0,0,2,0,3,2,1,3,3,4,1,3,5,5,3,2,1,9,8,7,10,15,21,8,16,18,17,24,24,32,33,36,47,52,53,74,73,49,55,70,65,69,72,11,0,73,67,80,79,3,40,39,46,40,43],
    unsuccessful: [1,1,1,1,1,1,1,1,1,1,2,3,0,0,1,1,2,0,1,1,1,2,1,4,1,2,2,0,3,1,0,1,1,3,5,4,5,7,8,11,13,16,11,20,15,23,18,10,18,8,21,23,17,18,29,21,14,27,14,46,27,23,12,28,15,34,24,18,57,81,7,29,7,20,0,12,4,5,2,1],
    summitMembers: [0,0,0,0,0,0,0,0,0,0,0,0,1,4,0,3,0,5,0,8,0,0,0,0,3,0,0,7,0,13,4,1,21,14,7,3,14,20,14,19,4,1,39,14,58,30,68,75,29,54,57,54,72,71,83,108,90,134,169,160,240,314,232,229,258,251,279,312,54,0,313,320,400,397,22,191,279,291,366,371],
    summitHired: [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,3,0,2,0,1,4,6,1,2,4,3,2,11,0,1,11,10,14,8,22,54,22,28,41,31,47,45,62,74,68,130,166,147,243,297,196,234,274,290,295,367,79,0,365,360,450,502,27,271,425,394,504,493]
};

// Summit days data
const summitDaysData = {
    years: [1921,1922,1924,1933,1934,1935,1936,1938,1947,1950,1951,1952,1953,1956,1958,1960,1962,1963,1965,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
    avgDays: [90.0,26.0,41.0,43.0,40.0,6.0,18.0,63.0,7.0,3.0,16.5,41.0,47.0,46.0,4.0,58.5,51.5,41.0,59.0,27.5,46.5,52.5,59.5,53.5,36.0,56.0,48.0,49.0,42.7,31.6,52.4,48.0,47.2,40.9,46.5,42.5,37.3,51.9,46.0,44.5,40.8,38.5,39.1,42.1,38.4,41.5,33.6,36.5,40.5,35.9,38.8,40.8,37.3,41.7,37.7,43.2,34.4,32.7,37.6,32.3,35.4,29.8,34.7,32.5,20.5,10.2,31.0,31.9,30.1,32.6,35.0,29.6,25.1,29.8,24.8,23.6]
};

// Agency summit data
const agencySummitData = {
    topAgencies: ['8K Expeditions', 'Pioneer Adventure', 'Holy Mountain Adventure', 'Everest Parivar', 'Peak Promotion', 'Rolwaling Excursion', 'Sherpa Shangri-La Trekking', 'Rolwaling Trek', 'Active Holiday Nepal Treks', 'Beyul Adventure'],
    topRates: [100.0, 92.3, 89.5, 89.2, 85.7, 85.2, 85.2, 85.0, 83.3, 83.3],
    topExpeditions: [12, 13, 19, 37, 42, 27, 27, 20, 12, 18],
    bottomAgencies: ['Bochi Bochi Treks', 'World Records Expeditions', 'Kunga', 'Monterosa Treks', 'Everest Trekking', 'Mountain Travel', 'Thamserku Trekking', 'Asian Trekking', 'Nomad Expeditions', 'Prestige Adventure'],
    bottomRates: [8.3, 40.0, 41.7, 43.6, 50.0, 55.0, 56.0, 57.3, 57.9, 59.1],
    bottomExpeditions: [12, 10, 12, 55, 10, 20, 141, 281, 19, 22]
};

// Host country data
const hostCountryData = {
    years: [1921,1922,1924,1933,1934,1935,1936,1938,1947,1950,1951,1952,1953,1956,1958,1960,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
    nepal: [0,0,0,0,0,0,0,0,0,1,1,2,1,1,0,1,2,1,0,1,0,0,0,3,2,2,2,2,2,3,2,2,3,4,6,3,5,5,8,7,6,6,11,14,15,21,24,19,9,4,18,15,15,15,30,21,19,37,27,42,33,35,59,53,48,61,66,72,52,60,51,67,65,72,0,51,41,48,36,38],
    china: [1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1,2,1,1,0,0,0,0,1,1,0,0,1,2,3,2,3,7,5,7,9,11,9,14,7,12,9,12,17,20,21,25,26,27,31,33,31,37,39,57,68,61,2,30,37,38,27,18,16,21,29,29,22,27,3,1,2,3,6,6]
};

// Host country summits data
const hostCountrySummitsData = {
    countries: ['Nepal (South)', 'China (North)'],
    summitMembers: [4529, 2121],
    summitHired: [5217, 1873]
};

// Main routes data
const mainRoutesData = {
    routes: ['S Col-SE Ridge', 'N Col-NE Ridge'],
    expeditions: [1346, 790],
    summitMembers: [4424, 2047],
    summitHired: [5174, 1849]
};

// Other routes data
const otherRoutesData = {
    routes: ['N Face (Great Couloir)', 'S Pillar-SE Ridge', 'SW Face', 'N Col', 'N Face (Hornbein Couloir)', 'Lho La-W Ridge', 'NE Ridge', 'SW Face (Bonington rte)', 'N Face (Japanese & Hornbein)', 'W Ridge from N'],
    expeditions: [13, 13, 12, 10, 10, 9, 9, 9, 7, 6],
    summitMembers: [4, 24, 0, 0, 0, 5, 3, 8, 3, 0],
    summitHired: [0, 16, 0, 0, 0, 0, 5, 2, 2, 0]
};

// Route death data
const routeData = {
    routes: ['Lho La-W Ridge', 'NE Ridge', 'N Face (Japanese & Hornbein)', 'SW Face', 'N Face (Great Couloir)', 'S Col-SE Ridge', 'N Face (Hornbein Couloir)', 'N Col', 'N Col-NE Ridge', 'S Pillar-SE Ridge'],
    expeditions: [9, 9, 7, 12, 13, 1346, 10, 10, 790, 13],
    totalClimbers: [246, 152, 78, 247, 151, 20852, 116, 122, 9110, 271],
    totalDeaths: [9, 4, 2, 5, 3, 182, 1, 1, 72, 2],
    deathRate: [3.66, 2.63, 2.56, 2.02, 1.99, 0.87, 0.86, 0.82, 0.79, 0.74]
};

// Route summit days data (last 5 years)
const routeSummitDaysData = {
    routes: ['S Col-SE Ridge', 'N Col-NE Ridge'],
    medianDays: [28.0, 21.5],
    expeditions: [209, 16]
};

// Campsite elevation data
const campsiteData = {
    camps: ['BC', 'C1', 'C2', 'C3', 'C4'],
    routes: [
        { name: 'N Face (Great Couloir)', heights: [5167, 5895, 6637, 7225, 7725] },
        { name: 'S Pillar-SE Ridge', heights: [5348, 6093, 6438, 7300, 7933] },
        { name: 'SW Face', heights: [5345, 6063, 6466, 7120, 7637] },
        { name: 'N Col', heights: [5076, 5765, 6017, 6462, 7000] },
        { name: 'N Face (Hornbein Couloir)', heights: [5384, 6294, 7050, 7300, 7950] },
        { name: 'Lho La-W Ridge', heights: [5360, 6023, 6651, 6718, 7578] },
        { name: 'NE Ridge', heights: [5172, 6717, 7146, 8100, 7089] },
        { name: 'SW Face (Bonington rte)', heights: [5361, 6065, 6473, 7122, 7649] },
        { name: 'N Face (Japanese & Hornbein)', heights: [5545, 6165, 6950, 7733, 7900] },
        { name: 'W Ridge from N', heights: [5248, 5690, 6162, 6887, 7338] }
    ]
};

// Full campsite data with all camps
const fullCampsiteData = {
    'N Face (Great Couloir)': { camps: ["BC", "ABC", "C1", "C2", "C3", "C4", "C5", "C6"], heights: [5167, 5789, 5895, 6637, 7225, 7725, 7865, 8080] },
    'S Pillar-SE Ridge': { camps: ["BC", "C1", "C2", "C3", "C4", "C5"], heights: [5348, 6093, 6438, 7300, 7933, 8175] },
    'SW Face': { camps: ["BC", "C1", "C2", "C3", "C4", "C5", "C6"], heights: [5345, 6063, 6466, 7120, 7637, 8147, 8243] },
    'N Col': { camps: ["BC", "C1", "C2", "ABC", "C3", "C4"], heights: [5076, 5765, 6017, 6400, 6462, 7000] },
    'N Face (Hornbein Couloir)': { camps: ["BC", "ABC", "C1", "C2", "C3", "C4", "C5"], heights: [5384, 5887, 6294, 7050, 7300, 7950, 8200] },
    'Lho La-W Ridge': { camps: ["BC", "C1", "C2", "C3", "C4", "C5"], heights: [5360, 6023, 6651, 6718, 7578, 8164] },
    'NE Ridge': { camps: ["BC", "ABC", "C1", "C4", "C2", "C5", "C3", "C6"], heights: [5172, 6413, 6717, 7089, 7146, 7750, 8100, 8236] },
    'SW Face (Bonington rte)': { camps: ["BC", "C1", "C2", "C3", "C4", "C5", "C6"], heights: [5361, 6065, 6473, 7122, 7649, 8116, 8300] },
    'N Face (Japanese & Hornbein)': { camps: ["BC", "ABC", "C1", "C2", "C3", "C4", "C5"], heights: [5545, 5790, 6165, 6950, 7733, 7900, 8250] },
    'W Ridge from N': { camps: ["BC", "ABC", "C1", "C2", "C3", "C4", "C5", "C6"], heights: [5248, 5631, 5690, 6162, 6887, 7338, 7627, 8125] }
};

const everestSummit = 8849;

// Descent types data
const descentTypesData = {
    years: [1963, 1970, 1978, 1984, 1987, 1988, 1989, 1990, 1992, 1993, 1994, 1996, 1997, 2000, 2001, 2002, 2003, 2005, 2006, 2007, 2009, 2011, 2017, 2019, 2023, 2025],
    ski: [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 2, 1, 4, 1, 3, 2, 2, 0, 0, 1, 2, 0],
    parapente: [0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    traverse: [1, 0, 0, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 4, 2, 0, 0, 1, 0, 0, 1],
    skiDeaths: [0, 6, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 2, 0],
    paraDeaths: [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    traverseDeaths: [1, 0, 0, 1, 0, 5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

// Death cause data
const deathCauseData = {
    causes: ["Avalanche", "Fall", "Altitude Sickness", "Exposure/Hypothermia", "Disappeared", "Heart/Cardiac", "Exhaustion", "Other", "Unknown", "Serac/Icefall", "Illness", "Drowning"],
    counts: [86, 75, 41, 39, 25, 20, 20, 13, 10, 9, 8, 2]
};

// Cause by year data
const causeByYearData = {
    years: [1921, 1922, 1924, 1934, 1952, 1960, 1962, 1963, 1966, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025],
    causes: ["Avalanche", "Fall", "Altitude Sickness", "Exposure/Hypothermia", "Exhaustion", "Heart/Cardiac", "Disappeared", "Serac/Icefall"],
    data: {
        'Avalanche': [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 6, 0, 0, 0, 3, 1, 0, 3, 0, 2, 1, 3, 1, 1, 5, 3, 0, 0, 0, 1, 0, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1, 0, 1, 1, 0, 0, 0, 15, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'Fall': [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 2, 1, 1, 1, 2, 3, 5, 2, 0, 1, 2, 2, 0, 1, 1, 5, 2, 2, 1, 3, 2, 2, 1, 3, 1, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 3, 0, 0, 1, 1, 1, 1, 2, 0, 2, 3, 0],
        'Altitude Sickness': [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 1, 0, 1, 1, 3, 3, 3, 1, 0, 2, 3, 0, 3, 0, 2, 4, 1, 1],
        'Exposure/Hypothermia': [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0, 0, 1, 2, 0, 1, 0, 7, 2, 1, 1, 0, 1, 0, 0, 6, 3, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0],
        'Exhaustion': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0, 0, 6, 2, 1, 0, 2, 1],
        'Heart/Cardiac': [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 2, 2, 0, 0, 2, 1, 2, 1, 0, 0, 0, 0, 2],
        'Disappeared': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 1, 4, 0, 1, 0, 1, 2, 0, 0, 1, 2, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 1, 0],
        'Serac/Icefall': [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0]
    }
};

// Termination reason data
const termReasonData = {
    labels: ['Bad Weather (Wind)', 'Personal Reasons', 'Illness/Health Issues', 'Snow/Icefall Conditions', 'Accident', 'Lack of Supplies', 'Loss of Morale', 'Permit Issues', 'Lack of Time', 'Claimed Success', 'Did Not Reach BC', 'Route Difficulties'],
    counts: [300, 160, 127, 84, 53, 50, 39, 15, 11, 4, 3, 1]
};

// Route termination data
const routeTermData = {
    reasons: ['Bad Weather', 'Snow/Icefall', 'Accident', 'Illness', 'Personal Reasons', 'Lack of Supplies'],
    routes: [
        { name: 'N Face (Great Couloir)', counts: [3, 5, 2, 0, 1, 0] },
        { name: 'S Pillar-SE Ridge', counts: [0, 1, 0, 1, 0, 1] },
        { name: 'SW Face', counts: [7, 0, 3, 0, 1, 1] },
        { name: 'N Col', counts: [2, 2, 1, 1, 1, 1] },
        { name: 'N Face (Hornbein Couloir)', counts: [4, 2, 1, 0, 3, 0] },
        { name: 'Lho La-W Ridge', counts: [3, 0, 2, 1, 0, 0] },
        { name: 'NE Ridge', counts: [3, 2, 2, 0, 0, 0] },
        { name: 'SW Face (Bonington rte)', counts: [2, 1, 2, 0, 1, 1] },
        { name: 'N Face (Japanese & Hornbein)', counts: [1, 2, 0, 2, 0, 0] },
        { name: 'W Ridge from N', counts: [3, 1, 0, 1, 0, 0] }
    ]
};

// Termination height scatter data
const termHeightData = {
    routes: ["N Face (Great Couloir)", "S Pillar-SE Ridge", "SW Face", "N Col", "N Face (Hornbein Couloir)", "Lho La-W Ridge", "NE Ridge", "SW Face (Bonington rte)", "N Face (Japanese & Hornbein)", "W Ridge from N"],
    reasons: ["Bad Weather", "Snow/Icefall", "Accident", "Illness", "Personal Reasons", "Lack of Supplies", "Loss of Morale", "Permit Issues"],
    points: [
        { routeIdx: 0, height: 7800, reason: 'Snow/Icefall' },
        { routeIdx: 0, height: 7775, reason: 'Bad Weather' },
        { routeIdx: 0, height: 8500, reason: 'Bad Weather' },
        { routeIdx: 0, height: 8300, reason: 'Bad Weather' },
        { routeIdx: 0, height: 8400, reason: 'Accident' },
        { routeIdx: 0, height: 8400, reason: 'Snow/Icefall' },
        { routeIdx: 0, height: 7400, reason: 'Snow/Icefall' },
        { routeIdx: 0, height: 8200, reason: 'Snow/Icefall' },
        { routeIdx: 0, height: 8400, reason: 'Accident' },
        { routeIdx: 0, height: 6400, reason: 'Personal Reasons' },
        { routeIdx: 0, height: 7350, reason: 'Snow/Icefall' },
        { routeIdx: 1, height: 8450, reason: 'Lack of Supplies' },
        { routeIdx: 1, height: 8700, reason: 'Illness' },
        { routeIdx: 1, height: 8600, reason: 'Snow/Icefall' },
        { routeIdx: 2, height: 7800, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8320, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8350, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8750, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8230, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8350, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8040, reason: 'Lack of Supplies' },
        { routeIdx: 2, height: 8000, reason: 'Accident' },
        { routeIdx: 2, height: 8400, reason: 'Bad Weather' },
        { routeIdx: 2, height: 8000, reason: 'Accident' },
        { routeIdx: 2, height: 7500, reason: 'Personal Reasons' },
        { routeIdx: 2, height: 7400, reason: 'Accident' },
        { routeIdx: 3, height: 7000, reason: 'Snow/Icefall' },
        { routeIdx: 3, height: 7000, reason: 'Personal Reasons' },
        { routeIdx: 3, height: 6900, reason: 'Accident' },
        { routeIdx: 3, height: 7000, reason: 'Bad Weather' },
        { routeIdx: 3, height: 6800, reason: 'Bad Weather' },
        { routeIdx: 3, height: 6800, reason: 'Lack of Supplies' },
        { routeIdx: 3, height: 7000, reason: 'Illness' },
        { routeIdx: 3, height: 7000, reason: 'Permit Issues' },
        { routeIdx: 3, height: 6400, reason: 'Permit Issues' },
        { routeIdx: 3, height: 5320, reason: 'Snow/Icefall' },
        { routeIdx: 4, height: 8100, reason: 'Bad Weather' },
        { routeIdx: 4, height: 8450, reason: 'Bad Weather' },
        { routeIdx: 4, height: 8700, reason: 'Snow/Icefall' },
        { routeIdx: 4, height: 7250, reason: 'Bad Weather' },
        { routeIdx: 4, height: 6860, reason: 'Accident' },
        { routeIdx: 4, height: 6300, reason: 'Personal Reasons' },
        { routeIdx: 4, height: 7400, reason: 'Snow/Icefall' },
        { routeIdx: 4, height: 7500, reason: 'Personal Reasons' },
        { routeIdx: 4, height: 8000, reason: 'Bad Weather' },
        { routeIdx: 5, height: 7100, reason: 'Bad Weather' },
        { routeIdx: 5, height: 8600, reason: 'Loss of Morale' },
        { routeIdx: 5, height: 8535, reason: 'Bad Weather' },
        { routeIdx: 5, height: 8750, reason: 'Illness' },
        { routeIdx: 5, height: 7300, reason: 'Bad Weather' },
        { routeIdx: 5, height: 8500, reason: 'Accident' },
        { routeIdx: 5, height: 6900, reason: 'Accident' },
        { routeIdx: 5, height: 7366, reason: 'Loss of Morale' },
        { routeIdx: 6, height: 8000, reason: 'Snow/Icefall' },
        { routeIdx: 6, height: 8100, reason: 'Bad Weather' },
        { routeIdx: 6, height: 8400, reason: 'Snow/Icefall' },
        { routeIdx: 6, height: 8360, reason: 'Accident' },
        { routeIdx: 6, height: 8350, reason: 'Bad Weather' },
        { routeIdx: 6, height: 8230, reason: 'Accident' },
        { routeIdx: 6, height: 7600, reason: 'Bad Weather' },
        { routeIdx: 7, height: 7800, reason: 'Bad Weather' },
        { routeIdx: 7, height: 7700, reason: 'Lack of Supplies' },
        { routeIdx: 7, height: 8300, reason: 'Accident' },
        { routeIdx: 7, height: 8350, reason: 'Snow/Icefall' },
        { routeIdx: 7, height: 7770, reason: 'Bad Weather' },
        { routeIdx: 7, height: 7800, reason: 'Personal Reasons' },
        { routeIdx: 7, height: 7200, reason: 'Accident' },
        { routeIdx: 8, height: 7850, reason: 'Illness' },
        { routeIdx: 8, height: 8650, reason: 'Bad Weather' },
        { routeIdx: 8, height: 8200, reason: 'Snow/Icefall' },
        { routeIdx: 8, height: 7000, reason: 'Snow/Icefall' },
        { routeIdx: 8, height: 8500, reason: 'Illness' },
        { routeIdx: 9, height: 8100, reason: 'Bad Weather' },
        { routeIdx: 9, height: 8550, reason: 'Bad Weather' },
        { routeIdx: 9, height: 7800, reason: 'Illness' },
        { routeIdx: 9, height: 7800, reason: 'Loss of Morale' },
        { routeIdx: 9, height: 8200, reason: 'Bad Weather' },
        { routeIdx: 9, height: 8100, reason: 'Snow/Icefall' }
    ]
};

// Demographics - Country summits data
const countrySummitsData = {
    countries: ['Nepal', 'USA', 'China', 'India', 'UK', 'Japan', 'South Korea', 'France', 'Australia', 'Germany', 'Spain', 'Canada', 'Russia', 'Italy', 'Poland', 'Switzerland', 'Ireland', 'New Zealand', 'Austria', 'Brazil'],
    summits: [4959, 886, 775, 666, 521, 370, 320, 308, 236, 217, 186, 185, 176, 174, 148, 143, 132, 118, 95, 90]
};

// Gender data
const genderData = {
    years: [1953,1975,1976,1978,1979,1983,1984,1985,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
    male: [2,2,4,24,18,22,14,29,47,22,68,36,86,123,48,77,92,79,113,109,138,172,148,251,319,290,456,580,406,440,508,517,548,647,127,0,648,646,810,857,49,438,671,653,831,821],
    female: [0,1,0,1,2,1,2,1,3,2,4,2,4,6,3,5,6,6,6,7,7,10,10,13,16,17,27,31,22,23,24,24,26,32,6,0,30,34,40,42,0,24,33,32,39,43]
};

// Age distribution data
const ageData = {
    ageGroups: ['10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84'],
    counts: [2, 149, 1016, 1795, 2156, 1897, 1516, 1084, 674, 360, 152, 54, 22, 5, 1]
};

// O2 usage data
const o2UsageData = {
    categories: ['Climbing', 'Sleeping', 'Descending'],
    usedO2: [1753, 1237, 67],
    noO2: [640, 1156, 2326]
};

// GeoJSON summit map data
const geoJsonSummitMap = {
    "Nepal": 4959, "United States of America": 886, "China": 775, "India": 666, "United Kingdom": 521,
    "Japan": 370, "South Korea": 320, "France": 308, "Australia": 236, "Germany": 217,
    "Spain": 186, "Canada": 185, "Russia": 176, "Italy": 174, "Poland": 148,
    "Switzerland": 143, "Ireland": 132, "New Zealand": 118, "Austria": 95, "Brazil": 90,
    "Mexico": 86, "Belgium": 83, "Netherlands": 80, "Sweden": 72, "Argentina": 70,
    "South Africa": 69, "Norway": 60, "Denmark": 54, "Czech Republic": 52, "Taiwan": 50,
    "Finland": 48, "Romania": 47, "Slovenia": 39, "Israel": 38, "Ukraine": 36,
    "Chile": 34, "Greece": 32, "Iran": 32, "Portugal": 29, "Ecuador": 28,
    "Hungary": 27, "Slovakia": 26, "Serbia": 25, "Turkey": 23, "Bulgaria": 22,
    "Hong Kong": 21, "Colombia": 20, "Malaysia": 18, "Luxembourg": 17, "Peru": 16,
    "Singapore": 16, "Lithuania": 15, "Croatia": 14, "Venezuela": 14, "Pakistan": 12,
    "Indonesia": 11, "Philippines": 11, "Saudi Arabia": 11, "Bangladesh": 10, "Bolivia": 10,
    "Iceland": 10, "Latvia": 10, "Thailand": 9, "Montenegro": 8, "Vietnam": 8,
    "Sri Lanka": 7, "Jordan": 6, "Kenya": 6, "United Arab Emirates": 6, "Costa Rica": 5,
    "Georgia": 5, "Kazakhstan": 5, "Morocco": 4, "Puerto Rico": 4, "North Macedonia": 3,
    "Cyprus": 2, "Estonia": 2, "Guatemala": 2, "Monaco": 2
};

// Summary statistics
const summaryStats = {
    totalExpeditions: data.expeditions.reduce((a, b) => a + b, 0),
    totalDeaths: data.mdeaths.reduce((a, b) => a + b, 0) + data.hdeaths.reduce((a, b) => a + b, 0),
    totalSummits: data.summitMembers.reduce((a, b) => a + b, 0) + data.summitHired.reduce((a, b) => a + b, 0),
    yearsSpan: '1921-2025',
    totalYears: 105,
    peakYear: 2006,
    peakExpeditions: 101,
    deadliestYear: 2015,
    deadliestYearDeaths: 19
};
