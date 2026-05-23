"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { useToast } from "@/shared/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { useInviteEmployee } from "../api/mutations"

const defaultInviteForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  role: "Waiter",
}

interface InviteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
  restaurantId: number
}

export function InviteModal({
  open,
  onOpenChange,
  onSuccess,
  restaurantId,
}: InviteModalProps) {
  const [form, setForm] = useState(defaultInviteForm)
  const { toast } = useToast()
  const inviteEmployee = useInviteEmployee(restaurantId)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await inviteEmployee.mutateAsync({
        ...form,
        phone: Number(form.phone),
      })
      toast({
        title: "Invitation sent",
        description: `${form.firstName} ${form.lastName} can now join the staff roster.`,
      })
      setForm(defaultInviteForm)
      onOpenChange(false)
      onSuccess?.()
    } catch {
      toast({
        title: "Invitation failed",
        description: "The employee could not be invited. Please retry.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!inviteEmployee.isPending && !nextOpen) {
          setForm(defaultInviteForm)
        }
        onOpenChange(nextOpen)
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Invite Employee</DialogTitle>
          <DialogDescription>
            Send an access invite for a new staff member.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invite-firstname">First Name</Label>
              <Input
                id="invite-firstname"
                autoComplete="given-name"
                placeholder="Jean"
                value={form.firstName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, firstName: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-lastname">Last Name</Label>
              <Input
                id="invite-lastname"
                autoComplete="family-name"
                placeholder="Dupont"
                value={form.lastName}
                onChange={(event) =>
                  setForm((current) => ({ ...current, lastName: event.target.value }))
                }
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invite-phone">Phone</Label>
              <Input
                id="invite-phone"
                type="tel"
                autoComplete="tel"
                placeholder="0612345678"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email</Label>
              <Input
                id="invite-email"
                type="email"
                autoComplete="email"
                placeholder="employee@restaurant.com"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invite-role">Role</Label>
            <Select
              value={form.role}
              onValueChange={(role) =>
                setForm((current) => ({ ...current, role }))
              }
            >
              <SelectTrigger id="invite-role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WAITER">Waiter</SelectItem>
                <SelectItem value="CHEF">Chef</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {inviteEmployee.isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invite failed</AlertTitle>
              <AlertDescription>
                The request was rejected by the API. Check the employee details and
                try again.
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={inviteEmployee.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={inviteEmployee.isPending}>
              {inviteEmployee.isPending ? "Sending Invite..." : "Send Invite"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
