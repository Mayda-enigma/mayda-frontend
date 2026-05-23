"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-context"
import { X, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function CartSidebar() {
  const { state, dispatch } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const router = useRouter()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" })
      dispatch({ type: "CLOSE_CART" })
      setIsCheckingOut(false)
      // Navigate to orders page to see the new order
      router.push("/orders")
    }, 2000)
  }

  if (!state.isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in-0 duration-300"
        onClick={() => dispatch({ type: "CLOSE_CART" })}
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
            onClick={() => dispatch({ type: "CLOSE_CART" })}
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
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md hover:scale-105 transition-transform duration-200"
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
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                            onClick={() => removeItem(item.id)}
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

            <div className="space-y-2">
              <Button
                className="w-full restaurant-gradient text-white hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                size="lg"
                onClick={handleCheckout}
                disabled={isCheckingOut}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isCheckingOut ? (
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
