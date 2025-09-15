import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { GlobalMessage } from './entities/globalMessage';
import { GlobalLoading } from './entities/globalLoading';
import { useAppSelector } from './app/store/store';
import { useEffect, useState } from 'react';
import { myService, useMyActions } from './entities/my';
import { AUTH_ROUTE } from './app/router/routes';
import { LoaderSpinner } from './shared/ui/spinner';

function App() {

  const {isLoading: globalIsLoading} = useAppSelector(s => s.globalLoadingReducer)
  const {globalMessage} = useAppSelector(s => s.globalMessageReducer)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {setId, setRole, setIsAuth} = useMyActions()

  const {pathname} = useLocation()
  const router = useNavigate()

  useEffect(() => {
    window.scrollTo({top: 0})
  }, [pathname])

const auth = async () => {
    try{
      setIsLoading(true)
      const user = await myService.getInfo()
      setId(user.id)
      setRole(user.role)
      setIsAuth(true)
    } 
    catch(e){
      router(AUTH_ROUTE.path) 
      console.log(e)
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    auth()
  }, [])

  return (
    <div className="App">
      {
        isLoading
          ?
        <section className={"loader_main"}><LoaderSpinner /></section>
          :
        <>
          <Outlet />
          { globalMessage.message && <GlobalMessage /> }
          { globalIsLoading && <GlobalLoading /> }
        </>
      }
    </div>
  );
}

export default App;
