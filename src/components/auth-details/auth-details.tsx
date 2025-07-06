import { ExitIcon } from "@icons";
import { getCurrentUser, getIsAuth, getIsLoadingUserData } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { logoutUserAsync } from "@thunks/auth";
import { Button } from "@ui/button";
import { Loader } from "@ui/loader";
import { UserDetails } from "@ui/user-details";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import s from "./auth-details.module.css";

export const AuthDetails: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingUserData);
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser || !isAuth) {
    return (
      <NavLink to="/login" className={s.link}>
        Login
      </NavLink>
    );
  }

  const { id, login, email, photos } = currentUser;
  const logout = () => dispatch(logoutUserAsync());

  return (
    <div>
      <div className={s.userDetails}>
        <UserDetails
          username={login}
          email={email}
          photos={photos}
          linkPath={`/profile/${id}`}
        />
        <Button
          aria-label="Выход из аккаунта"
          title="Выйти из аккаунта"
          className={s.logoutBtn}
          onClick={logout}
        >
          <ExitIcon size={32} />
        </Button>
      </div>
    </div>
  );
};
