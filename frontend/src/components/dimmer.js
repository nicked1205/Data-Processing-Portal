import '../styles/dimmer.css'

function Dimmer( {setOpen, open} ) {
  const handleClick = () => {
    setOpen(false);
  };

  return (
    <div
        id="dimmer"
        className={`dimmer ${open ? 'customVisible' : 'customHidden'}`}
        onClick={handleClick}
    >
    </div>
  );
}

export default Dimmer;