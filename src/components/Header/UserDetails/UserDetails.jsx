import './UserDetails.css';

const UserDetails = (props) => {
  return (
    <div className='user-details'>
      <div className='user-details__avatar'>
        <img src={props.photo} className='avatar' alt="Avatar" />
      </div>
      <div>
        <h4 className='user-details__login'>
          {props.login}
        </h4>
        <p className='user-details__email'>
          {props.email}
        </p>
      </div>
    </div>
  )
}

export default UserDetails;