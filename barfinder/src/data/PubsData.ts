import { OpeningTime, MenuItem } from "../components/Types"

export type Pub = {
  name: string
  lat: number
  lng: number

  opening: OpeningTime[]
  menu: MenuItem[]
}

let Pubs: Pub[] = []

let defaultOpeningTime: OpeningTime[] = [
  {day: "Monday", open: 9, close: 18},
  {day: "Tuesday", open: 9, close: 18},
  {day: "Wednesday", open: 9, close: 18},
  {day: "Thursday", open: 9, close: 18},
  {day: "Friday", open: 9, close: 18},
  {day: "Saturday", open: 9, close: 18},
  {day: "Sunday", open: 9, close: 18}
]


let Pub1 = { name: "Szavanna Ivó", lat: 47.478437, lng: 19.051313, opening: defaultOpeningTime, menu: [] } satisfies Pub
let Pub2 = { name: "Rizmajer", lat: 47.478063, lng: 19.046687, opening: defaultOpeningTime, menu: [] } satisfies Pub
Pubs.push(Pub1)
Pubs.push(Pub2)
export {Pubs}

