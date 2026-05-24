"use client"

import { Button } from "@/shared/ui/button"
import Image from "next/image"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { useCart } from "@/features/cart"
import { useCreateOrder } from "@/features/orders"
import { X, Plus, Minus, ShoppingBag, CreditCard, AlertCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ApiError } from "@/shared/api/client"

export function CartSidebar() {
  const { state, dispatch } = useCart()
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const router = useRouter()
  const createOrder = useCreateOrder()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const handleCheckout = () => {
    setCheckoutError(null)
    createOrder.mutate(
      { items: state.items.map((item) => ({ menuItemId: item.id, quantity: item.quantity })) },
      {
        onSuccess: () => {
          dispatch({ type: "CLOSE_CART" })
          router.push("/orders")
        },
        onError: (error: ApiError) => {
          if (error.status === 422) {
            const detail = error.body && typeof error.body === 'object' && 'detail' in error.body
              ? (error.body as { detail: string }).detail
              : 'Please check your order and try again.'
            setCheckoutError(detail)
          } else {
            setCheckoutError('Something went wrong. Please try again.')
          }
        },
      },
    )
  }

  if (!state.isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in-0 duration-300"
        aria-label="Close cart" onClick={() => dispatch({ type: "CLOSE_CART" })}
      />

      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-background border-l border-border z-50 flex flex-col shadow-xl animate-in slide-in-from-right-full duration-300">
        <div className="flex items-center justify-between p-4 border-b border-border animate-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Your Order</h2>
            <Badge variant="secondary" className="animate-pulse">
              {state.items.length}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:scale-110 transition-transform duration-200"
            aria-label="Close cart" onClick={() => dispatch({ type: "CLOSE_CART" })}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-bounce" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious dishes!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item, index) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-md transition-all duration-200 animate-in slide-in-from-right-4 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80} height={80} className="w-16 h-16 object-cover rounded-md hover:scale-105 transition-transform duration-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-tight mb-1 hover:text-primary transition-colors duration-200">
                          {item.name}
                        </h3>
                        <p className="text-primary font-semibold hover:scale-105 transition-transform duration-200 inline-block">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                              aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                              aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                            aria-label="Remove item" onClick={() => removeItem(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {item.specialInstructions && (
                          <p className="text-xs text-muted-foreground mt-1 italic animate-in fade-in-0 duration-300">
                            Note: {item.specialInstructions}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            {/* Order Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm hover:scale-105 transition-transform duration-200">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm hover:scale-105 transition-transform duration-200">
                <span>Service Fee</span>
                <span>${(state.total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t border-border pt-2 hover:scale-105 transition-transform duration-200">
                <span>Total</span>
                <span className="text-primary">${(state.total * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {checkoutError && (
              <div className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            <div className="space-y-2">
              <Button
                className="w-full bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                size="lg"
                onClick={handleCheckout}
                disabled={createOrder.isPending}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {createOrder.isPending ? (
                  <>
                    <span className="animate-pulse">Processing...</span>
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
              <Link href="/menu">
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:scale-105 transition-all duration-200 hover:shadow-md"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground text-center animate-pulse">
              Table 12 • Estimated time: 25-30 minutes
            </p>
          </div>
        )}
      </div>
    </>
  )
}
