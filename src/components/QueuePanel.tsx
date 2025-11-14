import { Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface QueueItem {
  time: string;
  devotee: string;
  category: 'High' | 'Medium' | 'Low';
  type: 'Pre' | 'Real' | 'Subscription';
  status: 'Ready' | 'Preparing' | 'Live';
}

const queueData: QueueItem[] = [
  { time: '06:40 AM', devotee: 'Kavita Joshi', category: 'Medium', type: 'Pre', status: 'Ready' },
  { time: '06:50 AM', devotee: 'Sunil Mehta', category: 'High', type: 'Real', status: 'Preparing' },
  { time: '07:00 AM', devotee: 'NRI Bhakt', category: 'High', type: 'Subscription', status: 'Ready' },
  { time: '07:10 AM', devotee: 'Amit Saxena', category: 'Low', type: 'Pre', status: 'Ready' },
  { time: '07:20 AM', devotee: 'Pooja Rao', category: 'Medium', type: 'Real', status: 'Ready' },
  { time: '07:30 AM', devotee: 'Vikram Singh', category: 'High', type: 'Subscription', status: 'Ready' },
  { time: '07:40 AM', devotee: 'Neha Kapoor', category: 'Medium', type: 'Pre', status: 'Ready' },
  { time: '07:50 AM', devotee: 'Deepak Verma', category: 'Low', type: 'Real', status: 'Ready' },
  { time: '08:00 AM', devotee: 'Anjali Desai', category: 'High', type: 'Pre', status: 'Ready' },
  { time: '08:10 AM', devotee: 'Manoj Tiwari', category: 'Medium', type: 'Subscription', status: 'Ready' },
];

export function QueuePanel() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready':
        return 'bg-green-500';
      case 'Preparing':
        return 'bg-yellow-500';
      case 'Live':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'High':
        return '⭐';
      case 'Medium':
        return '🔸';
      case 'Low':
        return '🔹';
      default:
        return '•';
    }
  };

  return (
    <div className="w-80 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-4">
        <h3 className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Upcoming Offerings Queue
        </h3>
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {queueData.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                <span className="text-orange-900">{item.time}</span>
              </div>
              <Badge className={`${item.category === 'High' ? 'bg-yellow-500' : item.category === 'Medium' ? 'bg-slate-400' : 'bg-orange-400'} text-white text-xs`}>
                {item.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{getCategoryIcon(item.category)}</span>
              <span className="text-gray-900">{item.devotee}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                {item.type}
              </Badge>
              <span className={`px-2 py-0.5 rounded ${getStatusColor(item.status)} text-white`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="bg-gradient-to-r from-orange-100 to-amber-100 border-t-2 border-orange-200 px-6 py-4">
        <div className="text-sm text-orange-900 mb-2">
          📊 Today's Statistics
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/70 rounded-lg p-2">
            <div className="text-orange-900">348</div>
            <div className="text-xs text-orange-700">Total</div>
          </div>
          <div className="bg-white/70 rounded-lg p-2">
            <div className="text-green-700">279</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="bg-white/70 rounded-lg p-2">
            <div className="text-red-700">69</div>
            <div className="text-xs text-red-600">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
}
