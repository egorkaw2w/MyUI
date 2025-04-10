import {ActionButton} from "@/components/buttons/actionButton";
import { Combo } from "@/components/Library";
import { combo } from "@/types";
import { Width } from "@/types/types";

// Создайте массив с помощью функции

// Создайте массив comboContent с этими значениями
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
      content: "sm"
    },
    {
      id: 1,
      content: "general"
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
        <div className="flex ">
          <Combo comboContent={comboTest.comboContent}/>
        </div>
       <div className="flex flex-col gap-5">
         <ActionButton text="press me" baseAction= "todo" action= {check} width= "general"/>
       </div>
</div>
    </div>
  )
}

