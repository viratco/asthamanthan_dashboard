import { Plus, RefreshCw, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderSectionProps {
  onAddOrder: () => void;
}

export function HeaderSection({ onAddOrder }: HeaderSectionProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border-b-2 border-orange-200 shadow-sm">
      <div className="px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-orange-900 flex items-center gap-2">
              <span className="text-2xl">🛕</span>
              Kashi Vishwanath Mandir
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-orange-700">Current Live Slot:</span>
              <span className="text-amber-900">Morning Aarti (6:00 AM – 7:30 AM)</span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-full text-xs animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                LIVE
              </span>
              <span className="text-sm text-orange-600">32 offerings in queue</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={onAddOrder}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Order
            </Button>
            <Button
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync
            </Button>
          </div>
        </div>

        {/* Search and Filters Row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-400" />
            <Input
              placeholder="Search by Name, Gotra, or Order ID..."
              className="pl-10 border-orange-200 focus:border-orange-400"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              All Types
            </Button>
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              All Tiers
            </Button>
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
              All Slots
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
