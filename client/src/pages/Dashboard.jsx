import { useEffect, useState } from 'react';
import axios from '../services/axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [volumeOverTime, setVolumeOverTime] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/workouts');

      const totals = {};
      res.data.forEach(w =>
        w.exercises.forEach(ex =>
          ex.sets.forEach(set => {
            const volume = set.weight * set.reps;
            totals[ex.muscleGroup] = (totals[ex.muscleGroup] || 0) + volume;
          })
        )
      );
      setChartData(Object.entries(totals).map(([group, total]) => ({ group, total })));

      const volumeMap = {};
      res.data.forEach(w => {
        const date = new Date(w.date).toLocaleDateString();
        const totalVolume = w.exercises.reduce((sum, ex) => {
          return sum + ex.sets.reduce((s, set) => s + set.weight * set.reps, 0);
        }, 0);
        volumeMap[date] = (volumeMap[date] || 0) + totalVolume;
      });
      setVolumeOverTime(Object.entries(volumeMap).map(([date, total]) => ({ date, total })));
    })();
  }, []);

  const COLORS = ['#38bdf8', '#34d399', '#f59e0b', '#f87171', '#a78bfa', '#f43f5e', '#14b8a6'];

  const darkGrid = '#444';
  const darkLabel = '#ccc';

  return (
    <div className="min-h-screen  dark:bg-gray-900 py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-10">
          📊 Workout Analytics Dashboard
        </h2>

        {/* Bar Chart */}
        <div className="dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 mb-10">
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            🔋 Muscle Group Volume (Bar Chart)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkGrid} />
              <XAxis dataKey="group" stroke={darkLabel} />
              <YAxis stroke={darkLabel} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
              <Bar dataKey="total" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6 mb-10">
          <h3 className="text-2xl font-semibold text-orange-500 dark:text-orange-400 mb-4">
            📈 Workout Volume Over Time (Line Chart)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={volumeOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkGrid} />
              <XAxis dataKey="date" stroke={darkLabel} />
              <YAxis stroke={darkLabel} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
              <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            🍩 Muscle Group Distribution (Pie Chart)
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="total"
                nameKey="group"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={{ fill: darkLabel }}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
