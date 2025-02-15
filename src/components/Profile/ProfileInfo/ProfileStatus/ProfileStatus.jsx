import React from 'react';

import s from './ProfileStatus.module.css';

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
      status: this.props.status
    });
  }

  deactivateEditMode = (evt) => {
    this.props.updateUserStatus(evt.currentTarget.value);
    this.setState({
      editMode: false,
      status: this.props.status
    });
  }

  onStatusChange = (evt) => {
    this.setState({
      status: evt.currentTarget.value
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      });
    }
  }

  render() {
    return (
      <div className={s.status}>
        <span className={s.status__label}>
          {this.props.label}
        </span>
        {
          this.state.editMode ?
            <input
              autoFocus
              className={s.status__input}
              value={this.state.status}
              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
            />
            :
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || 'Нет'}
            </span>
        }
      </div>
    )
  }
};

export default ProfileStatus;