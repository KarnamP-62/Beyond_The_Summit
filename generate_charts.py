import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np

# Set dark theme style
plt.style.use('dark_background')

# Custom colors matching the web theme
BLUE = '#3498db'
GREEN = '#2ecc71'
RED = '#e74c3c'
ORANGE = '#f39c12'
YELLOW = '#ffc107'
PURPLE = '#9b59b6'
CYAN = '#1abc9c'
PINK = '#e91e63'

# Data from the analysis
data = {
    'years': [1921,1922,1924,1933,1934,1935,1936,1938,1947,1950,1951,1952,1953,1956,1958,1960,1962,1963,1964,1965,1966,1967,1968,1969,1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025],
    'expeditions': [1,1,1,1,1,1,1,1,1,1,2,3,1,1,1,2,2,1,1,2,1,2,1,4,2,2,2,2,3,4,2,2,4,6,9,5,8,12,13,14,15,17,20,28,22,33,33,31,26,24,39,40,41,42,61,54,50,74,66,99,101,96,61,83,85,99,93,90,68,81,80,96,87,99,3,52,43,51,42,44],
    'mdeaths': [1,0,2,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,1,1,0,1,2,1,0,1,2,3,0,6,2,6,7,2,2,6,6,2,2,3,6,3,1,12,6,4,4,2,4,3,3,7,6,7,6,1,3,3,4,7,4,0,3,5,5,2,10,0,2,2,12,6,2],
    'hdeaths': [1,7,2,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,1,7,0,0,1,5,1,0,0,1,4,1,0,5,1,3,0,3,1,4,2,2,0,5,1,2,3,3,3,0,0,0,1,0,1,0,0,4,1,0,2,0,0,3,4,17,11,0,1,3,1,0,3,1,6,2,2],
    'successful': [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,1,0,0,2,0,3,2,1,3,3,4,1,3,5,5,3,2,1,9,8,7,10,15,21,8,16,18,17,24,24,32,33,36,47,52,53,74,73,49,55,70,65,69,72,11,0,73,67,80,79,3,40,39,46,40,43],
    'unsuccessful': [1,1,1,1,1,1,1,1,1,1,2,3,0,0,1,1,2,0,1,1,1,2,1,4,1,2,2,0,3,1,0,1,1,3,5,4,5,7,8,11,13,16,11,20,15,23,18,10,18,8,21,23,17,18,29,21,14,27,14,46,27,23,12,28,15,34,24,18,57,81,7,29,7,20,0,12,4,5,2,1],
    'summitMembers': [0,0,0,0,0,0,0,0,0,0,0,0,1,4,0,3,0,5,0,8,0,0,0,0,3,0,0,7,0,13,4,1,21,14,7,3,14,20,14,19,4,1,39,14,58,30,68,75,29,54,57,54,72,71,83,108,90,134,169,160,240,314,232,229,258,251,279,312,54,0,313,320,400,397,22,191,279,291,366,371],
    'summitHired': [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,0,3,0,2,0,1,4,6,1,2,4,3,2,11,0,1,11,10,14,8,22,54,22,28,41,31,47,45,62,74,68,130,166,147,243,297,196,234,274,290,295,367,79,0,365,360,450,502,27,271,425,394,504,493]
}

hostCountryData = {
    'years': data['years'],
    'nepal': [0,0,0,0,0,0,0,0,0,1,1,2,1,1,0,1,2,1,0,1,0,0,0,3,2,2,2,2,2,3,2,2,3,4,6,3,5,5,8,7,6,6,11,14,15,21,24,19,9,4,18,15,15,15,30,21,19,37,27,42,33,35,59,53,48,61,66,72,52,60,51,67,65,72,0,51,41,48,36,38],
    'china': [1,1,1,1,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,1,1,2,1,1,0,0,0,0,1,1,0,0,1,2,3,2,3,7,5,7,9,11,9,14,7,12,9,12,17,20,21,25,26,27,31,33,31,37,39,57,68,61,2,30,37,38,27,18,16,21,29,29,22,27,3,1,2,3,6,6]
}

deathCauseData = {
    'causes': ["Avalanche", "Fall", "Altitude Sickness", "Exposure/Hypothermia", "Disappeared", "Heart/Cardiac", "Exhaustion", "Other", "Unknown", "Serac/Icefall", "Illness", "Drowning"],
    'counts': [86, 75, 41, 39, 25, 20, 20, 13, 10, 9, 8, 2]
}

routeData = {
    'routes': ['Lho La-W Ridge', 'NE Ridge', 'N Face (Jap & Hornbein)', 'SW Face', 'N Face (Great Couloir)', 'S Col-SE Ridge', 'N Face (Hornbein)', 'N Col', 'N Col-NE Ridge', 'S Pillar-SE Ridge'],
    'expeditions': [9, 9, 7, 12, 13, 1346, 10, 10, 790, 13],
    'totalDeaths': [9, 4, 2, 5, 3, 182, 1, 1, 72, 2],
    'deathRate': [3.66, 2.63, 2.56, 2.02, 1.99, 0.87, 0.86, 0.82, 0.79, 0.74]
}

mainRoutesData = {
    'routes': ['S Col-SE Ridge', 'N Col-NE Ridge'],
    'expeditions': [1346, 790],
    'summitMembers': [4424, 2047],
    'summitHired': [5174, 1849]
}

termReasonData = {
    'labels': ['Bad Weather', 'Personal Reasons', 'Illness/Health', 'Snow/Icefall', 'Accident', 'Lack of Supplies', 'Loss of Morale', 'Permit Issues', 'Lack of Time', 'Claimed Success', 'Did Not Reach BC', 'Route Difficulties'],
    'counts': [300, 160, 127, 84, 53, 50, 39, 15, 11, 4, 3, 1]
}

agencySummitData = {
    'topAgencies': ['8K Expeditions', 'Pioneer Adventure', 'Holy Mountain', 'Everest Parivar', 'Peak Promotion', 'Rolwaling Excursion', 'Sherpa Shangri-La', 'Rolwaling Trek', 'Active Holiday', 'Beyul Adventure'],
    'topRates': [100.0, 92.3, 89.5, 89.2, 85.7, 85.2, 85.2, 85.0, 83.3, 83.3],
    'bottomAgencies': ['Bochi Bochi Treks', 'World Records Exp', 'Kunga', 'Monterosa Treks', 'Everest Trekking', 'Mountain Travel', 'Thamserku', 'Asian Trekking', 'Nomad Expeditions', 'Prestige Adventure'],
    'bottomRates': [8.3, 40.0, 41.7, 43.6, 50.0, 55.0, 56.0, 57.3, 57.9, 59.1]
}


def save_fig(fig, filename):
    """Save figure with tight layout"""
    fig.tight_layout()
    fig.savefig(filename, dpi=150, bbox_inches='tight', facecolor='#1a1a2e')
    plt.close(fig)
    print(f"Saved: {filename}")


# 1. Expeditions Over Time
fig, ax = plt.subplots(figsize=(14, 6))
ax.plot(data['years'], data['expeditions'], marker='o', linewidth=2, markersize=4, color=BLUE)
ax.fill_between(data['years'], data['expeditions'], alpha=0.1, color=BLUE)
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Expeditions', fontsize=12)
ax.set_title('Everest Expeditions Over the Years', fontsize=14, fontweight='bold')
ax.grid(True, alpha=0.3)
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_expeditions_trend.png')


# 2. Success vs Unsuccessful Expeditions (Stacked Bar)
fig, ax = plt.subplots(figsize=(14, 6))
x = np.arange(len(data['years']))
width = 0.8
ax.bar(x, data['successful'], width, label='Successful', color=GREEN, alpha=0.7)
ax.bar(x, data['unsuccessful'], width, bottom=data['successful'], label='Unsuccessful', color=RED, alpha=0.7)
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Expeditions', fontsize=12)
ax.set_title('Expedition Success Rate Over Time', fontsize=14, fontweight='bold')
ax.set_xticks(x[::5])
ax.set_xticklabels([data['years'][i] for i in range(0, len(data['years']), 5)])
ax.legend()
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_success_rate.png')


# 3. Summit Members vs Hired (Stacked Bar)
fig, ax = plt.subplots(figsize=(14, 6))
x = np.arange(len(data['years']))
ax.bar(x, data['summitMembers'], width, label='Summit - Members', color=GREEN, alpha=0.7)
ax.bar(x, data['summitHired'], width, bottom=data['summitMembers'], label='Summit - Hired (Sherpas)', color=ORANGE, alpha=0.7)
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Summits', fontsize=12)
ax.set_title('Summit Members vs Hired Staff Over Time', fontsize=14, fontweight='bold')
ax.set_xticks(x[::5])
ax.set_xticklabels([data['years'][i] for i in range(0, len(data['years']), 5)])
ax.legend()
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_summit_members.png')


# 4. Deaths Over Time (Stacked Area)
fig, ax = plt.subplots(figsize=(14, 6))
ax.stackplot(data['years'], data['mdeaths'], data['hdeaths'],
             labels=['Member Deaths', 'Hired Staff Deaths'],
             colors=[RED, ORANGE], alpha=0.7)
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Deaths', fontsize=12)
ax.set_title('Deaths on Everest Over Time', fontsize=14, fontweight='bold')
ax.legend(loc='upper left')
ax.grid(True, alpha=0.3)
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_deaths_trend.png')


# 5. Host Country Comparison (Nepal vs China)
fig, ax = plt.subplots(figsize=(14, 6))
x = np.arange(len(hostCountryData['years']))
ax.bar(x, hostCountryData['nepal'], width, label='Nepal (South)', color='#dc3545', alpha=0.7)
ax.bar(x, hostCountryData['china'], width, bottom=hostCountryData['nepal'], label='China (North)', color=YELLOW, alpha=0.7)
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Expeditions', fontsize=12)
ax.set_title('Expeditions by Host Country (Nepal vs China)', fontsize=14, fontweight='bold')
ax.set_xticks(x[::5])
ax.set_xticklabels([hostCountryData['years'][i] for i in range(0, len(hostCountryData['years']), 5)])
ax.legend()
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_host_country.png')


# 6. Death Causes (Horizontal Bar)
fig, ax = plt.subplots(figsize=(10, 8))
colors = plt.cm.Reds(np.linspace(0.3, 0.9, len(deathCauseData['causes'])))[::-1]
y_pos = np.arange(len(deathCauseData['causes']))
ax.barh(y_pos, deathCauseData['counts'], color=colors)
ax.set_yticks(y_pos)
ax.set_yticklabels(deathCauseData['causes'])
ax.set_xlabel('Number of Deaths', fontsize=12)
ax.set_title('Causes of Death on Everest', fontsize=14, fontweight='bold')
ax.invert_yaxis()
ax.grid(True, alpha=0.3, axis='x')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_death_causes.png')


# 7. Route Death Rate (Horizontal Bar)
fig, ax = plt.subplots(figsize=(10, 8))
colors = plt.cm.RdYlGn_r(np.linspace(0.2, 0.8, len(routeData['routes'])))
y_pos = np.arange(len(routeData['routes']))
ax.barh(y_pos, routeData['deathRate'], color=colors)
ax.set_yticks(y_pos)
ax.set_yticklabels(routeData['routes'])
ax.set_xlabel('Death Rate (%)', fontsize=12)
ax.set_title('Death Rate by Route (Routes with 5+ Expeditions)', fontsize=14, fontweight='bold')
ax.invert_yaxis()
ax.grid(True, alpha=0.3, axis='x')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_route_death_rate.png')


# 8. Main Routes Comparison (Pie Chart)
fig, ax = plt.subplots(figsize=(10, 8))
sizes = mainRoutesData['expeditions']
labels = mainRoutesData['routes']
colors = ['#dc3545', YELLOW]
explode = (0.05, 0)
ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%',
       shadow=True, startangle=90, textprops={'fontsize': 12})
ax.set_title('Main Routes Distribution (by Expeditions)', fontsize=14, fontweight='bold')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_main_routes.png')


# 9. Termination Reasons (Horizontal Bar)
fig, ax = plt.subplots(figsize=(10, 8))
colors = plt.cm.Blues(np.linspace(0.3, 0.9, len(termReasonData['labels'])))[::-1]
y_pos = np.arange(len(termReasonData['labels']))
ax.barh(y_pos, termReasonData['counts'], color=colors)
ax.set_yticks(y_pos)
ax.set_yticklabels(termReasonData['labels'])
ax.set_xlabel('Number of Expeditions', fontsize=12)
ax.set_title('Reasons for Expedition Termination', fontsize=14, fontweight='bold')
ax.invert_yaxis()
ax.grid(True, alpha=0.3, axis='x')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_termination_reasons.png')


# 10. Top Agencies by Success Rate
fig, ax = plt.subplots(figsize=(12, 6))
x = np.arange(len(agencySummitData['topAgencies']))
ax.bar(x, agencySummitData['topRates'], color=GREEN, alpha=0.8)
ax.set_xlabel('Agency', fontsize=12)
ax.set_ylabel('Success Rate (%)', fontsize=12)
ax.set_title('Top 10 Agencies by Success Rate (min 10 expeditions)', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(agencySummitData['topAgencies'], rotation=45, ha='right')
ax.set_ylim(0, 105)
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_top_agencies.png')


# 11. Bottom Agencies by Success Rate
fig, ax = plt.subplots(figsize=(12, 6))
x = np.arange(len(agencySummitData['bottomAgencies']))
ax.bar(x, agencySummitData['bottomRates'], color=RED, alpha=0.8)
ax.set_xlabel('Agency', fontsize=12)
ax.set_ylabel('Success Rate (%)', fontsize=12)
ax.set_title('Bottom 10 Agencies by Success Rate (min 10 expeditions)', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(agencySummitData['bottomAgencies'], rotation=45, ha='right')
ax.set_ylim(0, 105)
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_bottom_agencies.png')


# 12. Combined Deaths Line Chart
fig, ax = plt.subplots(figsize=(14, 6))
total_deaths = [m + h for m, h in zip(data['mdeaths'], data['hdeaths'])]
ax.plot(data['years'], total_deaths, marker='o', linewidth=2, markersize=4, color=RED, label='Total Deaths')
ax.plot(data['years'], data['mdeaths'], marker='s', linewidth=1.5, markersize=3, color=ORANGE, alpha=0.7, label='Member Deaths')
ax.plot(data['years'], data['hdeaths'], marker='^', linewidth=1.5, markersize=3, color=PURPLE, alpha=0.7, label='Hired Staff Deaths')
ax.set_xlabel('Year', fontsize=12)
ax.set_ylabel('Number of Deaths', fontsize=12)
ax.set_title('Deaths on Everest by Category', fontsize=14, fontweight='bold')
ax.legend()
ax.grid(True, alpha=0.3)
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_deaths_by_category.png')


# 13. Route Total Deaths (Horizontal Bar)
fig, ax = plt.subplots(figsize=(10, 8))
colors = plt.cm.Reds(np.linspace(0.3, 0.9, len(routeData['routes'])))[::-1]
y_pos = np.arange(len(routeData['routes']))
ax.barh(y_pos, routeData['totalDeaths'], color=colors)
ax.set_yticks(y_pos)
ax.set_yticklabels(routeData['routes'])
ax.set_xlabel('Total Deaths', fontsize=12)
ax.set_title('Total Deaths by Route', fontsize=14, fontweight='bold')
ax.invert_yaxis()
ax.grid(True, alpha=0.3, axis='x')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_route_total_deaths.png')


# 14. Host Country Summit Comparison (Grouped Bar)
fig, ax = plt.subplots(figsize=(10, 6))
countries = ['Nepal (South)', 'China (North)']
summit_members = [4529, 2121]
summit_hired = [5217, 1873]
x = np.arange(len(countries))
width = 0.35
bars1 = ax.bar(x - width/2, summit_members, width, label='Summit Members', color=GREEN)
bars2 = ax.bar(x + width/2, summit_hired, width, label='Summit Hired', color=ORANGE)
ax.set_xlabel('Host Country', fontsize=12)
ax.set_ylabel('Number of Summits', fontsize=12)
ax.set_title('Summit Statistics by Host Country', fontsize=14, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(countries)
ax.legend()
ax.grid(True, alpha=0.3, axis='y')
ax.set_facecolor('#1a1a2e')
fig.set_facecolor('#1a1a2e')
save_fig(fig, 'chart_host_country_summits.png')


print("\n=== All charts have been saved as PNG files ===")
