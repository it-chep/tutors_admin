import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { GlobalMessage } from './entities/globalMessage';
import { GlobalLoading } from './entities/globalLoading';
import { useAppSelector } from './app/store/store';
import { useEffect } from 'react';

function App() {

  const {isLoading: globalIsLoading} = useAppSelector(s => s.globalLoadingReducer)
  const {globalMessage} = useAppSelector(s => s.globalMessageReducer)

  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [pathname])

  return (
    <div className="App">
      <Outlet />
      { globalMessage.message && <GlobalMessage /> }
      { globalIsLoading && <GlobalLoading /> }
    </div>
  );
}

export default App;
