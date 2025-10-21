
export const displayNoImageModal = (title, caption, setShowDialog) => {
    return (
        <dialog open className="modal">
            <div className="modal-box">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="py-4">{caption}.</p>
            <div className="modal-action">
                <button className="btn btn-outline hover:btn-error" onClick={() => setShowDialog(false)}>
                Close
                </button>
            </div>
            </div>
        </dialog>
    )
    
}