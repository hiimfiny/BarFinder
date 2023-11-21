import React from "react"

const Card = (props: {
  backgroundColor: string
  children: React.ReactNode
}) => {
  return (
    <div style={{ 'background': `(${props.backgroundColor}` }} className="card"  >
      {props.children}
    </div>
  )
}

Card.defaultProps = {
  backgroundColor: "#ebe7ef",
}
export default Card
