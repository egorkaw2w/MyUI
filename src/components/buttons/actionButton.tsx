import { ActionButtonType } from "@/types";
import "./actionButton.scss"


export function ActionButton({ text,className, width = "general", baseAction = "todo" }: ActionButtonType) {
return(
    <button className={`action-btn ${className} ${baseAction} ${width}` } >{text}</button>
)

}

