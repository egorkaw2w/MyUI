import { Width } from "../types" 
export interface generalButtonProps {
    /**
     * text - это текст, отображаемы на кнопке.
     * Пример: text = "Hello world"
     */
    text?: string;
    /**
     * className - это классы, которые вы можете передать в кнопку.
     * Пример className = "ulima-Button"
     */
    className?: string;
    /**
     * Размер кнопки, доступны: "full"| "lg" | "md" | "sm" | "screen"  | "general"
     * **/
    width?: Width;
}