import { TypeOfVaid } from "../types";
import { GeneralFieldsType } from "./generalFieldsType";

export interface PasswordField  extends GeneralFieldsType {
    passHideButton: string
    passOpenButton: string
    StateOfValid?: TypeOfVaid
    iconWidth?: string
    iconHeight?: string
}