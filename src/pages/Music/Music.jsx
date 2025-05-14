import useTitle from '../../hooks/useTitle';
import s from './Music.module.css';

import Loader from '../../components/common/Loader/Loader';
import withAuthRedirect from '../../utils/withAuthRedirect';

const Music = () => {
  useTitle('Music');

  return (
    <section className={s.music}>
      <h2 className={s.music__title}>
        Здесь пока нет никакой музыки...
      </h2>
      <Loader />
    </section>
  );
}

export default withAuthRedirect(Music);