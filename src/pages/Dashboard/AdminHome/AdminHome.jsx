import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend, Tooltip } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');
      return res.data;
    }
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = ({ fill, x, y, width, height }) => (
    <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  );

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="font-bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const pieChartData = chartData.map(data => ({ name: data.category, value: data.revenue }));

  return (
    <div className="p-6 space-y-8">
      {/* Welcome */}
      <h2 className="text-3xl font-bold">
        Hi, Welcome {user?.displayName || 'Back'}
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:scale-105 transition-transform">
          <FaDollarSign className="text-4xl text-blue-500" />
          <div>
            <p className="text-gray-500">Revenue</p>
            <p className="text-2xl font-bold">${stats.revenue}</p>
            <p className="text-sm text-gray-400">Jan 1st - Feb 1st</p>
          </div>
        </div>

        <div className="stat-card bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:scale-105 transition-transform">
          <FaUsers className="text-4xl text-green-500" />
          <div>
            <p className="text-gray-500">Users</p>
            <p className="text-2xl font-bold">{stats.users}</p>
            <p className="text-sm text-gray-400">↗︎ 400 (22%)</p>
          </div>
        </div>

        <div className="stat-card bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:scale-105 transition-transform">
          <FaBook className="text-4xl text-yellow-500" />
          <div>
            <p className="text-gray-500">Menu Items</p>
            <p className="text-2xl font-bold">{stats.menuItems}</p>
            <p className="text-sm text-gray-400">↗︎ 400 (22%)</p>
          </div>
        </div>

        <div className="stat-card bg-white shadow-lg rounded-xl p-6 flex items-center space-x-4 hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-10 h-10 stroke-current text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
          <div>
            <p className="text-gray-500">Orders</p>
            <p className="text-2xl font-bold">{stats.orders}</p>
            <p className="text-sm text-gray-400">↘︎ 90 (14%)</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Orders by Category</h3>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4">Revenue Distribution</h3>
          <PieChart width={350} height={350}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
