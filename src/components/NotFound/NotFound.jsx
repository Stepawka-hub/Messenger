import { useNavigate } from 'react-router-dom';
import Button from '../common/Button/Button';
import s from './NotFound.module.css';
import useTitle from '../../hooks/useTitle';

const NotFound = () => {
  const navigate = useNavigate();
  useTitle('Not Found');

  const handleClick = () => {
    navigate('/');
  };

  return (
    <section className={s.notFound}>
      <span className={s.notFound__text}>
        404 - Not Found
      </span>
      <Button
        text='<- Вернуться назад'
        className={s.notFound__btn}
        onClick={handleClick}
      />
    </section>
  );
};

export default NotFound;