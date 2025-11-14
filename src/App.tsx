import { useState } from 'react';
import { NavigationPanel } from './components/NavigationPanel';
import { OrdersTable } from './components/OrdersTable';
import { QueuePanel } from './components/QueuePanel';
import { AddOrderDialog } from './components/AddOrderDialog';
import { HeaderSection } from './components/HeaderSection';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('all-orders');
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Mandala Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D97706' fill-opacity='1'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Left Navigation Panel */}
        <NavigationPanel activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <HeaderSection onAddOrder={() => setIsAddOrderOpen(true)} />

          {/* Center and Right Panels */}
          <div className="flex-1 flex overflow-hidden gap-4 p-4">
            {/* Center Panel - Orders Table */}
            <div className="flex-1 overflow-hidden">
              <OrdersTable activeFilter={activeMenu} />
            </div>

            {/* Right Panel - Queue */}
            <QueuePanel />
          </div>
        </div>
      </div>

      {/* Add Order Dialog */}
      <AddOrderDialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen} />
    </div>
  );
}
