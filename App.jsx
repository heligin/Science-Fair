import React, { useState, useMemo } from 'react';
import { 
  Trophy, Award, Medal, BarChart2, PieChart, Search, Filter, Plus, 
  RefreshCw, Share2, Moon, Sun, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart as RePie, Pie, Cell 
} from 'recharts';

const initialResults = [
  { id: 1, mela: 'Science Fair', section: 'HS', item: 'Working Model', rank: '1st', grade: 'A', points: 10, student: 'Ananya S.' },
  { id: 2, mela: 'Science Fair', section: 'HS', item: 'Still Model', rank: '2nd', grade: 'A', points: 5, student: 'Rahul M.' },
  { id: 3, mela: 'Science Fair', section: 'HSS', item: 'Research Project', rank: '1st', grade: 'A', points: 10, student: 'Devika K.' },
  { id: 4, mela: 'Science Fair', section: 'HSS', item: 'Improvised Experiments', rank: '3rd', grade: 'A', points: 10, student: 'Adithya V.' },
  { id: 5, mela: 'Mathematics Fair', section: 'HS', item: 'Number Chart', rank: '1st', grade: 'A', points: 10, student: 'Siddharth P.' },
  { id: 6, mela: 'Mathematics Fair', section: 'HS', item: 'Puzzles', rank: '1st', grade: 'A', points: 8, student: 'Sneha R.' },
  { id: 7, mela: 'Mathematics Fair', section: 'HSS', item: 'Math Game', rank: '1st', grade: 'A', points: 12, student: 'Arjun K.' },
  { id: 8, mela: 'Mathematics Fair', section: 'HSS', item: 'Pure Mathematics', rank: '2nd', grade: 'A', points: 10, student: 'Meera N.' },
  { id: 9, mela: 'Social Science Fair', section: 'HS', item: 'Local History Project', rank: '2nd', grade: 'B', points: 7, student: 'Fathima N.' },
  { id: 10, mela: 'Social Science Fair', section: 'HS', item: 'Atlas Making', rank: '3rd', grade: 'B', points: 5, student: 'Abhinav E.' },
  { id: 11, mela: 'Social Science Fair', section: 'HSS', item: 'Teaching Aid', rank: '1st', grade: 'A', points: 10, student: 'Gautam R.' },
  { id: 12, mela: 'Work Experience Fair', section: 'HS', item: 'Wood Work', rank: '1st', grade: 'A', points: 10, student: 'Jithin T.' },
  { id: 13, mela: 'Work Experience Fair', section: 'HS', item: 'Electronics', rank: '1st', grade: 'A', points: 10, student: 'Nivin C.' },
  { id: 14, mela: 'Work Experience Fair', section: 'HS', item: 'Embroidery', rank: '2nd', grade: 'A', points: 8, student: 'Riya B.' },
  { id: 15, mela: 'Work Experience Fair', section: 'HSS', item: 'Crafting', rank: '1st', grade: 'A', points: 10, student: 'Sandra M.' },
  { id: 16, mela: 'Work Experience Fair', section: 'HSS', item: 'Doll Making', rank: '1st', grade: 'A', points: 10, student: 'Kavya S.' },
  { id: 17, mela: 'Work Experience Fair', section: 'HSS', item: 'Paper Craft', rank: '2nd', grade: 'A', points: 15, student: 'Anand H.' },
  { id: 18, mela: 'IT Fair', section: 'HS', item: 'Digital Painting', rank: '1st', grade: 'A', points: 10, student: 'Anoop D.' },
  { id: 19, mela: 'IT Fair', section: 'HSS', item: 'Web Page Designing', rank: '1st', grade: 'A', points: 12, student: 'Vishnu P.' },
];

export default function App() {
  const [results, setResults] = useState(initialResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMela, setSelectedMela] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [newItem, setNewItem] = useState({
    mela: 'Science Fair', section: 'HS', item: '', rank: '1st', grade: 'A', points: 10, student: ''
  });
  const [batchText, setBatchText] = useState('');

  const melas = ['Science Fair', 'Mathematics Fair', 'Social Science Fair', 'Work Experience Fair', 'IT Fair'];

  const filteredResults = useMemo(() => {
    return results.filter(r => {
      const matchSearch = r.item.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.student.toLowerCase().includes(searchTerm.toLowerCase());
      const matchMela = selectedMela === 'All' || r.mela === selectedMela;
      const matchSection = selectedSection === 'All' || r.section === selectedSection;
      return matchSearch && matchMela && matchSection;
    });
  }, [results, searchTerm, selectedMela, selectedSection]);

  const stats = useMemo(() => {
    const totalPoints = results.reduce((acc, r) => acc + Number(r.points || 0), 0);
    const hsPoints = results.filter(r => r.section === 'HS').reduce((acc, r) => acc + Number(r.points || 0), 0);
    const hssPoints = results.filter(r => r.section === 'HSS').reduce((acc, r) => acc + Number(r.points || 0), 0);

    const gold = results.filter(r => r.rank === '1st').length;
    const silver = results.filter(r => r.rank === '2nd').length;
    const bronze = results.filter(r => r.rank === '3rd').length;

    const gradeA = results.filter(r => r.grade === 'A').length;
    const gradeB = results.filter(r => r.grade === 'B').length;
    const gradeC = results.filter(r => r.grade === 'C').length;

    return { totalPoints, hsPoints, hssPoints, gold, silver, bronze, gradeA, gradeB, gradeC };
  }, [results]);

  const chartData = useMemo(() => {
    return melas.map(mela => {
      const hsPts = results.filter(r => r.mela === mela && r.section === 'HS').reduce((a, b) => a + Number(b.points || 0), 0);
      const hssPts = results.filter(r => r.mela === mela && r.section === 'HSS').reduce((a, b) => a + Number(b.points || 0), 0);
      return { name: mela.replace(' Fair', ''), HS: hsPts, HSS: hssPts };
    });
  }, [results]);

  const gradeData = [
    { name: 'Grade A', value: stats.gradeA, color: '#10B981' },
    { name: 'Grade B', value: stats.gradeB, color: '#3B82F6' },
    { name: 'Grade C', value: stats.gradeC, color: '#F59E0B' },
  ];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.item || !newItem.student) return;
    setResults([...results, { ...newItem, id: Date.now(), points: Number(newItem.points) }]);
    setNewItem({ mela: 'Science Fair', section: 'HS', item: '', rank: '1st', grade: 'A', points: 10, student: '' });
  };

  const handleBatchImport = () => {
    const lines = batchText.split('\n');
    const imported = [];
    lines.forEach((line, idx) => {
      const parts = line.split('\t').length > 1 ? line.split('\t') : line.split(',');
      if (parts.length >= 4) {
        imported.push({
          id: Date.now() + idx,
          mela: parts[0]?.trim() || 'Science Fair',
          section: parts[1]?.trim() || 'HS',
          item: parts[2]?.trim() || 'General Item',
          student: parts[3]?.trim() || 'Student',
          rank: parts[4]?.trim() || '1st',
          grade: parts[5]?.trim() || 'A',
          points: Number(parts[6]) || 10
        });
      }
    });
    if (imported.length > 0) {
      setResults([...results, ...imported]);
      setBatchText('');
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'} transition-colors duration-200`}>
      <header className="sticky top-0 z-10 backdrop-blur-md bg-opacity-80 border-b border-slate-200 dark:border-slate-800 p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">S H H S S Dwaraka (15005)</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mananthavady Sub-District Sasthrolsavam Dashboard</p>
            </div>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md">
            <div className="text-xs font-medium text-indigo-100">Grand Total Points</div>
            <div className="text-3xl font-extrabold mt-1">{stats.totalPoints}</div>
            <div className="text-xs mt-2 text-indigo-100 flex justify-between">
              <span>HS: {stats.hsPoints}</span>
              <span>HSS: {stats.hssPoints}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">1st Places</span>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl font-bold mt-1 text-amber-500">{stats.gold}</div>
            <div className="text-xs text-slate-400 mt-1">Silver: {stats.silver} | Bronze: {stats.bronze}</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Grade A Count</span>
              <Award className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold mt-1 text-emerald-500">{stats.gradeA}</div>
            <div className="text-xs text-slate-400 mt-1">Grade B: {stats.gradeB} | Grade C: {stats.gradeC}</div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Total Entries</span>
              <Medal className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold mt-1 text-blue-500">{results.length}</div>
            <div className="text-xs text-slate-400 mt-1">Sub-District Ranking: #2</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <BarChart2 className="w-4 h-4 mr-2 text-indigo-500" /> Points Comparison by Mela (HS vs HSS)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="HS" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="HSS" fill="#EC4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-sm font-semibold mb-4 flex items-center">
              <PieChart className="w-4 h-4 mr-2 text-indigo-500" /> Grade Distribution
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePie>
                  <Pie data={gradeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePie>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search student or item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <select 
                value={selectedMela} 
                onChange={(e) => setSelectedMela(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              >
                <option value="All">All Fairs</option>
                {melas.map(m => <option key={m} value={m}>{m}</option>)}
              </select>

              <select 
                value={selectedSection} 
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              >
                <option value="All">All Sections</option>
                <option value="HS">HS</option>
                <option value="HSS">HSS</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="p-3">Student</th>
                  <th className="p-3">Mela</th>
                  <th className="p-3">Section</th>
                  <th className="p-3">Item</th>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Grade</th>
                  <th className="p-3">Points</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map(r => (
                  <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="p-3 font-medium">{r.student}</td>
                    <td className="p-3 text-xs">{r.mela}</td>
                    <td className="p-3 text-xs">{r.section}</td>
                    <td className="p-3">{r.item}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-amber-100 text-amber-800 font-semibold">{r.rank}</span></td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 font-semibold">Grade {r.grade}</span></td>
                    <td className="p-3 font-bold">{r.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
