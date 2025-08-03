import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ExitIcon } from "@icons";
import {
  getCurrentUser,
  getIsAuth,
  getIsLoadingUserData,
  getIsLoggingOut,
} from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { logoutUserAsync } from "@thunks/auth";
import { Loader } from "@ui/loader";
import { UserDetails } from "@ui/user-details";
import { IconButton } from "@ui/icon-button";
import s from "./auth-details.module.css";

export const AuthDetails: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getIsLoadingUserData);
  const isLoggingOut = useSelector(getIsLoggingOut);
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser || !isAuth) {
    return (
      <NavLink to="/login" className={s.link}>
        Вход
      </NavLink>
    );
  }

  const { id, login, email, photos } = currentUser;
  const logout = async () => {
    try {
      await dispatch(logoutUserAsync()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className={s.userDetails}>
      <UserDetails
        username={login}
        email={email}
        photos={photos}
        linkPath={`/profile/${id}`}
      />
      <IconButton
        aria-label="Выход из аккаунта"
        title="Выйти из аккаунта"
        className={s.logoutBtn}
        disabled={isLoggingOut}
        onClick={logout}
      >
        <ExitIcon />
      </IconButton>
    </div>
  );
};
