import "./courusel.scss"
export const Courusel:React.FC = () => {

    return(
        <div className="Courusel">
            <div className="Courusel__previouse-button">prev</div>
            <div className="Courusel__content">
                <div className="Courusel__element">s</div>
                <div className="Courusel__element">s</div>
                <div className="Courusel__element">s</div>
            </div>
            <div className="Courusel__next-button">next</div>
        </div>
    )
}