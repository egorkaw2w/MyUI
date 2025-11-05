import "./calendar.scss"

export const Calendar:React.FC = () => {
    return(
        <div className="calendar">
            <div className="calendar__header">
                <button className="calendar__back">-</button>
                <div className="calendr__title">Ноябрь</div>
                <div className="calendar__forward">+</div>
            </div>
        </div>
    )
}