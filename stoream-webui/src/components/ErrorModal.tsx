import { Modal } from "@geist-ui/core"

const ErrorModal = ({ bindings, errorMessageTitle, errorMessage, setVisible }) => {
    return (
        <>
            <Modal {...bindings}>
                <Modal.Title>Error</Modal.Title>
                <Modal.Subtitle>{errorMessageTitle}</Modal.Subtitle>
                <Modal.Content>
                    <p>{errorMessage}</p>
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>I see</Modal.Action>
            </Modal>
        </>
    )
}

export default ErrorModal