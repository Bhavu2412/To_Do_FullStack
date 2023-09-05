export default function Popup({ title, show, message, setShow }) {
  const closePopUp = () => {
    setShow(false);
  };
  return (
    <div>
      {show && (
        <div className="popup">
          <div className="popup-content">
            <h3>{title}</h3>
            <br />
            <h5>{message}</h5>
            <button className="close-btn" onClick={closePopUp}>
              <b>Ok</b>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
