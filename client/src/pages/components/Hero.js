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
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </>
    )
}

export default Hero