import './Users.css';
import User from './User/User';
import Loader from '../common/Loader/Loader';
import Pagination from '../common/Pagination/Pagination';

const Users = (props) => {
  return (
    <section className='users-section' >
      <h2 className='users-section__title'>
        Пользователи
      </h2>

      {
        props.isLoading ?
          <Loader /> :

          <div className='user-list'>
            {props.userList.map((user) =>
              <User
                userData={user}
                key={user.id}
                followToUser={props.followToUser}
                unfollowFromUser={props.unfollowFromUser}
                followingInProgress={props.followingInProgress}
              />
            )}
          </div>
      }

      <Pagination 
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />
    </section>
  )
}

export default Users;