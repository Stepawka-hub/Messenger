import { useEffect } from 'react';

export const useTitle = (title = '', dependence = null) => {
  useEffect(() => {
    document.title = title;
  }, [title, dependence]);
}

export default useTitle;