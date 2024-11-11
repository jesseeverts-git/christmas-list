'use client'

import { useState, useRef, useEffect } from 'react'
import { Gift as GiftIcon, Volume2, VolumeX } from 'lucide-react'
import { Button } from "@/components/ui/button"


interface WishListItem {
  id: number;
  item: string;
  price: number | string;
  link: string;
}

export function ChristmasWishListComponent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const wishList: WishListItem[] = [
    { id: 1, item: "Bekerhouder auto", price: 20, link: "https://www.amazon.com.be/-/nl/bekerhouder-TPE-organizer-middenconsole-trillingsbestendig-accessoires/dp/B0CS29QMZM/ref=sr_1_1?dib=eyJ2IjoiMSJ9.AYM_o2F2nVGLGsIScC8eXMmfvLQ8QhjvtKsTys4Kd_aBm_9qWFYuaKLK-rYY-q85BjQ0WnbFtJVjHQXjdq-wu5qfyiqfvHvwzmsF0PS8Y83qYByAL2k37Hvep4RS6BCb0MVGpHlrwo4NTnEj2AHY_0-XtQCSXRAhSpQ4AO_mPP3aa-1DFObpZ5iUjhmDlmTjl1S17rOh1WY3WZEZGlFDeCii8vmvHeEa68zoyiA-Gp_cxALxQ3N7czFawvI2MgTxc8tZxtlL6-gedBtJc_Hb771TMLUWI1Q4GCfK85hmPEY.uOzKeOdWZPHC6i3goAd4cNDstM9h2qtUI55PnmmK-5A&dib_tag=se&keywords=bmw%2Bix1%2Bcup%2Bholder&qid=1731325916&sr=8-1&th=1" },
    { id: 2, item: "Croqs (gelijk papa de zijne)", price: "Prijs naar keuze", link: "" },
    { id: 3, item: "Lotto dingetjes", price: "Prijs naar keuze", link: "" },
  ]

  // Calculate total of items with fixed prices
  const spentAmount = wishList.reduce((sum, item) =>
    typeof item.price === 'number' ? sum + item.price : sum,
    0
  )

  const TOTAL_BUDGET = 30;
  const remainingBudget = TOTAL_BUDGET - spentAmount;

  useEffect(() => {
    const attemptAutoplay = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play()
          setIsPlaying(true)
        } catch (error) {
          console.log('Autoplay was prevented. User needs to interact to play audio.')
        }
      }
    }
    attemptAutoplay()
  }, [])

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-green-900 text-white p-4">
      <div className="max-w-sm mx-auto">
        <header className="text-center mb-6 relative">
          <div className="absolute top-0 left-0 w-full h-full flex justify-between items-start pointer-events-none">
            <GiftIcon className="text-red-400 w-8 h-8 transform -rotate-15" />
            <GiftIcon className="text-red-400 w-8 h-8 transform rotate-15" />
          </div>
          <h1 className="text-3xl font-bold text-red-500 mb-2">
            Jesse's Kerstlijst
          </h1>
          <p className="text-sm text-green-300 mb-2">Here&apos;s what I&apos;m hoping for!</p>
          <div className="text-yellow-300 space-y-1">
            <p className="text-xl font-bold">Totaal Budget: €{TOTAL_BUDGET.toFixed(2)}</p>
            <p>Gespendeerde bedrag: €{spentAmount.toFixed(2)}</p>
            <p>Overig bedrag: €{remainingBudget.toFixed(2)}</p>
          </div>
          <Button
            onClick={toggleAudio}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2"
            aria-label={isPlaying ? "Pause Christmas music" : "Play Christmas music"}
          >
            {isPlaying ? <VolumeX className="w-4 h-4 mr-1" /> : <Volume2 className="w-4 h-4 mr-1" />}
            {isPlaying ? "Pause Music" : "Play Music"}
          </Button>
        </header>



        <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border-2 border-red-500 shadow-lg">
          <ul className="space-y-4">
            {wishList.map(item => (
              <li key={item.id} className="bg-white/5 p-3 rounded-md border border-green-500">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center">
                    <GiftIcon className="mr-2 text-red-400 w-4 h-4" />
                    <span className="text-sm">{item.item}</span>
                  </span>
                  <span className="text-yellow-300 text-sm">
                    {typeof item.price === 'number'
                      ? `€${item.price.toFixed(2)}`
                      : item.price}
                  </span>
                </div>
                <Button
                  onClick={() => window.open(item.link, '_blank')}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-1"
                >
                  Buy Now
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-6 text-center text-green-300 text-sm">
          <p>🎁 Merry Christmas and Happy New Year and Heil Jesse! 🎉</p>
        </footer>
      </div>

      <audio ref={audioRef} loop>
        <source src="/Jingle.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}