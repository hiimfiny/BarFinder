import { OpeningTime } from "./Types"
const checkOpened = (
  currentTime: number,
  currentDay: number,
  openingTimes: OpeningTime[]
) => {
  let returnValue = false
  let index = currentDay === 0 ? 6 : currentDay - 1

  currentTime < openingTimes[index].close &&
  currentTime > openingTimes[index].open
    ? (returnValue = true)
    : (returnValue = false)
  return returnValue
}

export { checkOpened }
