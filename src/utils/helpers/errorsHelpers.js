import { openModalAC } from '../../redux/app/actions';

export const handleError = (errorTitle, errorText, delay) => (dispatch) => {
  dispatch(openModalAC(errorTitle, errorText, delay));
};