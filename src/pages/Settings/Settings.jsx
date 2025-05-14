import useTitle from '../../hooks/useTitle';
import s from './Settings.module.css';

import Loader from '../../components/common/Loader/Loader';
import withAuthRedirect from '../../utils/withAuthRedirect';

const Settings = () => {
  useTitle('Settings');

  return (
    <section className={s.settings}>
      <h2 className={s.settings__title}>
        Здесь пока нет никаких настроек...
      </h2>
      <Loader />
    </section>
  );
}

export default withAuthRedirect(Settings);