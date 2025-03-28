import { ArrowDown, ArrowUp, SquareDashedBottom } from "lucide-react";

type StatCardProps = {
  value: string;
  label: string;
  trend?: string;
  trendLabel?: string;
  trendType: "up" | "down" | "neutral";
  subLabel?: string;
};

export default function StatCard({ 
  value, 
  label, 
  trend, 
  trendLabel, 
  trendType,
  subLabel 
}: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 text-center">
      <div className="text-3xl font-bold text-primary">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{label}</div>
      
      {trendType === "neutral" && subLabel && (
        <div className="text-xs text-gray-600 mt-1">{subLabel}</div>
      )}
      
      {trendType !== "neutral" && trend && (
        <div className={`text-xs flex items-center justify-center gap-0.5 mt-1 ${
          trendType === "up" ? "text-green-600" : "text-red-600"
        }`}>
          {trendType === "up" ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )}
          {trend} {trendLabel && <span>{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
