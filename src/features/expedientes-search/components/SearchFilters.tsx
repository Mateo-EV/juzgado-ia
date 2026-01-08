import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import type { ComboboxOption, SearchFilters } from "../types";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  juzgadosOptions: ComboboxOption[];
  actosOptions: ComboboxOption[];
  especialidadOptions: ComboboxOption[];
  materiaOptions: ComboboxOption[];
  procesoOptions: ComboboxOption[];
  estadoOptions: ComboboxOption[];
}

export function SearchFiltersComponent({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  juzgadosOptions,
  actosOptions,
  especialidadOptions,
  materiaOptions,
  procesoOptions,
  estadoOptions,
}: SearchFiltersProps) {

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Fecha Inicio */}
        <div className="space-y-2">
          <Label htmlFor="fecha-inicio">Fecha inicio</Label>
          <Input
            id="fecha-inicio"
            type="date"
            value={filters.fechaInicio}
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
            onChange={(e) => onFilterChange("fechaFin", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Juzgado */}
        <div className="space-y-2">
          <Label htmlFor="juzgado">Juzgado</Label>
          <Select value={filters.juzgado} onValueChange={(value) => onFilterChange("juzgado", value)}>
            <SelectTrigger id="juzgado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {juzgadosOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Especialidad */}
        <div className="space-y-2">
          <Label htmlFor="especialidad">Especialidad</Label>
          <Select value={filters.especialidad} onValueChange={(value) => onFilterChange("especialidad", value)}>
            <SelectTrigger id="especialidad">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              {especialidadOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Materia */}
        <div className="space-y-2">
          <Label htmlFor="materia">Materia</Label>
          <Select value={filters.materia} onValueChange={(value) => onFilterChange("materia", value)}>
            <SelectTrigger id="materia">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              {materiaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Proceso */}
        <div className="space-y-2">
          <Label htmlFor="proceso">Proceso</Label>
          <Select value={filters.proceso} onValueChange={(value) => onFilterChange("proceso", value)}>
            <SelectTrigger id="proceso">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {procesoOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Acto Procesal */}
        <div className="space-y-2">
          <Label htmlFor="acto-procesal">Acto Procesal</Label>
          <Select value={filters.actoProcesal} onValueChange={(value) => onFilterChange("actoProcesal", value)}>
            <SelectTrigger id="acto-procesal">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {actosOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Estado */}
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select value={filters.estado} onValueChange={(value) => onFilterChange("estado", value)}>
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {estadoOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Botones */}
        <div className="space-y-2 md:col-span-2 lg:col-span-3 xl:col-span-4">
          <Label className="invisible">Acciones</Label>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={onApplyFilters} className="flex-1 min-w-50">
              Aplicar filtros
            </Button>
            <Button onClick={onClearFilters} variant="outline" className="flex-1 min-w-50">
              <X className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
