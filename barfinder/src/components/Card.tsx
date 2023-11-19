import React from "react"

const Card = (props: { children: React.ReactNode }) => {
  return <div className="card">{props.children}</div>
}

export default Card
