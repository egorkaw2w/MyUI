import { GeneralFieldsType } from "./generalFieldsType";

export interface PasswordField  extends GeneralFieldsType {
    passHideButton: string
    passOpenButton: string
    iconWidth?: string
    iconHeight?: string
}