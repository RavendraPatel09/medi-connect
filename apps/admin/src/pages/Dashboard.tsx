import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@medicycle/ui";
import { Users, Activity, AlertTriangle, CheckCircle, MoreHorizontal } from "lucide-react";

const mockUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Seller", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Buyer", status: "Active" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Seller", status: "Suspended" },
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
        <h1 className="text-3xl font-bold tracking-tight text-white">System Overview</h1>
        <Button>Generate Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="12,345" icon={Users} trend="+12% this month" />
        <StatCard title="Active Listings" value="3,456" icon={Activity} trend="+4% this week" />
        <StatCard title="Flagged Items" value="12" icon={AlertTriangle} trend="-2% from last month" />
        <StatCard title="Completed Orders" value="89,432" icon={CheckCircle} trend="+24% this year" />
      </div>

      <Card glass className="mt-6">
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b [&_tr]:border-white/10 text-gray-400">
                <tr className="border-b transition-colors hover:bg-white/5 data-[state=selected]:bg-white/5">
                  <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 transition-colors hover:bg-white/5">
                    <td className="p-4 align-middle font-medium text-white">{user.name}</td>
                    <td className="p-4 align-middle text-gray-300">{user.email}</td>
                    <td className="p-4 align-middle text-gray-300">{user.role}</td>
                    <td className="p-4 align-middle">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Active" ? "bg-success/20 text-success" : "bg-red-500/20 text-red-500"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
