"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/shared/ui/alert-dialog"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Clock, Edit, Eye, EyeOff, Trash2 } from "lucide-react"
import type { MenuItem } from "../types"

interface MenuTableProps {
  items: MenuItem[]
  onEdit: (item: MenuItem) => void
  onDelete: (item: MenuItem) => Promise<void>
  onToggleAvailability: (item: MenuItem) => Promise<void>
  deletingId?: string
  togglingId?: string
}

export function MenuTable({
  items,
  onEdit,
  onDelete,
  onToggleAvailability,
  deletingId,
  togglingId,
}: MenuTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Article</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Temps de prép.</TableHead>
            <TableHead>Popularité</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const isDeleting = deletingId === item.id
            const isToggling = togglingId === item.id

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="max-w-md text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.category}</Badge>
                </TableCell>
                <TableCell>{item.price.toFixed(2)} DZD</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.preparationTime} min
                  </div>
                </TableCell>
                <TableCell>{item.popularity}%</TableCell>
                <TableCell>
                  <Badge variant={item.isAvailable ? "success" : "secondary"}>
                    {item.isAvailable ? "Disponible" : "Indisponible"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(item)}
                    >
                      <Edit className="h-3 w-3" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleAvailability(item)}
                      disabled={isToggling}
                    >
                      {item.isAvailable ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                      {isToggling
                        ? "Enregistrement..."
                        : item.isAvailable
                          ? "Désactiver"
                          : "Activer"}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          disabled={isDeleting}
                        >
                          <Trash2 className="h-3 w-3" />
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer l'article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Retirer {item.name} du menu. Cette action est
                            irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(item)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            {isDeleting ? "Suppression..." : "Supprimer"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

