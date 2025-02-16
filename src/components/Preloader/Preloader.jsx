import Loader from '../common/Loader/Loader';
import './Preloader.css';

const Preloader = () => {
  return (
    <div className='preloader'>
      <h2 className='preloader__title'>
        Загружаем приложение...
      </h2>
      <Loader />
    </div>
  );
};

export default Preloader;