import loader from './../../../assets/images/loader.svg';
import './Loader.css';

const Loader = (props) => {
  return (
    <div className='loader-container'>
      <img
        src={props.loader ?? loader}
        className={props.className ?? 'loader-default'}
        alt='Loader'
      />
    </div>
  )
}

export default Loader;