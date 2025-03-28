import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type ChartPreviewProps = {
  type: "alquileres" | "vistas";
};

export default function ChartPreview({ type }: ChartPreviewProps) {
  // Data for rentals chart
  const rentalData = [
    { day: "01", value: 2 },
    { day: "02", value: 1 },
    { day: "03", value: 3 },
    { day: "04", value: 2 },
    { day: "05", value: 4 },
    { day: "06", value: 3 },
    { day: "07", value: 5 },
    { day: "08", value: 3 },
    { day: "09", value: 6 },
    { day: "10", value: 4 },
    { day: "11", value: 7 },
    { day: "12", value: 5 },
    { day: "13", value: 3 },
    { day: "14", value: 6 },
    { day: "15", value: 8 },
    { day: "16", value: 9 },
    { day: "17", value: 7 },
    { day: "18", value: 9 },
    { day: "19", value: 8 },
    { day: "20", value: 10 },
    { day: "21", value: 8 },
    { day: "22", value: 11 },
    { day: "23", value: 9 },
    { day: "24", value: 12 },
    { day: "25", value: 10 },
    { day: "26", value: 9 },
    { day: "27", value: 11 },
    { day: "28", value: 10 },
    { day: "29", value: 13 },
    { day: "30", value: 12 },
  ];

  // Data for views chart
  const viewsData = [
    { day: "01", value: 45 },
    { day: "02", value: 52 },
    { day: "03", value: 48 },
    { day: "04", value: 58 },
    { day: "05", value: 75 },
    { day: "06", value: 62 },
    { day: "07", value: 68 },
    { day: "08", value: 75 },
    { day: "09", value: 60 },
    { day: "10", value: 85 },
    { day: "11", value: 90 },
    { day: "12", value: 102 },
    { day: "13", value: 110 },
    { day: "14", value: 120 },
    { day: "15", value: 125 },
    { day: "16", value: 135 },
    { day: "17", value: 132 },
    { day: "18", value: 145 },
    { day: "19", value: 140 },
    { day: "20", value: 165 },
    { day: "21", value: 172 },
    { day: "22", value: 190 },
    { day: "23", value: 185 },
    { day: "24", value: 192 },
    { day: "25", value: 210 },
    { day: "26", value: 205 },
    { day: "27", value: 220 },
    { day: "28", value: 225 },
    { day: "29", value: 227 },
    { day: "30", value: 230 },
  ];

  // Select data and styling based on chart type
  const data = type === "alquileres" ? rentalData : viewsData;
  const strokeColor = type === "alquileres" ? "#10B981" : "#3B82F6";
  const fillColor = type === "alquileres" ? "rgba(16, 185, 129, 0.1)" : "rgba(59, 130, 246, 0.1)";
  const domain = type === "alquileres" ? [0, 16] : [0, 250];
  const highlightDay = type === "alquileres" ? "15" : "17";
  const highlightValue = type === "alquileres" ? 8 : 132;

  // Helper function to format the tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm text-xs rounded">
          <p className="font-medium">{`Día ${label}`}</p>
          <p className="text-gray-700">{`${type === "alquileres" ? "Alquileres" : "Vistas"}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <defs>
            <linearGradient id={`color-${type}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.2} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12, fill: '#9CA3AF' }} 
            tickLine={false}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            domain={domain} 
            tick={{ fontSize: 12, fill: '#9CA3AF' }} 
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={strokeColor} 
            strokeWidth={2}
            fill={`url(#color-${type})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Highlighted point */}
      <div 
        className="absolute text-xs bg-white shadow rounded-md p-2 border border-gray-100"
        style={{ 
          left: `${(parseInt(highlightDay) / 30) * 100}%`, 
          top: `${50 - (highlightValue / (domain[1] * 0.8)) * 100}%`,
          transform: 'translate(-50%, -100%)'
        }}
      >
        <div className="font-medium">Día {highlightDay}</div>
        <div>{type === "alquileres" ? "Alquileres" : "Vistas"}: {highlightValue}</div>
      </div>
    </div>
  );
}
