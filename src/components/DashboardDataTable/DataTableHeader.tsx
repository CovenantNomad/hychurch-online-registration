'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Column } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"



interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {

  if (!column.getCanSort) {
    return 
  }

  return (
    <div className={cn('flex justify-center', className)}>{title}</div> 
  );
};
