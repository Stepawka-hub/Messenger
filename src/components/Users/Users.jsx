import './Users.css';
import User from './User/User';
import Loader from '../common/Loader/Loader';

const Users = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const currentPage = props.currentPage;
  const firstPage = ((currentPage - 4) < 0) ? 0 : currentPage - 4;
  const lastPage = currentPage + 3;
  const slicedPages = pages.slice(firstPage, lastPage);

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
              />
            )}
          </div>
      }

      <div className='pagination'>
        {
          slicedPages.map((number) =>
            <span
              className={`pagination__item ${props.currentPage === number && 'active'}`}
              onClick={() => props.setCurrentPage(number)}
            >
              {number}
            </span>
          )
        }
      </div>
    </section>
  )
}

export default Users;