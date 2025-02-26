import useTitle from '../../hooks/useTitle';
import s from './News.module.css';

import Loader from '../common/Loader/Loader';
import withAuthRedirect from '../../utils/withAuthRedirect';

const News = () => {
  useTitle('News');

  return (
    <section className={s.news}>
      <h2 className={s.news__title}>
        Здесь пока нет никаких новостей...
      </h2>
      <Loader />
    </section>
  );
}

export default withAuthRedirect(News);