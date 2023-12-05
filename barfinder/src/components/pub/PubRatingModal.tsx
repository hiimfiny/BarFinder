import React, { useState } from "react"
import { Button } from "react-bootstrap"

import { emptyStar, fullStar } from "../Types"

const defaultRatingStars = [
  emptyStar,
  emptyStar,
  emptyStar,
  emptyStar,
  emptyStar,
]
type PubRatingModalProps = {
    onRateClick: (rating: number) => void
}
const PubRatingModal = (props: PubRatingModalProps) => {
  const [currentRating, setCurrentRating] = useState(0)
  const [ratingStars, setRatingStars] = useState(defaultRatingStars)

  const generateStarsArray = (rating: number) => {

    let starsArray = []
    for (let i = 0; i < 5; i++) {
      if (i <= rating) starsArray.push(fullStar)
      else starsArray.push(emptyStar)
    }
    return starsArray
  }
  const setRate = (value: number) => {

    setCurrentRating(value + 1)
    let starsArray = generateStarsArray(value)
    setRatingStars(starsArray)
  }

  return (
    <div>
      <div>
        {ratingStars.map((star, index) => (
          <div
            style={{
              fontSize: "40px",
              display: "inline-block",
              userSelect: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setRate(index)
            }}
          >
            {star}
          </div>
        ))}
      </div>

      <Button onClick={()=>{props.onRateClick(currentRating)}}>Rate</Button>
    </div>
  )
}

export default PubRatingModal
