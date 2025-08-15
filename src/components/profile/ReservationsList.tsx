import React from "react";

interface Reservation {
  id: number;
  lugar: string;
  fecha: string;
  codigo: string;
  estado: "pendiente" | "confirmada" | "cancelada";
  ticketHash?: string;
}

interface ReservationsListProps {
  reservations: Reservation[];
}

const stateColors: Record<string, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  confirmada: "bg-green-100 text-green-800",
  cancelada: "bg-red-100 text-red-800",
};

export default function ReservationsList({ reservations }: ReservationsListProps) {
  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center text-gray-500 py-6">
        No tienes reservas registradas.
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {reservations.map((res) => (
          <div key={res.id} className="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            {/* Información principal */}
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-900">{res.lugar}</h3>
              <p className="text-sm text-gray-600">
                📅 {new Date(res.fecha).toLocaleDateString("es-ES")}
              </p>
              <p className="text-sm text-gray-600">Código: {res.codigo}</p>
              {res.ticketHash && (
                <p className="text-xs text-blue-600 break-all">
                  🎟 Ticket Hash: {res.ticketHash}
                </p>
              )}
            </div>

            {/* Estado */}
            <div className="flex items-center space-x-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stateColors[res.estado] || "bg-gray-100 text-gray-800"
                }`}
              >
                {res.estado}
              </span>
              {/* Botón de acción */}
              <button
                className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow"
                onClick={() => alert(`Ver detalles de la reserva: ${res.codigo}`)}
              >
                Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
