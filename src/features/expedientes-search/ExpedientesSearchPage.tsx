import { SearchFiltersComponent } from "@/features/expedientes-search/components/SearchFilters";
import { ExpedientesTable } from "@/features/expedientes-search/components/ExpedientesTable";
import { useExpedientesFilter } from "@/features/expedientes-search/hooks/useExpedientesFilter";

export function ExpedientesSearchPage() {
  const {
    filters,
    updateFilter,
    applyFilters,
    filteredExpedientes,
    totalFilteredCount,
    columns,
    toggleColumnVisibility,
    sortConfig,
    toggleSort,
    currentPage,
    totalPages,
    itemsPerPage,
    goToPage,
  } = useExpedientesFilter();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-350 mx-auto space-y-8">
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
        <div className="flex justify-center">
          <SearchFiltersComponent
            filters={filters}
            onFilterChange={updateFilter}
            onApplyFilters={applyFilters}
          />
        </div>

        {/* Resultados */}
        <div className="space-y-4">
          <ExpedientesTable
            expedientes={filteredExpedientes}
            totalCount={totalFilteredCount}
            columns={columns}
            onToggleColumn={toggleColumnVisibility}
            sortConfig={sortConfig}
            onToggleSort={toggleSort}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={goToPage}
          />
        </div>
      </div>
    </div>
  );
}
