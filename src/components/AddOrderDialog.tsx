import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddOrderDialog({ open, onOpenChange }: AddOrderDialogProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [assignedSlot, setAssignedSlot] = useState('06:50 AM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      onOpenChange(false);
    }, 3000);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
          <DialogHeader>
            <DialogTitle className="text-orange-900 flex items-center gap-2">
              <span className="text-2xl">🕉️</span>
              Register New Chadhava Offering
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 py-4">
              {/* Devotee Name */}
              <div className="space-y-2">
                <Label htmlFor="devotee-name" className="text-orange-900">
                  Devotee Name *
                </Label>
                <Input
                  id="devotee-name"
                  placeholder="Enter full name"
                  className="border-orange-200 focus:border-orange-400"
                  required
                />
              </div>

              {/* Gotra */}
              <div className="space-y-2">
                <Label htmlFor="gotra" className="text-orange-900">
                  Gotra *
                </Label>
                <Input
                  id="gotra"
                  placeholder="Enter gotra"
                  className="border-orange-200 focus:border-orange-400"
                  required
                />
              </div>

              {/* Offering Type */}
              <div className="space-y-2">
                <Label htmlFor="offering-type" className="text-orange-900">
                  Offering Type *
                </Label>
                <Select required>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select offering" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flower">🌸 Flower</SelectItem>
                    <SelectItem value="diya">🪔 Diya</SelectItem>
                    <SelectItem value="thali">🛕 Thali</SelectItem>
                    <SelectItem value="prasad">🍚 Prasad</SelectItem>
                    <SelectItem value="dhoop">🔥 Dhoop</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Tier */}
              <div className="space-y-2">
                <Label htmlFor="price-tier" className="text-orange-900">
                  Price Tier *
                </Label>
                <Select required>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">⭐ High (₹1001+)</SelectItem>
                    <SelectItem value="medium">🔸 Medium (₹301-₹1000)</SelectItem>
                    <SelectItem value="low">🔹 Low (₹300 & below)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-orange-900">
                  Amount (₹) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="border-orange-200 focus:border-orange-400"
                  required
                />
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label htmlFor="type" className="text-orange-900">
                  Type *
                </Label>
                <Select required>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre">📅 Pre (Advance Booking)</SelectItem>
                    <SelectItem value="real">⚡ Real (Live Offering)</SelectItem>
                    <SelectItem value="subscription">🔁 Subscription</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Slot Time */}
              <div className="space-y-2">
                <Label htmlFor="slot-time" className="text-orange-900">
                  Slot Time *
                </Label>
                <Select required>
                  <SelectTrigger className="border-orange-200 focus:border-orange-400">
                    <SelectValue placeholder="Select or auto-assign" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">🤖 Auto-Assign Next Available</SelectItem>
                    <SelectItem value="06:00">06:00 AM - Morning Aarti</SelectItem>
                    <SelectItem value="06:30">06:30 AM - Morning Aarti</SelectItem>
                    <SelectItem value="07:00">07:00 AM - Morning Aarti</SelectItem>
                    <SelectItem value="12:00">12:00 PM - Madhyahna Aarti</SelectItem>
                    <SelectItem value="19:00">07:00 PM - Evening Aarti</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Temple Code */}
              <div className="space-y-2">
                <Label htmlFor="temple-code" className="text-orange-900">
                  Temple Code
                </Label>
                <Input
                  id="temple-code"
                  value="KVT-001"
                  className="border-orange-200 bg-orange-100/50"
                  disabled
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white"
              >
                Add to Queue
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
          <div className="text-center py-6">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-green-900 mb-2">Offering Added Successfully!</h3>
            <p className="text-green-700 mb-4">
              Slot Assigned at <span className="font-semibold">{assignedSlot}</span>
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Order has been added to the queue
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
