export type Pub = {
  name: string
  lat: number
  lng: number
}

let Pubs: Pub[] = []

let Pub1 = { name: "Szavanna Ivó", lat: 47.478437, lng: 19.051313 } satisfies Pub
let Pub2 = { name: "Rizmajer", lat: 47.478063, lng: 19.046687 } satisfies Pub
Pubs.push(Pub1)
Pubs.push(Pub2)
export {Pubs}

