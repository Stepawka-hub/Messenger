import { Navigate, useLocation } from 'react-router-dom';
import { ProtectedRouteProps } from './type';
import { FC } from 'react';
import { useSelector } from '@store';
import { getIsAuth } from '@slices/auth';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const isAuthenticated: boolean = useSelector(getIsAuth);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
