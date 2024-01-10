import React from "react"

const Results = ({isPneumonia}) => {

    if (isPneumonia === 1) {
        return (
            <div>
                <h2 className="text-center">Please Input an Image</h2>
            </div>
        )
    } else if (isPneumonia === 2) {
        return (
            <div className="flex flex-col gap-2">
                <h2 className="normal text-center">Normal</h2>
                <p>However it is advised that you check for symptoms during the next few weeks and book an appointment with your Physician. <br></br><br></br>As of now, our AI model is only 88% accurate on the training set. Our goal is to achieve at least 95% accuracy in the near future.</p>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col gap-2">
                <h2 className="pneumonia text-center">Pneumonia Detected</h2>
                <p>It is strongly advised to see a Doctor or Radiologist as soon as possible. In the coming days, be alert for the following symptoms:</p>
                <ul className="ml-10 text-sm">
                    <li>Rapid Breathing or Difficulty in Breathing</li>
                    <li>Cough with green, yellow or bloody mucus</li>
                    <li>Bluish colour to nails or lips</li>
                    <li>Extreme Fatigue</li>
                    <li>Rapid Pulse</li>
                    <li>Chills or Heavy Sweating</li>
                    <li>Confused Mental State</li>
                    <li>Sharp Chest Pain</li>
                </ul>
            </div>
        )
    }
}

export default Results