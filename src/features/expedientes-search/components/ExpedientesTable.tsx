import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Expediente } from "../types";

interface ExpedientesTableProps {
  expedientes: Expediente[];
}

const getEstadoBadgeVariant = (estado: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    "Finalizado": "default",
    "En proceso": "secondary",
    "Admitido": "outline",
    "Apelado": "destructive",
    "Programado": "secondary",
    "Nuevo": "outline",
  };
  return variants[estado] || "default";
};

export function ExpedientesTable({ expedientes }: ExpedientesTableProps) {
  if (expedientes.length === 0) {
    return (
      <div className="w-full bg-white p-8 rounded-lg shadow-sm border text-center">
        <p className="text-muted-foreground">No se encontraron expedientes con los filtros aplicados.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expediente</TableHead>
            <TableHead>Juzgado</TableHead>
            <TableHead>Acto Procesal</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expedientes.map((expediente) => (
            <TableRow key={expediente.id}>
              <TableCell className="font-medium">{expediente.expediente}</TableCell>
              <TableCell>{expediente.juzgado}</TableCell>
              <TableCell>{expediente.actoProcesal}</TableCell>
              <TableCell>
                {new Date(expediente.fecha).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <Badge variant={getEstadoBadgeVariant(expediente.estado)}>
                  {expediente.estado}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
