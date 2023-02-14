import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function StartModal(props) {
  const { show, setModalShow, isOpen, setOpen } = props;
  const handlarStart = () => {
    setModalShow(false);
    setOpen(true);
  };
  const handlerExit = ()=>{
      setOpen(false)
      setModalShow(false)
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="d-flex justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter">
          Study Before Attempting
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          <ul>
            <li>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </li>
            <li>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </li>
            <li>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </li>
            <li>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </li>
          </ul>
        </p>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button onClick={handlarStart} variant="success" size="lg">Start</Button>
        <Button onClick={handlerExit} variant="secondary" size="lg">Exit</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default StartModal;
