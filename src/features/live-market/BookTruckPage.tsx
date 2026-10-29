import React, { useState } from 'react';
import { TRUCK_TYPES } from '../../data/liveMarket';
import { Truck, MapPin, Calendar, Weight, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BookTruckPage: React.FC = () => {
  const [origin, setOrigin] = useState('Delhi NCR');
  const [destination, setDestination] = useState('Mumbai (Bhiwandi)');
  const [selectedTruckId, setSelectedTruckId] = useState(TRUCK_TYPES[0].id);
  const [cargoType, setCargoType] = useState('Automotive Components');
  const [dispatchDate, setDispatchDate] = useState('2025-11-01');
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const selectedTruck = TRUCK_TYPES.find((t) => t.id === selectedTruckId) || TRUCK_TYPES[0];

  // Dynamic estimate calculation
  const estimatedKm = 1420;
  const ratePerKm = 44.5;
  const estimatedFare = Math.round(estimatedKm * ratePerKm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `CH-FTL-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(id);
    setBooked(true);
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
            <span>SPOT FREIGHT DISPATCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
            Book Truck Now
          </h1>
          <p className="text-sm text-[#625E58]">
            Instant spot capacity across containerized, multi-axle, and high-bed trailers with verified drivers, GPS telemetry, and dock lashing compliance.
          </p>
        </div>

        {booked ? (
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-8 sm:p-12 text-center space-y-5 shadow-lg">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-[#171717]">
                Truck Capacity Request Reserved!
              </h2>
              <p className="text-xs text-[#625E58]">
                Booking Reference ID: <span className="font-mono font-bold text-[#FF4D16]">{bookingRef}</span>
              </p>
            </div>

            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] max-w-md mx-auto text-xs text-[#625E58] text-left space-y-2">
              <p><strong>Route:</strong> {origin} → {destination}</p>
              <p><strong>Vehicle:</strong> {selectedTruck.name}</p>
              <p><strong>Dispatch Date:</strong> {dispatchDate}</p>
              <p><strong>Estimated Freight:</strong> ₹{estimatedFare.toLocaleString('en-IN')}</p>
              <p className="pt-1 text-[11px] text-[#8C877D] border-t border-[#E2DED5]">
                Our dispatch control room is assigning a vetted vehicle and will deliver driver KYC & live GPS link via SMS / WhatsApp within 30 minutes.
              </p>
            </div>

            <button
              onClick={() => setBooked(false)}
              className="px-6 py-3 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#FF4D16] transition-colors"
            >
              Book Another Vehicle
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Route & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>Origin City / Hub *</span>
                </label>
                <select
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                >
                  <option value="Delhi NCR">Delhi NCR / Gurugram</option>
                  <option value="Mumbai (Bhiwandi)">Mumbai / Bhiwandi</option>
                  <option value="Bengaluru">Bengaluru Hosur Corridor</option>
                  <option value="Chennai">Chennai Sriperumbudur</option>
                  <option value="Kolkata">Kolkata Dankuni</option>
                  <option value="Hyderabad">Hyderabad Aero Logistics</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>Destination City *</span>
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                >
                  <option value="Mumbai (Bhiwandi)">Mumbai (Bhiwandi)</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune Industrial">Pune Industrial Corridor</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#171717] flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4D16]" />
                  <span>Scheduled Loading Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={dispatchDate}
                  onChange={(e) => setDispatchDate(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#E2DED5] rounded-xl focus:outline-none focus:border-[#FF4D16]"
                />
              </div>
            </div>

            {/* Vehicle Selection Grid */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] block">
                Select Vehicle Configuration *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {TRUCK_TYPES.map((truck) => {
                  const isSelected = selectedTruckId === truck.id;
                  return (
                    <div
                      key={truck.id}
                      onClick={() => setSelectedTruckId(truck.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-[#FFF0EB]/50 border-[#FF4D16] shadow-sm'
                          : 'bg-[#FAF8F5] border-[#E2DED5] hover:border-[#171717]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Truck className={`w-5 h-5 ${isSelected ? 'text-[#FF4D16]' : 'text-[#8C877D]'}`} />
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-[#171717] border border-[#E2DED5]">
                          {truck.capacity}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[#171717]">{truck.name}</h4>
                      <p className="text-[11px] text-[#625E58]">{truck.ideal}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Estimated Rate Card */}
            <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#E2DED5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C877D]">
                  Indicative Spot Rate ({origin} → {destination})
                </span>
                <div className="text-2xl font-extrabold text-[#171717] font-mono mt-0.5">
                  ₹{estimatedFare.toLocaleString('en-IN')} <span className="text-xs text-[#625E58] font-sans font-normal">(all-inclusive demo rate)</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FF4D16] text-white font-bold rounded-xl hover:bg-[#E53E0B] transition-colors text-sm flex items-center justify-center space-x-2 shadow-md"
              >
                <span>Confirm Spot Booking Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-[#8C877D]">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>Full Transit Marine Insurance Cover • Fastag Tolls Included • Vetted Driver KYC</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

