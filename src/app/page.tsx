import {ActionButton} from "@/components/buttons/actionButton";
import { Courusel } from "@/components/courusel";
import { Calendar, Combo, PassField  } from "@/components/Library";
import { combo } from "@/types";
const comboTest: combo = {
  comboContent: [
    {
      id: 1,
      content: "full"
    },
    {
      id: 2,
      content: "screen"
    },
    {
      id: 3,
      content: "lg"
    },
    {
      id: 4,
      content: "md"
    },
    {
      id: 5,
      content: "small"
    },
    {
      id: 6,
      content: "general"
    },
    {
      id: 7,
      content: "wibe"
    },
  ]
};

export default function Home() {
  const check = () => {
    console.log("asd")
  }
  return (
    <div className="Lib container mx-auto">
      <h1 className="text-center">Hello! This is my UI lib</h1>

<div className="flex flex-col gap-5">
        {/* <div className="flex ">
          <Combo comboContent={comboTest.comboContent}/>
        </div>
       <div className="flex flex-col gap-5">
         <ActionButton text="press me"
          baseAction= "todo"
           action= {check}
            width= "md"/>
       </div>
       <div className=" w-60">
        <PassField label="пароль"
        hint="введите пароль"
        passHideButton="/icons/password/passwordHid.svg"
        passOpenButton = "/icons/password/passwordOpen.svg" 
        />
       </div>
       <Courusel/> */}
<div className="testCalendar">
         <Calendar/>
</div>
</div>
    </div>
  )
}

