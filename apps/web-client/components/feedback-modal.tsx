"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, X, Mic, MicOff, Send, Heart } from "lucide-react"

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

export function FeedbackModal({ isOpen, onClose, orderId }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [textFeedback, setTextFeedback] = useState("")
  const [isVoiceRecording, setIsVoiceRecording] = useState(false)
  const [selectedAspects, setSelectedAspects] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const aspects = [
    { id: "food_quality", label: "Food Quality", icon: "🍽️" },
    { id: "service", label: "Service", icon: "👨‍💼" },
    { id: "ambiance", label: "Ambiance", icon: "🕯️" },
    { id: "value", label: "Value for Money", icon: "💰" },
    { id: "cleanliness", label: "Cleanliness", icon: "✨" },
    { id: "speed", label: "Service Speed", icon: "⚡" },
  ]

  if (!isOpen) return null

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  const toggleAspect = (aspectId: string) => {
    setSelectedAspects((prev) => (prev.includes(aspectId) ? prev.filter((id) => id !== aspectId) : [...prev, aspectId]))
  }

  const startVoiceRecording = () => {
    setIsVoiceRecording(true)
    // Simulate voice recording - in real app would use Web Speech API
    setTimeout(() => {
      setIsVoiceRecording(false)
      setTextFeedback(
        "The food was absolutely delicious! The sea bass was cooked perfectly and the service was excellent.",
      )
    }, 3000)
  }

  const handleSubmit = () => {
    if (rating === 0) return

    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      // Reset form
      setRating(0)
      setTextFeedback("")
      setSelectedAspects([])
    }, 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-2 bg-background rounded-xl z-50 overflow-hidden flex flex-col max-w-2xl mx-auto sm:inset-4 md:inset-8 lg:inset-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border sm:p-6">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">Rate Your Experience</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">Order #{orderId}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:p-6 sm:space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <h3 className="font-semibold mb-3 text-sm sm:text-base sm:mb-4">
              How would you rate your overall experience?
            </h3>
            <div className="flex justify-center gap-1.5 mb-2 sm:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="p-0.5 transition-transform hover:scale-110 sm:p-1"
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star
                    className={`w-6 h-6 sm:w-8 sm:h-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-400"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground sm:text-sm">
              {rating === 0 && "Click to rate"}
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </div>
          </div>

          {/* Aspect Rating */}
          {rating > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base sm:mb-3">What did you like most? (Optional)</h3>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3">
                {aspects.map((aspect) => (
                  <Button
                    key={aspect.id}
                    variant={selectedAspects.includes(aspect.id) ? "default" : "outline"}
                    size="sm"
                    className={`justify-start h-auto p-2 text-xs sm:p-3 sm:text-sm ${
                      selectedAspects.includes(aspect.id) ? "restaurant-gradient text-white" : "bg-transparent"
                    }`}
                    onClick={() => toggleAspect(aspect.id)}
                  >
                    <span className="mr-1.5 text-xs sm:mr-2 sm:text-sm">{aspect.icon}</span>
                    <span className="text-xs sm:text-sm">{aspect.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Text Feedback */}
          {rating > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <h3 className="font-semibold text-sm sm:text-base">Tell us more (Optional)</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent text-xs h-7 px-2 sm:text-sm sm:h-8 sm:px-3"
                  onClick={startVoiceRecording}
                  disabled={isVoiceRecording}
                >
                  {isVoiceRecording ? (
                    <>
                      <MicOff className="w-3 h-3 mr-1.5 animate-pulse sm:w-4 sm:h-4 sm:mr-2" />
                      Recording...
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 mr-1.5 sm:w-4 sm:h-4 sm:mr-2" />
                      Voice Input
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                placeholder="Share your thoughts about the food, service, or overall experience..."
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                className="resize-none text-sm"
                rows={3}
              />
            </div>
          )}

          {/* Thank You Message */}
          {rating >= 4 && (
            <Card className="border-restaurant-green/20 bg-restaurant-green/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-restaurant-green">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Thank you for the great feedback!</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  We're thrilled you enjoyed your experience. Your review helps us maintain our high standards.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 sm:p-6">
          <div className="flex gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent text-sm h-9 sm:text-base sm:h-10"
            >
              Maybe Later
            </Button>
            <Button
              className="flex-1 restaurant-gradient text-white hover:opacity-90 transition-opacity text-sm h-9 sm:text-base sm:h-10"
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              <Send className="w-3 h-3 mr-1.5 sm:w-4 sm:h-4 sm:mr-2" />
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 sm:mt-3">
            Your feedback is anonymous and helps us improve our service
          </p>
        </div>
      </div>
    </>
  )
}
