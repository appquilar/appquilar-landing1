import { PackageOpen } from "lucide-react";

type ProductCardProps = {
  name: string;
  views: number;
  rentals: number;
  rank: number;
};

export default function ProductCard({ name, views, rentals, rank }: ProductCardProps) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 bg-gray-100 h-12 w-12 rounded-lg flex items-center justify-center">
        <PackageOpen className="h-6 w-6 text-gray-600" />
      </div>
      <div className="ml-4 flex-1">
        <h5 className="text-sm font-medium text-gray-900">{name}</h5>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{views} vistas, {rentals} alquileres</span>
          <span className="font-medium text-primary">#{rank}</span>
        </div>
      </div>
    </div>
  );
}
