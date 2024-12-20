const Button = ({ text, onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded my-2 mx-4"
        value={text}
      >
        {text}
      </button>
    );
  };
  
  export default Button;
  