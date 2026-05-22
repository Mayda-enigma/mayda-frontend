"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { BurgerMenu } from "@/components/burger-menu"
import { useCart } from "@/components/cart-context"
import { ArrowLeft, Plus, Minus, Trash2, CreditCard, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [orderNotes, setOrderNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const serviceFee = subtotal * 0.1
  const total = subtotal + serviceFee

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: "REMOVE_ITEM", payload: id })
    } else {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } })
    }
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    // Simulate order processing
    setTimeout(() => {
      dispatch({ type: "CLEAR_CART" })
      router.push("/orders")
      setIsProcessing(false)
    }, 2000)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <BurgerMenu currentPage="cart" />
              <Link href="/menu" className="hidden md:block">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
              <h1 className="text-lg sm:text-xl font-bold">Cart</h1>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 sm:p-8">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 bg-muted rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-muted-foreground" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Add some delicious dishes to get started
            </p>
            <Link href="/menu">
              <Button className="restaurant-gradient text-white">Browse Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="cart" />
            <Link href="/menu" className="hidden md:block">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Cart & Checkout</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Table 12</p>
            </div>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6 max-w-4xl mx-auto">
        {/* Order Items */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
              Your Order ({state.items.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 md:space-y-4">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 border rounded-lg"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm md:text-base truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                  {item.specialInstructions && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Note: {item.specialInstructions}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 p-0"
                  >
                    <Minus className="w-2 h-2 sm:w-3 sm:h-3" />
                  </Button>
                  <span className="w-4 sm:w-6 md:w-8 text-center font-medium text-xs sm:text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 p-0"
                  >
                    <Plus className="w-2 h-2 sm:w-3 sm:h-3" />
                  </Button>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-xs sm:text-sm md:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    className="text-destructive hover:text-destructive p-1 mt-1"
                  >
                    <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Order Notes */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">Special Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any special requests or dietary requirements..."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="min-h-[60px] sm:min-h-[80px] md:min-h-[100px] text-xs sm:text-sm md:text-base"
            />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4 md:pb-6">
            <CardTitle className="text-sm sm:text-base md:text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <div className="flex justify-between text-xs sm:text-sm md:text-base">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>Service Fee (10%)</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 sm:pt-3">
              <div className="flex justify-between font-bold text-sm sm:text-base md:text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Info */}
        <Card>
          <CardContent className="pt-3 sm:pt-4 md:pt-6">
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Dine-in service • Table 12</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mt-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Estimated preparation time: 15-25 minutes</span>
            </div>
          </CardContent>
        </Card>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          disabled={isProcessing}
          className="w-full h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg restaurant-gradient text-white"
        >
          {isProcessing ? "Processing Order..." : `Place Order • $${total.toFixed(2)}`}
        </Button>
      </div>

      {/* Bottom Navigation Spacer */}
      <div className="h-16 sm:h-20"></div>
    </div>
  )
}
