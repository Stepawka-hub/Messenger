import s from './InputFile.module.css';

const InputFile = ({ className, text, disabled = false, callback }) => {
  return (
    <label className={`${s.inputFile} ${className || ''}`}>
      <input
        type='file'
        disabled={disabled}
        className={s.input}
        onChange={callback}
      />
      <span className={s.text}>
        {text}
      </span>
    </label>
  )
}

export default InputFile;