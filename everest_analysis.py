import pandas as pd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

# Load expeditions data
expeditions = pd.read_csv('expeditions.csv', low_memory=False)

# Filter for Everest data only (PEAKID = 'EVER')
everest_data = expeditions[expeditions['PEAKID'] == 'EVER']

print(f"Total expeditions in dataset: {len(expeditions)}")
print(f"Everest expeditions: {len(everest_data)}")

# Analyze expeditions by year
expeditions_by_year = everest_data.groupby('YEAR').size().reset_index(name='num_expeditions')

# Analyze deaths by year
deaths_by_year = everest_data.groupby('YEAR').agg({
    'MDEATHS': 'sum',
    'HDEATHS': 'sum'
}).reset_index()

# Merge the data
yearly_stats = expeditions_by_year.merge(deaths_by_year, on='YEAR')
print(f"\nYearly statistics:")
print(yearly_stats.to_string())

# Print data for JavaScript
print(f"\nMDEATHS array: {yearly_stats['MDEATHS'].tolist()}")
print(f"\nHDEATHS array: {yearly_stats['HDEATHS'].tolist()}")

# ============================================
# ROUTE ANALYSIS - Deaths by Route
# ============================================
print("\n" + "="*60)
print("ROUTE ANALYSIS - Deaths and Death Rate by Route")
print("="*60)

# Get total members and hired per expedition
everest_data['TOTAL_DEATHS'] = everest_data['MDEATHS'] + everest_data['HDEATHS']
everest_data['TOTAL_CLIMBERS'] = everest_data['TOTMEMBERS'] + everest_data['TOTHIRED']

# Group by ROUTE1 (primary route)
route_stats = everest_data.groupby('ROUTE1').agg({
    'EXPID': 'count',  # Number of expeditions
    'TOTMEMBERS': 'sum',
    'TOTHIRED': 'sum',
    'MDEATHS': 'sum',
    'HDEATHS': 'sum',
    'TOTAL_DEATHS': 'sum',
    'TOTAL_CLIMBERS': 'sum'
}).reset_index()

route_stats.columns = ['Route', 'Expeditions', 'Total_Members', 'Total_Hired', 'Member_Deaths', 'Hired_Deaths', 'Total_Deaths', 'Total_Climbers']

# Calculate death percentage
route_stats['Death_Rate_Percent'] = (route_stats['Total_Deaths'] / route_stats['Total_Climbers'] * 100).round(2)

# Sort by total deaths descending
route_stats_sorted = route_stats.sort_values('Total_Deaths', ascending=False)

# Filter routes with at least some expeditions for meaningful analysis
route_stats_significant = route_stats_sorted[route_stats_sorted['Expeditions'] >= 5]

print("\nRoutes with most deaths (min 5 expeditions):")
print(route_stats_significant[['Route', 'Expeditions', 'Total_Climbers', 'Total_Deaths', 'Death_Rate_Percent']].head(15).to_string(index=False))

# Top routes by death rate (with minimum expeditions)
route_stats_by_rate = route_stats_significant.sort_values('Death_Rate_Percent', ascending=False)
print("\n\nRoutes with highest death rate (min 5 expeditions):")
print(route_stats_by_rate[['Route', 'Expeditions', 'Total_Climbers', 'Total_Deaths', 'Death_Rate_Percent']].head(15).to_string(index=False))

# Export for JavaScript
top_routes = route_stats_significant.head(10)
print(f"\n\nFor JavaScript:")
print(f"routes: {top_routes['Route'].tolist()}")
print(f"expeditions: {top_routes['Expeditions'].tolist()}")
print(f"totalClimbers: {top_routes['Total_Climbers'].tolist()}")
print(f"totalDeaths: {top_routes['Total_Deaths'].tolist()}")
print(f"deathRate: {top_routes['Death_Rate_Percent'].tolist()}")

# Plot the trend
plt.figure(figsize=(14, 6))
plt.plot(expeditions_by_year['YEAR'], expeditions_by_year['num_expeditions'], marker='o', linewidth=2, markersize=4)
plt.xlabel('Year')
plt.ylabel('Number of Expeditions')
plt.title('Everest Expeditions Over the Years')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('everest_expeditions_trend.png', dpi=150)
print("\nChart saved as 'everest_expeditions_trend.png'")
