import { Outlet } from 'react-router-dom';
import './App.css';
import { GlobalMessage } from './entities/globalMessage';
import { GlobalLoading } from './entities/globalLoading';
import { useAppSelector } from './app/store/store';

function App() {

  const {isLoading: globalIsLoading} = useAppSelector(s => s.globalLoadingReducer)
  const {globalMessage} = useAppSelector(s => s.globalMessageReducer)

  return (
    <div className="App">
      <Outlet />
      { globalMessage.message && <GlobalMessage /> }
      { globalIsLoading && <GlobalLoading /> }
    </div>
  );
}

export default App;
