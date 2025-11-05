'use client'
import { PasswordField } from "@/types/fields/passwordFieldType"
import "./passwordFiled.scss"
// import Image from "next/image";
import React, {useState } from "react";

export const PassField = ({label,hint,passHideButton,passOpenButton, className, labelClassName, StateOfValid = "base"}:PasswordField) => {
    const [isButtonHide, setIsButtonHide] = useState<boolean>(true)

    const CheckPass = () => {
        setIsButtonHide(!isButtonHide)
    }
    if (label){
        return(
        <div className="passInput ">
            <label className={`${labelClassName}`}>{label}
                <div className="inputArea">
                    <input className={`${className} ${StateOfValid}`} type={isButtonHide ? "password": "text"} placeholder={hint} />
                    <div className="passIcon"
                     onClick={CheckPass}
                     data-hide = {isButtonHide}
                      style={{
                        "--IconHid": `url(${passHideButton})`,
                        "--iconOpen": `url(${passOpenButton})`
                        } as React.CSSProperties}
                      >
                    </div>
                </div>
            </label>
        </div>
        )
    }
    else {
                <div className="passInput ">
                <div className="inputArea">
                    <input className={className} type={isButtonHide ? "password": "text"} placeholder={hint} />
                    <div className="passIcon"
                     onClick={CheckPass}
                      style={{
                      "--IconHid": `url(${passHideButton})`
                    , "--iconOpen": `url(${passOpenButton})`
                    }as React.CSSProperties }>
                    </div>
                </div>

        </div>
    }
}