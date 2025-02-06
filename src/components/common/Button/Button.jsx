import './Button.css';

const Button = (props) => {
  const buttonStyle = {
    backgroundColor: props.color ? `var(--${props.color})` : 'var(--create-btn-color)',
    padding: props.padding || '1rem 2rem',
    alignSelf: props.alignSelf || 'flex-end',
    width: props.width
  };

  return (
    <button
      className='button'
      onClick={props.onClick}
      style={buttonStyle}
    >
      {props.text}
    </button>
  )
}

export default Button;