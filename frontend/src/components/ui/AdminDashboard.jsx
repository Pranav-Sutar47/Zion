import React, { useState } from 'react'
import Analysis from './Analysis'
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import Dashboard from './Dashboard';


// Custom SVG Icons (unchanged)
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  ),
  Analytics: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C6.375 19.496 5.871 20 5.25 20h-2.25A1.125 1.125 0 0 1 2 18.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-9.75ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v13.5c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125v-13.5Z" />
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.243-.438.612-.43.992a7.723 7.723 0 0 1 0 .255c-.008.38.137.75.43.992l1.004.827c.424.35.534.954.26 1.431l-1.296 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.582.495-.644.87l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.243.437-.612.43-.992a7.723 7.723 0 0 1 0-.255c.007-.38-.138-.75-.43-.993l-1.004-.826a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.369-.491l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.87l.213-1.281z" />
    </svg>
  ),
  Logout: () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
  )
}

// Custom Tooltip Component (unchanged)
const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-full ml-2 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded shadow-lg">
          {text}
        </div>
      )}
    </div>
  )
}

const AdminDashboard = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogOut = () => {
    localStorage.clear();
    toast({
      description: "User Logged Out Successfully!",
      className: "bg-green-500 text-white",
    });
    navigate("/");
  };

  const sidebarItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Icons.Dashboard,
      content: DashboardContent
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: Icons.Analytics,
      content: AnalyticsContent 
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Icons.Users,
      content: UsersContent
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Icons.Settings,
      content: SettingsContent
    }
  ]

  const ActiveContent = sidebarItems.find(item => item.id === activeSection)?.content || DashboardContent

  return (
    <div className="flex h-screen bg-white text-black">
      <div 
        className={`
          bg-neutral-100 border-r border-neutral-200 
          transition-all duration-300 ease-in-out
          ${isHovered ? 'w-64' : 'w-20'}
          relative group
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center">
          {isHovered && (
            <h1 className="text-2xl font-bold text-black">Admin</h1>
          )}
        </div>
        
        <nav className="py-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <Tooltip key={item.id} text={item.label}>
                <div
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    w-full flex items-center px-5 py-3 text-left 
                    transition-colors duration-200 cursor-pointer
                    ${activeSection === item.id 
                      ? 'bg-blue-500/20 text-blue-600' 
                      : 'hover:bg-neutral-200 text-neutral-700'}
                    ${isHovered ? '' : 'justify-center'}
                  `}
                >
                  <span className={`
                    ${activeSection === item.id 
                      ? 'text-blue-600' 
                      : 'text-neutral-600'}
                  `}>
                    <Icon />
                  </span>
                  {isHovered && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </div>
              </Tooltip>
            )
          })}
          
          <Tooltip text="Logout">
            <div
              onClick={handleLogOut}
              className={`
                w-full flex items-center 
                ${isHovered ? 'px-5' : 'justify-center'}
                py-3 mt-4 
                text-red-600 hover:bg-red-500/10 cursor-pointer
              `}
            >
              <Icons.Logout />
              {isHovered && (
                <span className="ml-3">Logout</span>
              )}
            </div>
          </Tooltip>
        </nav>
      </div>

      <main className="flex-1 p-10 overflow-y-auto">
        <ActiveContent />
      </main>
    </div>
  )
}

const DashboardContent = () => (
    <Dashboard/>
)

const AnalyticsContent = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Analytics Dashboard</h2>
    <div className="grid grid-cols-2 gap-6">
      {[
        { 
          title: 'User Growth', 
          description: 'Monthly user acquisition trends' 
        },
        { 
          title: 'Revenue Insights', 
          description: 'Financial performance metrics' 
        }
      ].map((item, index) => (
        <div 
          key={index} 
          className="bg-neutral-100 p-6 rounded-lg 
          hover:bg-neutral-200 transition-colors duration-300"
        >
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-neutral-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
)


const UsersContent = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">User Management</h2>
    <div className="bg-neutral-100 rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-200">
          <tr>
            <th className="p-3 text-left text-neutral-700">Name</th>
            <th className="p-3 text-left text-neutral-700">Email</th>
            <th className="p-3 text-left text-neutral-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'John Doe', email: 'john@example.com', status: 'Active' },
            { name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' }
          ].map((user, index) => (
            <tr 
              key={index} 
              className="border-b border-neutral-200 
              hover:bg-neutral-200 transition-colors duration-200"
            >
              <td className="p-3 text-neutral-800">{user.name}</td>
              <td className="p-3 text-neutral-800">{user.email}</td>
              <td className="p-3">
                <span className={`
                  px-2 py-1 rounded text-xs 
                  ${user.status === 'Active' 
                    ? 'bg-green-500/20 text-green-700' 
                    : 'bg-red-500/20 text-red-700'}
                `}>
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const SettingsContent = () => (
  <div>
    <h2 className="text-3xl font-bold mb-6">Settings</h2>
    <div className="bg-neutral-100 rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-neutral-700 mb-2">Profile Settings</label>
        <input 
          type="text" 
          placeholder="Name" 
          className="w-full p-2 bg-white border border-neutral-300 rounded text-black 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-neutral-700 mb-2">Notification Preferences</label>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            className="mr-2 bg-white text-blue-600 
            focus:ring-blue-500 focus:ring-2 rounded" 
          />
          <span className="text-neutral-700">Enable Email Notifications</span>
        </div>
      </div>
    </div>
  </div>
)

export default AdminDashboard