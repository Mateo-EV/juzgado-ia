import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowUpDown, ArrowUp, ArrowDown, FileText, Settings2 } from "lucide-react";
import type { Expediente, ColumnConfig, SortConfig } from "../types";

interface ExpedientesTableProps {
  expedientes: Expediente[];
  totalCount: number;
  columns: ColumnConfig[];
  onToggleColumn: (key: keyof Expediente) => void;
  sortConfig: SortConfig;
  onToggleSort: (key: keyof Expediente) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const getEstadoBadgeVariant = (estado: string): "default" | "secondary" | "destructive" | "outline" => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    "Finalizado": "default",
    "En proceso": "outline",
    "Admitido": "default",
    "Apelado": "destructive",
    "Programado": "outline",
    "Nuevo": "secondary",
    "Archivado": "secondary",
  };
  return variants[estado] || "default";
};

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return dateString;
  }
};

const formatCellValue = (key: keyof Expediente, value: string) => {
  if (key === 'Fecha_descargo') {
    return formatDate(value);
  }
  if (key === 'n_numero_pdf' && value) {
    return (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-blue-600" />
        <span className="text-sm text-blue-600 hover:underline cursor-pointer">{value}</span>
      </div>
    );
  }
  if (key === 'desc_estado') {
    return (
      <Badge variant={getEstadoBadgeVariant(value)}>
        {value}
      </Badge>
    );
  }
  if (key === 'fin_y_sumilla' && value) {
    return (
      <span className="text-sm line-clamp-2" title={value}>
        {value}
      </span>
    );
  }
  return value || '-';
};

const SortIcon = ({ columnKey, sortConfig }: { columnKey: keyof Expediente; sortConfig: SortConfig }) => {
  if (sortConfig.key !== columnKey) {
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  }
  if (sortConfig.direction === 'asc') {
    return <ArrowUp className="ml-2 h-4 w-4" />;
  }
  if (sortConfig.direction === 'desc') {
    return <ArrowDown className="ml-2 h-4 w-4" />;
  }
  return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export function ExpedientesTable({
  expedientes,
  totalCount,
  columns,
  onToggleColumn,
  sortConfig,
  onToggleSort,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: ExpedientesTableProps) {
  const visibleColumns = columns.filter((col) => col.visible);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalCount);

  if (totalCount === 0) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border text-center">
        <p className="text-muted-foreground">No se encontraron expedientes con los filtros aplicados.</p>
      </div>
    );
  }

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full space-y-4">
      {/* Header con contador y selector de columnas */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
        <div className="text-sm text-muted-foreground">
          Mostrando <span className="font-medium text-foreground">{startIndex}-{endIndex}</span> de{" "}
          <span className="font-medium text-foreground">{totalCount}</span> resultados
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 h-4 w-4" />
              Columnas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-50">
            <DropdownMenuLabel>Columnas visibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={column.visible}
                onCheckedChange={() => onToggleColumn(column.key)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla con scroll horizontal */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead key={column.key} className="whitespace-nowrap">
                    {column.sortable ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => onToggleSort(column.key)}
                      >
                        {column.label}
                        <SortIcon columnKey={column.key} sortConfig={sortConfig} />
                      </Button>
                    ) : (
                      <span>{column.label}</span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {expedientes.map((expediente) => (
                <TableRow key={expediente.id}>
                  {visibleColumns.map((column) => (
                    <TableCell key={column.key} className="whitespace-nowrap">
                      {formatCellValue(column.key, expediente[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => onPageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => onPageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
