import { UserDetails } from "@ui/user-details";
import { getCurrentUser, getIsAuth, getIsLoading } from "@slices/auth";
import { useDispatch, useSelector } from "@store";
import { logoutUserAsync } from "@thunks/auth";
import { Button } from "@ui/button";
import { Loader } from "@ui/loader";
import { FC } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoutIcon from "@images/logout.svg";
import s from "./auth-details.module.css";

export const AuthDetails: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(getIsLoading);
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
  const handleAvatarClick = () => navigate(`/profile/${id}`);

  return (
    <div>
      <div className={s.userDetails}>
        <UserDetails
          username={login}
          email={email}
          photos={photos}
          onAvatarClick={handleAvatarClick}
        />
        <Button className={s.logoutBtn} onClick={logout}>
          <img className={s.logoutIcon} src={logoutIcon} alt="Logout" />
        </Button>
      </div>
    </div>
  );
};
