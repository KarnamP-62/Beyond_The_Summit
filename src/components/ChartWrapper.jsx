import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js'
import { Line, Bar, Scatter, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
)

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#10183A', padding: 15 } },
    tooltip: {
      backgroundColor: 'rgba(16, 24, 58, 0.9)',
      titleFont: { size: 14 },
      bodyFont: { size: 13 },
      padding: 12
    }
  },
  scales: {
    x: {
      ticks: { color: '#10183A' },
      grid: { display: false }
    },
    y: {
      ticks: { color: '#10183A' },
      grid: { color: 'rgba(0, 80, 141, 0.1)' },
      beginAtZero: true
    }
  }
}

export function LineChart({ data, options = {}, hideLegend = false, horizontal = false }) {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins,
      legend: hideLegend ? { display: false } : defaultOptions.plugins.legend
    }
  }

  return (
    <div className="chart-wrapper">
      <Line data={data} options={mergedOptions} />
    </div>
  )
}

export function BarChart({ data, options = {}, stacked = false, horizontal = false, hideLegend = false }) {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    indexAxis: horizontal ? 'y' : 'x',
    plugins: {
      ...defaultOptions.plugins,
      legend: hideLegend ? { display: false } : defaultOptions.plugins.legend
    },
    scales: {
      ...defaultOptions.scales,
      x: {
        ...defaultOptions.scales.x,
        ...options.scales?.x,
        stacked: stacked,
        ticks: {
          ...defaultOptions.scales.x.ticks,
          ...options.scales?.x?.ticks
        }
      },
      y: {
        ...defaultOptions.scales.y,
        ...options.scales?.y,
        stacked: stacked
      }
    }
  }

  return (
    <div className="chart-wrapper">
      <Bar data={data} options={mergedOptions} />
    </div>
  )
}

export function ScatterChart({ data, options = {} }) {
  const mergedOptions = {
    ...defaultOptions,
    ...options
  }

  return (
    <div className="chart-wrapper">
      <Scatter data={data} options={mergedOptions} />
    </div>
  )
}

export function AreaChart({ data, options = {}, hideLegend = false }) {
  const areaData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      fill: true,
      tension: 0.4,
      backgroundColor: dataset.backgroundColor || 'rgba(0, 80, 141, 0.3)',
      borderColor: dataset.borderColor || 'rgba(0, 80, 141, 0.8)',
      borderWidth: 2,
      pointRadius: 0
    }))
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      legend: hideLegend ? { display: false } : defaultOptions.plugins.legend
    }
  }

  return (
    <div className="chart-wrapper">
      <Line data={areaData} options={mergedOptions} />
    </div>
  )
}

export function VerticalLineChart({ data, options = {} }) {
  // Transform data: swap x and y so years are on Y-axis
  const transformedData = {
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: data.labels.map((label, i) => ({
        x: dataset.data[i],
        y: parseInt(label) || i
      })),
      showLine: true,
      tension: 0.3
    }))
  }

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      legend: { display: false }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'top',
        ticks: { color: '#10183A' },
        grid: { color: 'rgba(0, 80, 141, 0.1)' },
        title: {
          display: true,
          text: 'Expeditions Over Time (1921-2025)',
          color: '#00508D',
          font: { size: 12 }
        }
      },
      y: {
        type: 'linear',
        reverse: false,
        ticks: {
          color: '#10183A',
          stepSize: 5
        },
        grid: { display: false },
        min: Math.min(...data.labels.map(l => parseInt(l))),
        max: Math.max(...data.labels.map(l => parseInt(l)))
      }
    }
  }

  return (
    <div className="chart-wrapper">
      <Scatter data={transformedData} options={mergedOptions} />
    </div>
  )
}

export function PieChart({ data, options = {}, legendPosition = 'right' }) {
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: '#10183A',
          padding: 15,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(16, 24, 58, 0.9)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12
      }
    },
    ...options
  }

  return (
    <div className="chart-wrapper">
      <Pie data={data} options={pieOptions} />
    </div>
  )
}
