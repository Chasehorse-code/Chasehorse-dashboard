import React, { useState } from 'react';
import { FREIGHT_INDEX_DATA, TOP_LANE_RATES } from '../../data/liveMarket';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowRight, ShieldCheck, Filter, Download, Info } from 'lucide-react';

export const FreightIndexPage: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'7D' | '30D' | '90D'>('7D');

  return (
    <div className="w-full bg-[#F4F1EA] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#FF4D16] text-xs font-mono font-bold uppercase border border-[#E2DED5]">
              <span className="w-2 h-2 rounded-full bg-[#FF4D16] animate-pulse" />
              <span>TODAY FREIGHT INDEX (CH-FI)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717]">
              National Freight Rate Index
            </h1>
            <p className="text-sm text-[#625E58] max-w-2xl">
              Algorithmic benchmark tracking pan-India average truckload spot rates (₹/km) weighted across 6 economic hubs and calibrated with national diesel indices.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white border border-[#E2DED5] text-[#171717] font-bold">
              Data Status: Demo Index (v1.4)
            </span>
          </div>
        </div>

        {/* 3 Metric Summary Cards (Matches reference sheet) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C877D]">
              India National Average
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#171717]">
                ₹42.5
              </span>
              <span className="text-xs text-[#625E58]">/ km</span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+2.5%</span>
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D]">Updated 30 mins ago across 14,000 spot loads</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C877D]">
              Diesel Fuel Index
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#171717]">
                91.2
              </span>
              <span className="text-xs text-[#625E58]">pts</span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#FAF8F5] text-[#625E58]">
                <span>Stable</span>
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D]">Direct fuel surcharge correlation factor</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 space-y-2 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8C877D]">
              Active Lane Capacity
            </span>
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#171717]">
                125
              </span>
              <span className="text-xs text-[#625E58]">pts</span>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>High Supply</span>
              </span>
            </div>
            <p className="text-[11px] text-[#8C877D]">Healthy truck availability in Western & Southern hubs</p>
          </div>
        </div>

        {/* Interactive Chart Container */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg text-[#171717]">
                Freight Index Velocity & Trends
              </h3>
              <p className="text-xs text-[#625E58]">Rate per kilometer (₹/km) historical movement</p>
            </div>

            {/* Time range toggles */}
            <div className="flex items-center space-x-1.5 p-1 bg-[#FAF8F5] border border-[#E2DED5] rounded-xl text-xs font-bold">
              {(['7D', '30D', '90D'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeRange === range
                      ? 'bg-[#171717] text-white shadow-sm'
                      : 'text-[#625E58] hover:text-[#171717]'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={FREIGHT_INDEX_DATA}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF4D16" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FF4D16" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2DED5" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  stroke="#8C877D"
                  fontSize={11}
                  fontFamily="JetBrains Mono"
                />
                <YAxis
                  domain={[38, 46]}
                  tickLine={false}
                  stroke="#8C877D"
                  fontSize={11}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#171717] text-white p-3 rounded-xl border border-white/10 shadow-xl text-xs font-mono space-y-1">
                          <p className="font-bold text-[#FF4D16]">{data.date}</p>
                          <p>Avg Rate: ₹{data.ratePerKm}/km</p>
                          <p className="text-[11px] text-[#E2DED5]/70">Diesel Index: {data.dieselIndex}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ratePerKm"
                  stroke="#FF4D16"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Arterial Corridors Breakdown */}
        <div className="bg-white rounded-3xl border border-[#E2DED5] p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-[#171717]">Top 6 Freight Corridors</h3>
            <p className="text-xs text-[#625E58]">Benchmarked against actual transporter contract dispatches</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_LANE_RATES.map((lane) => (
              <div
                key={lane.id}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E2DED5] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#171717]">
                    {lane.origin} → {lane.destination}
                  </h4>
                  <span
                    className={`text-xs font-mono font-bold ${
                      lane.changePercent > 0 ? 'text-red-600' : 'text-green-600'
                    }`}
                  >
                    {lane.changePercent > 0 ? `+${lane.changePercent}%` : `${lane.changePercent}%`}
                  </span>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-mono font-extrabold text-[#171717]">
                    ₹{lane.ratePerKm.toFixed(1)}
                  </span>
                  <span className="text-xs text-[#625E58]">/ km</span>
                </div>

                <div className="text-[11px] text-[#625E58] space-y-1 pt-2 border-t border-[#E2DED5]">
                  <p>Distance: {lane.distance} • Transit: {lane.transitTime}</p>
                  <p>Preferred: {lane.truckTypes.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory Note */}
        <div className="p-4 bg-white rounded-2xl border border-[#E2DED5] flex items-center space-x-3 text-xs text-[#625E58]">
          <Info className="w-5 h-5 text-[#FF4D16] shrink-0" />
          <span>
            Notice: All index rates displayed represent normalized sample market intelligence data calibrated for enterprise planning. For live contractual API feeds or custom lane telemetry, connect with our solutions desk.
          </span>
        </div>

      </div>
    </div>
  );
};

