import { ScrollText, Clock, Sparkles, Scale, Flower, RotateCcw, Package, Settings } from 'lucide-react';

interface NavigationPanelProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

const menuItems = [
  { id: 'all-orders', label: 'All Orders', icon: ScrollText },
  { id: 'upcoming-queue', label: 'Upcoming Queue', icon: Clock },
  { id: 'high-value', label: 'High-Value Offerings', icon: Sparkles },
  { id: 'medium-offerings', label: 'Medium Offerings', icon: Scale },
  { id: 'basic-offerings', label: 'Basic Offerings', icon: Flower },
  { id: 'subscriptions', label: 'Subscriptions', icon: RotateCcw },
  { id: 'completed', label: 'Completed Offerings', icon: Package },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function NavigationPanel({ activeMenu, setActiveMenu }: NavigationPanelProps) {
  return (
    <div className="w-64 bg-gradient-to-b from-orange-100 to-orange-50 border-r-2 border-orange-200 shadow-lg relative overflow-hidden">
      {/* Mandala Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" className="text-orange-600">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 80 * Math.cos((i * 30 * Math.PI) / 180)}
              y2={100 + 80 * Math.sin((i * 30 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>

      {/* Header */}
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-3xl">🕉️</div>
          <div>
            <h1 className="text-orange-900">AsthaManthan</h1>
            <p className="text-xs text-orange-700">Chadhava Management</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="relative z-10 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-300/50'
                  : 'text-orange-800 hover:bg-orange-200/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-orange-100/50 border-t border-orange-200">
        <div className="flex items-center gap-2 text-orange-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs">System Active</span>
        </div>
      </div>
    </div>
  );
}
