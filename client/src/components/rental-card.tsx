import { Badge } from "@/components/ui/badge";
import { PackageOpen } from "lucide-react";

type RentalCardProps = {
  name: string;
  customer: string;
  date: string;
  days: number;
  status: "active" | "completed";
};

export default function RentalCard({ name, customer, date, days, status }: RentalCardProps) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-gray-100 h-12 w-12 rounded-lg flex items-center justify-center">
        <PackageOpen className="h-6 w-6 text-gray-600" />
      </div>
      <div className="ml-4 flex-1">
        <h5 className="text-sm font-medium text-gray-900">{name}</h5>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            {customer} • {date} • {days} días
          </span>
          <Badge 
            variant="outline" 
            className={`
              ${status === "active" 
                ? "text-green-700 bg-green-50 border-green-200 hover:bg-green-100" 
                : "text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100"}
            `}
          >
            {status === "active" ? "Activo" : "Completado"}
          </Badge>
        </div>
      </div>
    </div>
  );
}
