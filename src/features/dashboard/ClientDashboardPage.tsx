import React, { useState } from 'react';
import { MOCK_DASHBOARD_DATA } from '../../data/dashboard';
import { 
  LayoutDashboard, 
  FileText, 
  ShoppingBag, 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  GraduationCap, 
  Download, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

type DashboardTab = 
  | 'overview' 
  | 'invoices' 
  | 'orders' 
  | 'projects' 
  | 'tasks' 
  | 'timesheets' 
  | 'addresses' 
  | 'security' 
  | 'knowledge' 
  | 'courses';

export const ClientDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [invoices, setInvoices] = useState(MOCK_DASHBOARD_DATA.invoices);
  const [tasks, setTasks] = useState(MOCK_DASHBOARD_DATA.tasks);
  const [timesheets, setTimesheets] = useState(MOCK_DASHBOARD_DATA.timesheets);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  const approveTimesheet = (workerName: string) => {
    setTimesheets((prev) =>
      prev.map((t) => (t.worker === workerName ? { ...t, status: 'Approved' } : t))
    );
    triggerNotice(`Timesheet for ${workerName} successfully approved.`);
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((tsk) => (tsk.id === id ? { ...tsk, status: 'Completed' } : tsk))
    );
    triggerNotice(`Task ${id} marked as completed.`);
  };

  const navItems = [
    { id: 'overview', label: 'Command Overview', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices & Billing', icon: FileText, count: invoices.filter(i => i.status !== 'Paid').length },
    { id: 'orders', label: 'Orders & Bookings', icon: ShoppingBag, count: MOCK_DASHBOARD_DATA.orders.length },
    { id: 'projects', label: 'Field Projects', icon: FolderKanban },
    { id: 'tasks', label: 'Tasks & Approvals', icon: CheckSquare, count: tasks.filter(t => t.status !== 'Completed').length },
    { id: 'timesheets', label: 'Worker Timesheets', icon: Clock },
    { id: 'addresses', label: 'Registered Hubs', icon: MapPin },
    { id: 'security', label: 'Connection & Security', icon: ShieldCheck },
    { id: 'knowledge', label: 'Knowledge & SOPs', icon: BookOpen },
    { id: 'courses', label: 'Enrolled Courses', icon: GraduationCap },
  ];

  return (
    <div className="w-full min-h-screen bg-[#F4F1EA] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Notice Toast */}
        {actionNotice && (
          <div className="fixed top-24 right-4 z-50 bg-[#171717] text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center space-x-2 text-xs font-bold animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span>{actionNotice}</span>
          </div>
        )}

        {/* Dashboard Top Header Bar */}
        <div className="bg-white rounded-2xl border border-[#E2DED5] p-5 sm:p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] text-[#171717]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-xl sm:text-2xl text-[#171717]">
                  {MOCK_DASHBOARD_DATA.clientProfile.name}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#FF4D16] font-bold border border-[#FF4D16]/20">
                  {MOCK_DASHBOARD_DATA.clientProfile.accountNumber}
                </span>
              </div>
              <p className="text-xs text-[#625E58] mt-0.5">
                {MOCK_DASHBOARD_DATA.clientProfile.contactPerson} • {MOCK_DASHBOARD_DATA.clientProfile.tier}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-[#8C877D] hidden sm:inline">
              GST: {MOCK_DASHBOARD_DATA.clientProfile.billingGst}
            </span>
            <Link
              to="/design-your-solution"
              className="px-4 py-2 bg-[#FF4D16] text-white rounded-xl text-xs font-bold hover:bg-[#E53E0B] transition-colors shadow-sm flex items-center space-x-1.5"
            >
              <span>+ Add Service Tier</span>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Layout (Sidebar + Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Sidebar Navigation (3 cols) */}
          <aside className={`lg:col-span-3 bg-white rounded-2xl border border-[#E2DED5] p-3 shadow-sm space-y-1 ${
            sidebarOpen ? 'block' : 'hidden lg:block'
          }`}>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C877D] px-3 py-2 block">
              PORTAL MODULES
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as DashboardTab);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'text-[#625E58] hover:text-[#171717] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF4D16]' : 'text-[#8C877D]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-[#FF4D16] text-white' : 'bg-[#FAF8F5] text-[#171717] border border-[#E2DED5]'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#E2DED5]/60 px-3 pb-2 text-[11px] text-[#8C877D] space-y-1">
              <p>Spring Boot API: <span className="text-green-600 font-bold">Ready</span></p>
              <p>Supabase Auth: <span className="text-green-600 font-bold">Ready</span></p>
            </div>
          </aside>

          {/* Main Content Area (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* 1. OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#E2DED5] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D]">
                      Active Deployments
                    </span>
                    <div className="text-2xl font-extrabold text-[#171717] font-mono">
                      {MOCK_DASHBOARD_DATA.stats.activeDeployments} Sites
                    </div>
                    <span className="text-[10px] text-green-600 font-semibold">100% SLA Compliant</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E2DED5] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D]">
                      Active Consignments
                    </span>
                    <div className="text-2xl font-extrabold text-[#171717] font-mono">
                      {MOCK_DASHBOARD_DATA.stats.activeShipments} FTLs
                    </div>
                    <span className="text-[10px] text-[#FF4D16] font-semibold">Live GPS Feeds</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E2DED5] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D]">
                      Hours Approved (Mtd)
                    </span>
                    <div className="text-2xl font-extrabold text-[#171717] font-mono">
                      {MOCK_DASHBOARD_DATA.stats.monthlyHoursApproved}
                    </div>
                    <span className="text-[10px] text-[#625E58]">Across 18 Leads</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#E2DED5] shadow-sm space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D]">
                      Quality OTIF Rate
                    </span>
                    <div className="text-2xl font-extrabold text-[#171717] font-mono">
                      {MOCK_DASHBOARD_DATA.stats.complianceScore}
                    </div>
                    <span className="text-[10px] text-green-600 font-semibold">Zero-Damage Milestone</span>
                  </div>
                </div>

                {/* Live Tasks requiring action */}
                <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#171717]">Pending Approvals & Operational Actions</h3>
                    <button onClick={() => setActiveTab('tasks')} className="text-xs text-[#FF4D16] font-bold hover:underline">
                      View All Tasks ({tasks.length})
                    </button>
                  </div>

                  <div className="space-y-2">
                    {tasks.slice(0, 3).map((tsk) => (
                      <div
                        key={tsk.id}
                        className="p-3 bg-[#FAF8F5] rounded-xl border border-[#E2DED5] flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#171717]">{tsk.task}</span>
                          <div className="text-[11px] text-[#8C877D]">
                            Assigned: {tsk.assignedTo} • Priority: <span className="font-semibold text-red-600">{tsk.priority}</span>
                          </div>
                        </div>
                        {tsk.status !== 'Completed' ? (
                          <button
                            onClick={() => completeTask(tsk.id)}
                            className="px-3 py-1 bg-[#171717] text-white hover:bg-[#FF4D16] rounded-lg font-bold text-[11px] transition-colors"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-green-600 flex items-center space-x-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Projects Widget */}
                <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-[#171717]">Active Field Transformation Initiatives</h3>
                    <button onClick={() => setActiveTab('projects')} className="text-xs text-[#FF4D16] font-bold hover:underline">
                      All Projects
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MOCK_DASHBOARD_DATA.projects.map((prj) => (
                      <div key={prj.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#FF4D16] font-bold border border-[#E2DED5]">
                          {prj.site}
                        </span>
                        <h4 className="font-bold text-xs text-[#171717] line-clamp-1">{prj.name}</h4>
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-[#625E58]">
                            <span>Progress</span>
                            <span className="font-mono font-bold">{prj.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#E2DED5] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FF4D16] rounded-full"
                              style={{ width: `${prj.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. INVOICES */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#171717]">Invoices & Statutory Billing</h3>
                    <p className="text-xs text-[#625E58]">E-Invoices generated under GST rules with itemized timesheet and dispatch backing.</p>
                  </div>
                  <button
                    onClick={() => triggerNotice('Consolidated GST Statement downloaded.')}
                    className="px-3 py-1.5 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl text-xs font-bold text-[#171717] hover:border-[#171717] flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Statement</span>
                  </button>
                </div>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#8C877D] font-mono uppercase border-b border-[#E2DED5]">
                      <tr>
                        <th className="p-3">Invoice #</th>
                        <th className="p-3">Service Description</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DED5]/60 text-[#171717]">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-[#FAF8F5]">
                          <td className="p-3 font-mono font-bold">{inv.id}</td>
                          <td className="p-3">{inv.service}</td>
                          <td className="p-3 text-[#625E58]">{inv.date}</td>
                          <td className="p-3 font-mono font-bold">{inv.amount}</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              inv.status === 'Paid'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => triggerNotice(`Downloaded GST Tax Invoice ${inv.id}`)}
                              className="p-1 text-[#FF4D16] hover:underline inline-flex items-center space-x-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">Orders & Dispatches</h3>
                  <p className="text-xs text-[#625E58]">HSE shop equipment deliveries and active spot truck dispatches.</p>
                </div>

                <div className="space-y-3 pt-2">
                  {MOCK_DASHBOARD_DATA.orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-sm text-[#171717]">{ord.id}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#FF4D16] font-bold border border-[#E2DED5]">
                            {ord.category}
                          </span>
                          <span className="text-[#8C877D]">• {ord.date}</span>
                        </div>
                        <p className="text-[#625E58]">{ord.items}</p>
                        <p className="text-[11px] font-mono text-[#8C877D]">Tracking: {ord.trackingNumber}</p>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                        <span className="font-mono font-bold text-sm text-[#171717]">{ord.total}</span>
                        <span className="text-[11px] font-bold text-green-600">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. PROJECTS */}
            {activeTab === 'projects' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#171717]">Field Operations Transformation Projects</h3>
                <div className="space-y-4 pt-2">
                  {MOCK_DASHBOARD_DATA.projects.map((p) => (
                    <div key={p.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#FF4D16] font-bold">{p.id} • {p.site}</span>
                          <h4 className="font-bold text-sm text-[#171717]">{p.name}</h4>
                          <p className="text-xs text-[#625E58] mt-0.5">Assigned Lead: {p.lead} • Target Deadline: {p.deadline}</p>
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#171717] border border-[#E2DED5]">
                          {p.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-[#625E58]">
                          <span>Milestone Completion</span>
                          <span className="font-mono font-bold">{p.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E2DED5] rounded-full overflow-hidden">
                          <div className="h-full bg-[#FF4D16] rounded-full" style={{ width: `${p.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TASKS */}
            {activeTab === 'tasks' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#171717]">Actionable Daily Tasks & Exception Tracker</h3>
                <div className="space-y-2.5 pt-2">
                  {tasks.map((tsk) => (
                    <div
                      key={tsk.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#FF4D16]">{tsk.id}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            tsk.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {tsk.priority} Priority
                          </span>
                        </div>
                        <p className="font-bold text-[#171717] text-sm">{tsk.task}</p>
                        <p className="text-[11px] text-[#8C877D]">Assigned to: {tsk.assignedTo}</p>
                      </div>

                      {tsk.status !== 'Completed' ? (
                        <button
                          onClick={() => completeTask(tsk.id)}
                          className="px-4 py-2 bg-[#171717] text-white hover:bg-[#FF4D16] rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                        >
                          Mark Done
                        </button>
                      ) : (
                        <span className="text-xs font-bold text-green-600 flex items-center space-x-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approved</span>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TIMESHEETS */}
            {activeTab === 'timesheets' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">Field Worker Timesheets (Week 42)</h3>
                  <p className="text-xs text-[#625E58]">Geo-verified work hours logged by CH Deploy dock supervisors.</p>
                </div>

                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F5] text-[#8C877D] font-mono uppercase border-b border-[#E2DED5]">
                      <tr>
                        <th className="p-3">Worker Name</th>
                        <th className="p-3">Role Profile</th>
                        <th className="p-3">Site / Dock</th>
                        <th className="p-3">Logged Hours</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2DED5]/60 text-[#171717]">
                      {timesheets.map((ts, idx) => (
                        <tr key={idx} className="hover:bg-[#FAF8F5]">
                          <td className="p-3 font-bold">{ts.worker}</td>
                          <td className="p-3 text-[#625E58]">{ts.role}</td>
                          <td className="p-3">{ts.site}</td>
                          <td className="p-3 font-mono font-bold">{ts.hoursThisWeek} hrs</td>
                          <td className="p-3">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              ts.status === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {ts.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {ts.status !== 'Approved' ? (
                              <button
                                onClick={() => approveTimesheet(ts.worker)}
                                className="px-3 py-1 bg-[#FF4D16] text-white rounded-lg font-bold text-[11px] hover:bg-[#E53E0B]"
                              >
                                Approve
                              </button>
                            ) : (
                              <span className="text-[11px] text-green-600 font-semibold">Verified</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#171717]">Registered Enterprise Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {MOCK_DASHBOARD_DATA.addresses.map((addr, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-2">
                      <span className="text-xs font-bold text-[#FF4D16] block">{addr.label}</span>
                      <p className="text-xs text-[#625E58] leading-relaxed">{addr.address}</p>
                      <p className="text-[11px] font-mono text-[#8C877D] pt-2 border-t border-[#E2DED5]">
                        Contact: {addr.contact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 8. SECURITY & CONNECTIONS */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">API Credentials & Authentication</h3>
                  <p className="text-xs text-[#625E58]">Manage machine-to-machine integrations and account security.</p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED5] space-y-3">
                  <h4 className="font-bold text-xs uppercase text-[#171717]">Active Enterprise API Keys</h4>
                  {MOCK_DASHBOARD_DATA.security.apiKeys.map((key, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs bg-white p-3 rounded-lg border border-[#E2DED5]">
                      <div>
                        <span className="font-bold text-[#171717] block">{key.keyName}</span>
                        <span className="font-mono text-[#8C877D] text-[11px]">{key.prefix}</span>
                      </div>
                      <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        {key.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED5]">
                    <span className="font-bold text-[#171717] block">Two-Factor Authentication</span>
                    <span className="text-green-600 font-bold">Enabled (SMS + Authenticator)</span>
                  </div>
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E2DED5]">
                    <span className="font-bold text-[#171717] block">Last Login Audit</span>
                    <span className="text-[#625E58]">{MOCK_DASHBOARD_DATA.security.lastLogin}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 9. KNOWLEDGE & DOCUMENTS */}
            {activeTab === 'knowledge' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-lg text-[#171717]">Standard Operating Procedures (SOPs) & Legal Dockets</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {MOCK_DASHBOARD_DATA.knowledge.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DED5] flex items-center justify-between text-xs">
                      <div className="space-y-1 pr-2">
                        <span className="text-[10px] font-mono text-[#FF4D16] font-bold">{doc.category}</span>
                        <h4 className="font-bold text-[#171717] leading-tight">{doc.title}</h4>
                        <span className="text-[10px] text-[#8C877D]">{doc.size}</span>
                      </div>
                      <button
                        onClick={() => triggerNotice(`Downloaded ${doc.title}`)}
                        className="p-2 bg-white hover:bg-[#FF4D16] hover:text-white rounded-xl border border-[#E2DED5] transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. COURSES (SOURCE PDF REQUIREMENT) */}
            {activeTab === 'courses' && (
              <div className="bg-white rounded-2xl border border-[#E2DED5] p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-[#171717]">Team Supply Chain & Safety Courses</h3>
                  <p className="text-xs text-[#625E58]">Enrolled training programs mandated for client operations staff and supervisors.</p>
                </div>

                <div className="space-y-4 pt-2">
                  {MOCK_DASHBOARD_DATA.courses.map((crs) => (
                    <div key={crs.id} className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#FF4D16]">{crs.id}</span>
                          <h4 className="font-bold text-sm text-[#171717]">{crs.title}</h4>
                          <p className="text-xs text-[#625E58] mt-0.5">
                            Status: <span className="font-bold text-[#171717]">{crs.status}</span>
                            {crs.certificateId && ` • Certificate: ${crs.certificateId}`}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#FF4D16] font-mono">{crs.progress}%</span>
                      </div>

                      <div className="w-full h-2 bg-[#E2DED5] rounded-full overflow-hidden">
                        <div className="h-full bg-[#FF4D16] rounded-full" style={{ width: `${crs.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </div>
  );
};

