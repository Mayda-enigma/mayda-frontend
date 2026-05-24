"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/ui/sheet"
import { TableDetails } from "@/components/table-details"

interface TableSheetProps {
 tableId: string
 tableNumber: string
 open: boolean
 onOpenChange: (open: boolean) => void
}

export function TableSheet({ tableId, tableNumber, open, onOpenChange }: TableSheetProps) {
 return (
 <Sheet open={open} onOpenChange={onOpenChange}>
 <SheetContent
 side="bottom"
 className="h-[92dvh] rounded-t-2xl p-0 [&>button]:top-3 [&>button]:right-3"
 >
 <SheetHeader className="px-4 pt-4 pb-0 border-b border-border shrink-0">
 <SheetTitle className="text-base font-semibold">
 Table {tableNumber}
 </SheetTitle>
 </SheetHeader>
 <div className="overflow-y-auto flex-1">
 <TableDetails tableId={tableId} />
 </div>
 </SheetContent>
 </Sheet>
 )
}
