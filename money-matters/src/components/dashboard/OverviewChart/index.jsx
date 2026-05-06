// src/components/dashboard/OverviewChart/index.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { buildMonthlyChartData, buildPieData } from '../../../utils/chartData'
import { CHART_COLORS } from '../../../utils/constants'
import './OverviewChart.css'

const OverviewChart = ({ transactions = [] }) => {
  const barData = buildMonthlyChartData(transactions)
  const pieData = buildPieData(transactions)

  return (
    <div className="overview-chart-container">
      <h2 className="section-title">Financial Overview</h2>

      <div className="chart-wrapper">
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
          Monthly Breakdown
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
            <YAxis tick={{ fontSize: 12, fill: 'var(--text-secondary)' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="credit" name="Income" fill={CHART_COLORS.CREDIT} radius={[4, 4, 0, 0]} />
            <Bar dataKey="debit" name="Expenses" fill={CHART_COLORS.DEBIT} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-wrapper">
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 12 }}>
          Income vs Expenses
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              <Cell fill={CHART_COLORS.CREDIT} />
              <Cell fill={CHART_COLORS.DEBIT} />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default OverviewChart
