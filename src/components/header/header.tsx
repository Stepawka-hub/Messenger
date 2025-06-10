import { FC } from "react";
import { NavLink } from "react-router-dom";
import { UserDetails } from "@components/user-details";
import { Loader } from "@ui/loader";
import { Button } from "@ui/button";

import { getCurrentUser, getIsAuth, getIsLoading } from "@slices/auth";
import { logoutUserAsync } from "@thunks/auth";
import { useDispatch, useSelector } from "@store";

import logo from "@images/logo.png";
import logoutIcon from "@images/logout.svg";
import s from "./header.module.css";

export const Header: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getCurrentUser);

  const logout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <header className={s.header}>
      <img src={logo} className={s.logo} alt="Logo" />

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {isAuth && currentUser ? (
              <div className={s.userDetails}>
                <UserDetails
                  userId={currentUser.id}
                  username={currentUser.login}
                  email={currentUser.email}
                  photos={currentUser.photos}
                />
                <Button className={s.logout} onClick={logout}>
                  <img src={logoutIcon} alt="Logout"></img>
                </Button>
              </div>
            ) : (
              <NavLink to="/login" className={s.link}>
                Login
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
