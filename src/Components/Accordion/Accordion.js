import React, {useRef, useState} from "react";
import Chevron from './Chevron'
import "./Accordion.css";


function Accordion(props) {

    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion__icon");
    const content = useRef(null);

    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
        setRotateState(
            setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
        );
        setHeightState(
            setActive === "active" ? "0px" : `100%`
        );

    }


    return (
        <div className="accordion__section">
            <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
                <p className="accordion__title">{props.title}</p>
                <Chevron className={`${setRotate}`} width={10} fill={"#777"}/>
            </button>
            <div ref={content} style={{maxHeight: `${setHeight}`}} className="accordion__content">
                {props.children}
            </div>
        </div>
    );
}

export default Accordion;