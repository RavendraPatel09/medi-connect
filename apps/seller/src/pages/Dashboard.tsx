import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@medicycle/ui";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 2000 },
  { name: "Apr", revenue: 2780 },
  { name: "May", revenue: 1890 },
  { name: "Jun", revenue: 2390 },
  { name: "Jul", revenue: 3490 },
];

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <Card glass hoverEffect>
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-y-0 pb-2">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <Icon className="h-4 w-4 text-gray-400" />
      </div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-white">{value}</h2>
        <span className="text-xs font-medium text-success">{trend}</span>
      </div>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231.89" icon={DollarSign} trend="+20.1% from last month" />
        <StatCard title="Active Listings" value="23" icon={Package} trend="+3 new this week" />
        <StatCard title="Total Sales" value="1,234" icon={ShoppingCart} trend="+19% from last month" />
        <StatCard title="Profile Views" value="573" icon={TrendingUp} trend="+201 since yesterday" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card glass className="col-span-4 p-0">
          <CardHeader className="p-6 pb-2">
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full p-6 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card glass className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-medium text-white">Order #{1000 + i}</p>
                    <p className="text-xs text-gray-400">Paracetamol 500mg • 2 units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">${(12.5 * i).toFixed(2)}</p>
                    <p className="text-xs text-success">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
