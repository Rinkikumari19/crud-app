
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import './App.css';
import UserData from './Components/UserData';
import rootReducer from './Store/RootReducer';
const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <Provider store={store}>
      <UserData />
    </Provider>
  );

}
