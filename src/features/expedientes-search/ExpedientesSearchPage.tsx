import { SearchFiltersComponent } from "./components/SearchFilters";
import { ExpedientesTable } from "./components/ExpedientesTable";
import { useExpedientesFilter } from "./hooks/useExpedientesFilter";

export function ExpedientesSearchPage() {
  const {
    filters,
    updateFilter,
    applyFilters,
    filteredExpedientes,
    juzgadosOptions,
    actosOptions,
  } = useExpedientesFilter();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Encabezado */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Sistema de Búsqueda Inteligente
          </h1>
          <p className="text-lg text-slate-600">
            Busca y analiza expedientes judiciales con asistencia de IA
          </p>
        </div>

        {/* Filtros */}
        <SearchFiltersComponent
          filters={filters}
          onFilterChange={updateFilter}
          onApplyFilters={applyFilters}
          juzgadosOptions={juzgadosOptions}
          actosOptions={actosOptions}
        />

        {/* Resultados */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Resultados ({filteredExpedientes.length})
            </h2>
          </div>
          <ExpedientesTable expedientes={filteredExpedientes} />
        </div>
      </div>
    </div>
  );
}
