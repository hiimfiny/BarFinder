import React, { ReactNode } from "react"
//<{onClick: (text: string) => void }>

type ButtonProps = {
  children: React.ReactNode
  selected: string
  buttonName: string
  onButtonClick: (text: string | ReactNode) => void
}
const TabButton = (props: ButtonProps) => {
  return (
    <li>
      <button
        onClick={() => {
          props.onButtonClick(props.children)
        }}
        className={props.selected === props.buttonName ? "active" : ""}
      >
        {props.children}
      </button>
    </li>
  )
}

export default TabButton
