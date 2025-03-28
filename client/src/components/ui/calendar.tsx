/**
 * Calendar.tsx
 * Componente de calendario personalizado basado en react-day-picker
 * 
 * Características principales:
 * - Eliminación completa de puntos/indicadores naranjas en el calendario
 * - Uso de bordes para indicar el día actual
 * - Uso de fondos grises para indicar días con eventos
 * - Eliminación de todos los pseudo-elementos que podrían causar problemas visuales
 */

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  /**
   * Determina la fecha actual para la comparación de días
   * Elimina horas/minutos/segundos para evitar problemas de comparación
   */
  const today = React.useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  /**
   * Función para comparar si una fecha es el día actual
   * @param day - La fecha a comparar con el día actual
   * @returns boolean - true si el día es hoy, false en caso contrario
   */
  const isCurrentDay = React.useCallback((day: Date): boolean => {
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  }, [today]);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal"
        ),
        day_selected: "",
        day_today: "", // Vacío para evitar estilos predeterminados
        day_outside:
          "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      modifiers={{
        // Modifiers para el día actual y días con eventos
        // (los eventos se definen en el componente dashboard-calendario)
        "currentDay": isCurrentDay,
      }}
      modifiersClassNames={{
        // Clases personalizadas para cada tipo de día
        "currentDay": "calendar-current-day",
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  )
}

// Nombre para DevTools
Calendar.displayName = "Calendar"

export { Calendar }
