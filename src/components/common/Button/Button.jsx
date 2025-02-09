import './Button.css';

const Button = (props) => {
  return (
    <button
      className={`button ${props.className} ${props.disabled && 'disabled'}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

export default Button;