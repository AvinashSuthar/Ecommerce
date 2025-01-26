const Welcome = ({ show, setShow }) => {
  return (
    <div
      className={`${
        show ? "translate-y-[-100%]" : "translate-y-0"
      } w-full h-screen fixed top-0 left-0 z-40 bg-white flex flex-col items-center justify-center transition-transform duration-[3s] ease-in-out`}
      onClick={() => setShow(true)}
    >
      <img
        src="cover.jfif" // Ensure the image is inside the `public` folder
        alt="Example"
        className="w-full h-screen"
      />
    </div>
  );
};

export default Welcome;
