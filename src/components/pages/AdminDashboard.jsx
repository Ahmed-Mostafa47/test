import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Settings, LogOut, Plus, Trash2, Edit2, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDashboard = ({ currentUser, onLogout }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLabs: 0,
    totalSubmissions: 0,
    activeInstances: 0
  });
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddLab, setShowAddLab] = useState(false);
  const [newLab, setNewLab] = useState({
    title: '',
    description: '',
    difficulty: 'medium'
  });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchLabs();
  }, []);

  const fetchStats = async () => {
    setStats({
      totalUsers: 156,
      totalLabs: 24,
      totalSubmissions: 542,
      activeInstances: 38
    });
  };

  const fetchUsers = async () => {
    setUsers([
      { id: 1, username: 'student_001', email: 'student1@test.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
      { id: 2, username: 'student_002', email: 'student2@test.com', role: 'user', status: 'active', joinDate: '2024-02-20' },
      { id: 3, username: 'instructor_01', email: 'instructor@test.com', role: 'instructor', status: 'active', joinDate: '2024-01-01' }
    ]);
  };

  const fetchLabs = async () => {
    setLabs([
      { id: 1, title: 'Web Security Basics', difficulty: 'easy', participants: 45, status: 'published' },
      { id: 2, title: 'Advanced SQL Injection', difficulty: 'hard', participants: 28, status: 'published' },
      { id: 3, title: 'Network Forensics', difficulty: 'medium', participants: 32, status: 'published' }
    ]);
  };

  const handleAddLab = () => {
    if (newLab.title && newLab.description) {
      setLabs([...labs, {
        id: labs.length + 1,
        ...newLab,
        participants: 0,
        status: 'draft'
      }]);
      setNewLab({ title: '', description: '', difficulty: 'medium' });
      setShowAddLab(false);
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className={`bg-gray-800/50 border border-${color}-500/30 rounded-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 font-mono text-sm">{label}</p>
          <p className={`text-3xl font-bold text-${color}-400 mt-2`}>{value}</p>
        </div>
        <Icon className={`w-12 h-12 text-${color}-400 opacity-50`} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-cyan-400 font-mono mb-2">ADMIN_CONSOLE</h1>
            <p className="text-gray-400 font-mono">Welcome, {currentUser?.username || 'Administrator'}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-mono transition"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </button>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-8 border-b border-cyan-500/20">
          {['overview', 'users', 'labs', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-6 font-mono uppercase text-sm transition ${
                activeTab === tab
                  ? 'border-b-2 border-cyan-400 text-cyan-400'
                  : 'text-gray-400 hover:text-cyan-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <StatCard icon={Users} label="TOTAL_USERS" value={stats.totalUsers} color="blue" />
              <StatCard icon={BarChart3} label="TOTAL_LABS" value={stats.totalLabs} color="green" />
              <StatCard icon={CheckCircle} label="SUBMISSIONS" value={stats.totalSubmissions} color="yellow" />
              <StatCard icon={AlertCircle} label="ACTIVE_INSTANCES" value={stats.activeInstances} color="red" />
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-cyan-400 font-mono mb-6">SYSTEM_STATUS</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono">Database Connection</span>
                  <span className="text-green-400 font-mono">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <span className="font-mono">API Gateway</span>
                  <span className="text-green-400 font-mono">OPERATIONAL</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <span className="font-mono">Cache Server</span>
                  <span className="text-green-400 font-mono">OPERATIONAL</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-cyan-400 font-mono mb-6">USER_MANAGEMENT</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-mono">
                <thead className="border-b border-cyan-500/20">
                  <tr>
                    <th className="text-left py-3 px-4 text-cyan-400">USERNAME</th>
                    <th className="text-left py-3 px-4 text-cyan-400">EMAIL</th>
                    <th className="text-left py-3 px-4 text-cyan-400">ROLE</th>
                    <th className="text-left py-3 px-4 text-cyan-400">STATUS</th>
                    <th className="text-left py-3 px-4 text-cyan-400">JOIN_DATE</th>
                    <th className="text-left py-3 px-4 text-cyan-400">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition">
                      <td className="py-3 px-4">{user.username}</td>
                      <td className="py-3 px-4 text-gray-400">{user.email}</td>
                      <td className="py-3 px-4"><span className="bg-blue-500/30 px-2 py-1 rounded text-blue-300">{user.role}</span></td>
                      <td className="py-3 px-4"><span className="text-green-400">{user.status}</span></td>
                      <td className="py-3 px-4 text-gray-400">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-cyan-400 font-mono">LAB_MANAGEMENT</h2>
              <button
                onClick={() => setShowAddLab(!showAddLab)}
                className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-mono transition"
              >
                <Plus className="w-4 h-4" />
                ADD_LAB
              </button>
            </div>

            {showAddLab && (
              <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-6 mb-6">
                <input
                  type="text"
                  placeholder="Lab Title"
                  value={newLab.title}
                  onChange={(e) => setNewLab({ ...newLab, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white font-mono mb-3"
                />
                <textarea
                  placeholder="Lab Description"
                  value={newLab.description}
                  onChange={(e) => setNewLab({ ...newLab, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white font-mono mb-3"
                  rows="3"
                />
                <select
                  value={newLab.difficulty}
                  onChange={(e) => setNewLab({ ...newLab, difficulty: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-4 py-2 text-white font-mono mb-3 cursor-pointer"
                >
                  <option>easy</option>
                  <option>medium</option>
                  <option>hard</option>
                </select>
                <button
                  onClick={handleAddLab}
                  className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg font-mono transition"
                >
                  CREATE_LAB
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {labs.map(lab => (
                <div key={lab.id} className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="text-cyan-400 font-mono font-bold mb-2">{lab.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">Difficulty: {lab.difficulty}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{lab.participants} participants</span>
                    <span className={`px-2 py-1 rounded text-xs font-mono ${
                      lab.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {lab.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
