type Pub = {
  name: string
  lat: number
  lng: number
}

let Pubs: Pub[] = []

let Pub1 = { name: "Szavanna Ivó", lat: 47.478437, lng: 19.051313 } satisfies Pub

Pubs.push(Pub1)

export {Pubs}
