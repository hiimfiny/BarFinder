import React, { ReactNode } from "react"
//<{onClick: (text: string) => void }>

type ButtonProps = {
  children: React.ReactNode
  onButtonClick: (text: string | ReactNode) => void
}
const TabButton = (props: ButtonProps) => {
  return (
    <li>
      <button
        onClick={() => {
          props.onButtonClick(props.children)
        }}
      >
        {props.children}
      </button>
    </li>
  )
}

export default TabButton
