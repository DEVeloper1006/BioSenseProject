import Title from "./Title"

const Hero = () => {

    return (
        <>
            <Title />
            <button className="btn rounded-lg hover:scale-105" onClick={() => document.getElementById('my_modal_3').showModal()}>How does it work?</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">How does biosense work?</h3>
                    <p className="py-4">Using a CNN:</p>
                    <ul className="pl-10">
                        <li>Data was augmented to help increase accuracy of predictions</li>
                        <li>Weights were utilised to help with any discrepancies in quantity of Normal and Pneumonia X-Rays</li>
                        <li>The model has 5 CNN Layers and a total of 22 Layers (Trainable and Non-trainable)</li>
                        <li>The model achieved 88 % accuracy on the Test Set</li>
                        <li>Model completes a binary prediction between Normal (0) or Pneumonia (1)</li>
                    </ul>
                </div>
            </dialog>
        </>
    )
}

export default Hero