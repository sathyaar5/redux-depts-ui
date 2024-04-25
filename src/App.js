import './App.css';
import DepartmentList from './components/DepartmentList';
import { Provider } from 'react-redux';
import store from './store';
import './styles.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <DepartmentList />
      </div>
    </Provider>
  );
}

export default App;
