export type Width = "full"| "lg" | "md" | "sm" | "screen"  | "general" 

export type baseAction = "delete" | "add" | "change" | "show" | "todo"

export type comboContent = {
    id: number,
    content: string
}

export type TypeOfVaid = 'base' | "valid" | "invalid"