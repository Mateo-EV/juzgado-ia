import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SearchFilters } from "@/features/expedientes-search/types";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
  onApplyFilters: () => void;
}

export function SearchFiltersComponent({
  filters,
  onFilterChange,
  onApplyFilters,
}: SearchFiltersProps) {
  // Obtener la fecha de hoy para limitar selección
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fecha Inicio */}
        <div className="space-y-2">
          <Label htmlFor="fecha-inicio">Fecha inicio</Label>
          <Input
            id="fecha-inicio"
            type="date"
            value={filters.fechaInicio}
            max={today}
            onChange={(e) => onFilterChange("fechaInicio", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Fecha Fin */}
        <div className="space-y-2">
          <Label htmlFor="fecha-fin">Fecha fin</Label>
          <Input
            id="fecha-fin"
            type="date"
            value={filters.fechaFin}
            max={today}
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      {/* Botón de Aplicar Filtros */}
      <div className="mt-6">
        <Button onClick={onApplyFilters} className="w-full">
          Aplicar filtros
        </Button>
      </div>
    </div>
  );
}
