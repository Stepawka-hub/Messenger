import { FriendItem } from "./friend-item";
import { useSelector } from "@store";
import { getFriends } from "@slices/friends";
import s from "./friend-list.module.css";

export const FriendList = () => {
  const friends = useSelector(getFriends);

  const friendsData = friends.map((f) => (
    <FriendItem key={f.id} username={f.username} avatar={f.avatar} />
  ));
  const friendsCount = friendsData.length;

  return (
    <section>
      <h2 className={s.title}>Friends ({friendsCount})</h2>
      <div className={s.list}>{friendsData}</div>
    </section>
  );
};
