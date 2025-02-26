import { useNavigate, useLocation, useParams } from 'react-router-dom';

/*
  Хуки useParams, useLocation заменили withRouter() из старых версий.
  А так как в классовых компонентах не работают хуки, мы напишем свою функцию withRouter.

  Функция создаёт оболочку (функциональную компоненту) над нашей классовой компонентой.
  И в нашу новую оболочку уже передаётся хук.
*/
function withRouter(Component) {
  const ComponentWithRouterProp = (props) => {
    const router = {
      location: useLocation(),
      navigate: useNavigate(),
      params: useParams()
    }
    
    return (
      <Component {...props} router={router} />
    );
  }

  return ComponentWithRouterProp;
}

export default withRouter;