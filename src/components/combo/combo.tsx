'use client'
import { combo } from "@/types"
import "./combo.scss"
import { useEffect, useState } from "react"
import { comboContent } from "@/types/types"


export const Combo = ({comboContent}:combo) =>{
    const [isComboOpen, setIsComboOpen] = useState(false)
    const [comboChoseItem, setComboChoseItem] = useState(comboContent[0].content)
    const [sortedMassive, setSortedMassive] = useState<comboContent[]>(() => {
        if (typeof window !== "undefined"){
        const storedData = localStorage.getItem("sortedMassive");

        try{
            return storedData ? JSON.parse(storedData): comboContent
        }catch (error){
            console.log("Ошибка",error);
            return comboContent
        }
        }

    })

const handleCombo = () => {
    setIsComboOpen(!isComboOpen)

}

  const chooseComboItem = (e: React.MouseEvent<HTMLDivElement>) => {
        const content = (e.target as HTMLDivElement).textContent;
        setComboChoseItem(content ?? comboContent[0].content);
        const newValue = content ?? comboContent[0].content
        const selectedItem = sortedMassive.find((item) => item.content === newValue)
        if (selectedItem){
            const newSortContent = [selectedItem,
                 ...sortedMassive.filter((item) => item.id !== selectedItem.id)
                ]
                setSortedMassive(newSortContent)
                localStorage.setItem("sortedMassive", JSON.stringify(newSortContent))
                console.log(newSortContent);
            }
        handleCombo()

    };

    useEffect(() =>{
        if (typeof window !== "undefined"){
        const storedData = localStorage.getItem("sortedMassive");
    if(storedData){

      const parseData =  JSON.parse(storedData)
      if (parseData.length > 0){
        setComboChoseItem(parseData[0].content)
      }
    } 
        }

   },[])

if (isComboOpen == false){
    return(
        <div className="Combo" onClick={handleCombo}>
            <div className="ComboItem">{comboChoseItem}</div>
        </div>
    )
}
else{
return(
<div className="Combo">
    {sortedMassive.map((item) => (
        <div key={item.id} className="ComboItem" onClick={chooseComboItem}>{item.content}</div>
    ))}
  </div>
)
}

}