import React, { useState } from 'react';
import { TERMINAL_HUBS } from '../../data/liveMarket';
import { Warehouse, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Clock, BatteryCharging } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TerminalSpacePage: React.FC = () => {
  const [selectedHubId, setSelectedHubId] = useState(TERMINAL_HUBS[0].id);
  const [baysCount, setBaysCount] = useState(2);
  const [durationDays, setDurationDays] = useState(7);
  const [reserved, setReserved] = useState(false);
  const [resId, setResId] = useState('');

  const selectedHub = TERMINAL_HUBS.find((h) => h.id === selectedHubId) || TERMINAL_HUBS[0];
  const totalCost = baysCount * selectedHub.ratePerBayDay * durationDays;

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-TRM-${Math.floor(100000 + Math.random() * 900000)}`;
    setResId(id);
    setReserved(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
            <span>INFRASTRUCTURE & CROSS-DOCK YARDS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Book Truck Terminal Space
          </h1>
          <p className="text-sm text-[#625E58] max-w-2xl">
            Secure truck parking, cross-docking bays, driver rest cabins, and reefer plug-ins across our 6 certified Indian logistics terminals.
          </p>
        </div>

        {reserved ? (
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 text-center space-y-5 shadow-lg max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#171717]">
                Terminal Bay Allocation Confirmed!
              </h2>
              <p className="text-xs text-[#625E58]">
                Gate Access Permit Ref: <span className="font-mono font-bold text-[#FF4D16]">{resId}</span>
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] text-xs text-[#625E58] text-left space-y-2">
              <p><strong>Terminal Hub:</strong> {selectedHub.name} ({selectedHub.city})</p>
              <p><strong>Bays Reserved:</strong> {baysCount} dedicated heavy-vehicle berths</p>
              <p><strong>Duration:</strong> {durationDays} days</p>
              <p><strong>Estimated Retainer:</strong> ₹{totalCost.toLocaleString('en-IN')}</p>
              <p className="pt-2 text-[11px] text-[#8C877D] border-t border-[#E2DED5]">
                Digital QR Gate Passes for your assigned fleet have been prepared. Driver vehicle entry permits will be authenticated by biometric terminal security.
              </p>
            </div>

            <button
              onClick={() => setReserved(false)}
              className="px-6 py-3 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#FF4D16] transition-colors"
            >
              Reserve Additional Space
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Terminal Hub Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#171717] block">
                Select Logistics Terminal Yard *
              </span>

              <div className="space-y-3">
                {TERMINAL_HUBS.map((hub) => {
                  const isSelected = selectedHubId === hub.id;

                  return (
                    <div
                      key={hub.id}
                      onClick={() => setSelectedHubId(hub.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'bg-[#FFF0EB]/50 border-[#FF4D16] shadow-sm'
                          : 'bg-white border-[#E2DED5] hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-sm text-[#171717]">{hub.name}</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white text-[#FF4D16] font-bold border border-[#E2DED5]">
                              {hub.availableBays} bays available
                            </span>
                          </div>
                          <p className="text-xs text-[#625E58] mt-0.5 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-[#FF4D16]" />
                            <span>{hub.city}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-[#FF4D16]">
                            ₹{hub.ratePerBayDay}
                          </span>
                          <span className="text-[10px] text-[#8C877D] block">/ bay / day</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#E2DED5]/60 text-[11px] text-[#625E58] flex items-center justify-between">
                        <span>{hub.security}</span>
                        <span className="font-mono text-[10px] text-[#8C877D]">Total {hub.totalBays} Bays</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Form Card (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-[#171717]">
                Terminal Reservation Summary
              </h3>

              <form onSubmit={handleReserve} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#171717]">Number of Dedicated Bays</label>
                  <div className="flex items-center space-x-3">
                    {[1, 2, 4, 8, 12].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setBaysCount(num)}
                        className={`flex-1 py-2 rounded-lg font-bold border ${
                          baysCount === num
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-[#FAF8F5] text-[#171717] border-[#E2DED5]'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#171717]">Lease Duration (Days)</label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none"
                  >
                    <option value={1}>1 Day (Spot Transit)</option>
                    <option value={3}>3 Days</option>
                    <option value={7}>7 Days (Weekly)</option>
                    <option value={15}>15 Days</option>
                    <option value={30}>30 Days (Monthly Retainer)</option>
                  </select>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] space-y-2">
                  <div className="flex justify-between text-[#625E58]">
                    <span>Terminal Hub</span>
                    <span className="font-bold text-[#171717]">{selectedHub.name}</span>
                  </div>
                  <div className="flex justify-between text-[#625E58]">
                    <span>Rate Calculation</span>
                    <span>{baysCount} bays × ₹{selectedHub.ratePerBayDay} × {durationDays}d</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-[#E2DED5]">
                    <span className="font-bold text-[#171717]">Estimated Total</span>
                    <span className="font-mono font-extrabold text-base text-[#FF4D16]">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Request Bay Allocation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C877D] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  <span>24/7 Armed Security • High-Mast Floodlights • Driver Restrooms</span>
                </div>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

