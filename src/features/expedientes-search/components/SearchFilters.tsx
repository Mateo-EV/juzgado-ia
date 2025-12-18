import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ComboboxOption, SearchFilters } from "../types";

interface SearchFiltersProps {
  filters: SearchFilters;
  onFilterChange: (key: keyof SearchFilters, value: string) => void;
  onApplyFilters: () => void;
  juzgadosOptions: ComboboxOption[];
  actosOptions: ComboboxOption[];
}

export function SearchFiltersComponent({
  filters,
  onFilterChange,
  onApplyFilters,
  juzgadosOptions,
  actosOptions,
}: SearchFiltersProps) {
  const [openJuzgado, setOpenJuzgado] = useState(false);
  const [openActo, setOpenActo] = useState(false);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Juzgado Combobox */}
        <div className="space-y-2">
          <Label htmlFor="juzgado">Juzgado</Label>
          <Popover open={openJuzgado} onOpenChange={setOpenJuzgado}>
            <PopoverTrigger asChild>
              <Button
                id="juzgado"
                variant="outline"
                role="combobox"
                aria-expanded={openJuzgado}
                className="w-full justify-between"
              >
                {filters.juzgado
                  ? juzgadosOptions.find((option) => option.value === filters.juzgado)?.label
                  : "Selecciona un juzgado"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-75 p-0">
              <Command>
                <CommandInput placeholder="Buscar juzgado..." />
                <CommandList>
                  <CommandEmpty>No se encontró el juzgado.</CommandEmpty>
                  <CommandGroup>
                    {juzgadosOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          onFilterChange("juzgado", currentValue === filters.juzgado ? "" : currentValue);
                          setOpenJuzgado(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.juzgado === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Acto Procesal Combobox */}
        <div className="space-y-2">
          <Label htmlFor="acto-procesal">Acto procesal</Label>
          <Popover open={openActo} onOpenChange={setOpenActo}>
            <PopoverTrigger asChild>
              <Button
                id="acto-procesal"
                variant="outline"
                role="combobox"
                aria-expanded={openActo}
                className="w-full justify-between"
              >
                {filters.actoProcesal
                  ? actosOptions.find((option) => option.value === filters.actoProcesal)?.label
                  : "Selecciona un acto procesal"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-75 p-0">
              <Command>
                <CommandInput placeholder="Buscar acto procesal..." />
                <CommandList>
                  <CommandEmpty>No se encontró el acto procesal.</CommandEmpty>
                  <CommandGroup>
                    {actosOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          onFilterChange("actoProcesal", currentValue === filters.actoProcesal ? "" : currentValue);
                          setOpenActo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.actoProcesal === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

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

        {/* Botón Aplicar Filtros */}
        <div className="space-y-2">
          <Label className="invisible">Acción</Label>
          <Button onClick={onApplyFilters} className="w-full">
            Aplicar filtros
          </Button>
        </div>
      </div>
    </div>
  );
}
