import { generalButtonProps } from "./generalButtonType";
import { baseAction } from "../types";

export interface ActionButtonType extends generalButtonProps {
    /**
     * baseAction - базовая цветовая гамма и отображение кнопки. 
     * Доступно "delete" | "add" | "change" | "show"
     */
    baseAction: baseAction
    /**
     * action - это действие, которое кнопка будет выполнять  при onClick
     */
    action : () => void
}