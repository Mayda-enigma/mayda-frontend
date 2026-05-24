"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Textarea } from "@/shared/ui/textarea"
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
    { id: "food_quality", label: "Qualité des plats", icon: "🍽️" },
    { id: "service", label: "Service", icon: "👨‍💼" },
    { id: "ambiance", label: "Ambiance", icon: "🕯️" },
    { id: "value", label: "Rapport qualité-prix", icon: "💰" },
    { id: "cleanliness", label: "Propreté", icon: "✨" },
    { id: "speed", label: "Rapidité du service", icon: "⚡" },
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
      <div className="fixed inset-0 bg-black/50 z-50" aria-label="Close" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-2 bg-background rounded-xl z-50 overflow-hidden flex flex-col max-w-2xl mx-auto sm:inset-4 md:inset-8 lg:inset-16">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border sm:p-6">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">Notez votre expérience</h2>
            <p className="text-xs text-muted-foreground sm:text-sm">Commande n°{orderId}</p>
          </div>
          <Button variant="ghost" size="sm" aria-label="Close" onClick={onClose}>
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 sm:p-6 sm:space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <h3 className="font-semibold mb-3 text-sm sm:text-base sm:mb-4">
              Comment évaluez-vous votre expérience ?
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
              {rating === 0 && "Cliquez pour noter"}
              {rating === 1 && "Mauvais"}
              {rating === 2 && "Moyen"}
              {rating === 3 && "Bien"}
              {rating === 4 && "Très bien"}
              {rating === 5 && "Excellent"}
            </div>
          </div>

          {/* Aspect Rating */}
          {rating > 0 && (
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base sm:mb-3">Qu&apos;avez-vous préféré ? (optionnel)</h3>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3">
                {aspects.map((aspect) => (
                  <Button
                    key={aspect.id}
                    variant={selectedAspects.includes(aspect.id) ? "default" : "outline"}
                    size="sm"
                    className={`justify-start h-auto p-2 text-xs sm:p-3 sm:text-sm ${
                      selectedAspects.includes(aspect.id) ? "bg-primary text-primary-foreground" : "bg-transparent"
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
                <h3 className="font-semibold text-sm sm:text-base">Dites-nous en plus (optionnel)</h3>
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
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 mr-1.5 sm:w-4 sm:h-4 sm:mr-2" />
                      Entrée vocale
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                placeholder="Partagez vos impressions sur les plats, le service..."
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                className="resize-none text-sm"
                rows={3}
              />
            </div>
          )}

          {/* Thank You Message */}
          {rating >= 4 && (
            <Card className="border-success/20 bg-success/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-success">
                  <Heart className="w-4 h-4" />
                  <span className="font-medium">Merci pour votre excellent retour !</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Nous sommes ravis que vous ayez apprécié votre expérience. Votre avis nous aide à maintenir nos standards.
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
              aria-label="Close" onClick={onClose}
              className="flex-1 bg-transparent text-sm h-9 sm:text-base sm:h-10"
            >
              Peut-être plus tard
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm h-9 sm:text-base sm:h-10"
              onClick={handleSubmit}
              disabled={rating === 0 || isSubmitting}
            >
              <Send className="w-3 h-3 mr-1.5 sm:w-4 sm:h-4 sm:mr-2" />
              {isSubmitting ? "Envoi..." : "Envoyer l'avis"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2 sm:mt-3">
            Votre avis est anonyme et nous aide à nous améliorer
          </p>
        </div>
      </div>
    </>
  )
}
