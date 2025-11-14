import { useEffect, useMemo, useState } from 'react';
import { Video, Package, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface OrdersTableProps {
  activeFilter: string;
}

interface LiveOrder {
  id: number;
  status: string;
  amountPaise: number;
  currency: string;
  createdAt?: string;
  temple?: {
    id: number;
    name: string;
    location?: string | null;
  };
  user?: {
    id: number;
    phoneNumber: string;
  };
  offeringItem?: {
    id: number;
    name: string;
    section?: {
      id: number;
      key: string;
      title: string;
    };
  };
}

function resolveApiBaseUrl() {
  const metaEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const configured = metaEnv?.VITE_API_URL;
  if (configured) {
    return configured;
  }
  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    return `http://${hostname}:4000`;
  }
  return 'http://localhost:4000';
}

const API_BASE_URL = resolveApiBaseUrl();

const statusLabelMap: Record<string, string> = {
  PENDING: 'In Queue',
  PAID: 'Completed',
  FAILED: 'Failed',
  CANCELLED: 'Cancelled',
};

const sectionTypeMap: Record<string, string> = {
  diya: 'Pre',
  flower: 'Real',
  chadava: 'Subscription',
  thali: 'Real',
  shank: 'Subscription',
};

const sectionCategoryMap: Record<string, 'High' | 'Medium' | 'Low'> = {
  diya: 'High',
  flower: 'Medium',
  chadava: 'High',
  thali: 'High',
  shank: 'Medium',
};

export function OrdersTable({ activeFilter }: OrdersTableProps) {
  const [orders, setOrders] = useState<LiveOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let cancelled = false;

    async function loadInitial() {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/orders?limit=50`);
        if (!res.ok) {
          throw new Error('Failed to load orders');
        }
        const data: LiveOrder[] = await res.json();
        if (!cancelled) {
          setOrders(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load orders');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    function subscribeToStream() {
      eventSource = new EventSource(`${API_BASE_URL.replace('http', 'http')}/orders/stream`);
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data) as { type: string; order: LiveOrder };
          if (!payload?.order?.id) return;
          setOrders((prev) => {
            const existsIndex = prev.findIndex((o) => o.id === payload.order.id);
            if (existsIndex === -1) {
              return [payload.order, ...prev].slice(0, 100);
            }
            const copy = [...prev];
            copy[existsIndex] = payload.order;
            return copy;
          });
        } catch (e) {
          console.warn('orders stream parse error', e);
        }
      };
      eventSource.onerror = () => {
        if (eventSource) {
          eventSource.close();
          eventSource = null;
        }
        setTimeout(() => {
          if (!cancelled) subscribeToStream();
        }, 3000);
      };
    }

    loadInitial();
    subscribeToStream();

    return () => {
      cancelled = true;
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const computedOrders = useMemo(() => {
    return orders.map((order) => {
      const sectionKey = order.offeringItem?.section?.key ?? 'chadava';
      const type = sectionTypeMap[sectionKey] ?? 'Real';
      const category = sectionCategoryMap[sectionKey] ?? 'Medium';
      const price = Math.round((order.amountPaise ?? 0) / 100);
      const status = statusLabelMap[order.status] ?? order.status;
      const devoteeName = order.user?.phoneNumber ? `+${order.user.phoneNumber.slice(-10)}` : 'Devotee';
      const slotTime = order.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—';
      return {
        id: order.id,
        type,
        category,
        price,
        status,
        devoteeName,
        gotra: order.offeringItem?.name ?? 'Chadhava',
        slotTime,
      };
    });
  }, [orders]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'High':
        return 'bg-gradient-to-r from-yellow-100 to-amber-100 border-l-4 border-yellow-500';
      case 'Medium':
        return 'bg-gradient-to-r from-gray-50 to-slate-100 border-l-4 border-slate-400';
      case 'Low':
        return 'bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400';
      default:
        return 'bg-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-red-500 text-white';
      case 'Preparing':
        return 'bg-yellow-500 text-white';
      case 'In Queue':
        return 'bg-blue-500 text-white';
      case 'Completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Pre':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Real':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Subscription':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="h-full bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border-2 border-orange-200 overflow-hidden flex flex-col">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-4">
        <h3 className="flex items-center gap-2">
          <span>📋</span>
          Active Orders — Morning Aarti Session
        </h3>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-orange-50 border-b-2 border-orange-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Order ID</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Devotee Name</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Gotra</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Type</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Category</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Price</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Slot Time</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Status</th>
              <th className="px-4 py-3 text-left text-sm text-orange-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {computedOrders.map((order) => (
              <tr
                key={order.id}
                className={`border-b border-orange-100 hover:shadow-md transition-shadow ${getCategoryColor(order.category)}`}
              >
                <td className="px-4 py-4">
                  <span className="text-orange-700">#{order.id}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-900">{order.devoteeName}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-700 text-sm">{order.gotra}</span>
                </td>
                <td className="px-4 py-4">
                  <Badge variant="outline" className={`${getTypeColor(order.type)} text-xs`}>
                    {order.type}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <Badge className={`${order.category === 'High' ? 'bg-yellow-500' : order.category === 'Medium' ? 'bg-slate-400' : 'bg-orange-400'} text-white text-xs`}>
                    {order.category}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <span className="text-green-700">₹{order.price.toLocaleString()}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-gray-700 text-sm">{order.slotTime}</span>
                </td>
                <td className="px-4 py-4">
                  <Badge className={`${getStatusColor(order.status)} text-xs`}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-100" title="View Proof">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-100" title="Dispatch Prasad">
                      <Package className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-100" title="Notify Devotee">
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="bg-orange-50 border-t-2 border-orange-200 px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-orange-800">
          {isLoading ? 'Loading orders…' : `Showing ${computedOrders.length} live orders`}
        </div>
        <div className="text-sm text-orange-700">
          Live updates from mobile offerings
        </div>
      </div>
    </div>
  );
}
