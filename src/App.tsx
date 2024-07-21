import './App.css';
import Menu from './Menu';
import { BrowserRouter } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.models';
import AuthenticationContext from './auth/AuthenticationContext';
import { get } from 'http';
import { getClaims } from './auth/handleJWT';
import configureInterceptor from './utils/httpInterceptors';

configureValidations();
configureInterceptor();

function App() {

  const[claims, setClaims] = useState<claim[]>([
    // {name: 'role', value: 'admin'},
    // {name: 'email', value: 'erick@uip.com'}
  ]);
 
  useEffect(() => {
    // setClaims(JSON.parse(localStorage.getItem('claims') || '[]'));
    setClaims(getClaims());
  }, []);

  function isAdmin(){
    return claims.some(c => c.value === 'admin' && c.name === 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role');
  }

  console.log(claims);

  return (
    <>
    <BrowserRouter>
    <AuthenticationContext.Provider value={{claims, update: setClaims}}>
      <Menu />
      <div className='content-container container' style={{marginBottom: '200px'}}>
        <Routes>
          {routes.map(route => 
          <Route key={route.path} path={route.path} element={
             route.isAdmin && !isAdmin() ? <h1>Forbidden</h1> : <route.component />
            
             
             } />)}
        </Routes>
      </div>
      <footer  className='footer fixed-bottom bg-light text-center text-white'>
      <Footer />
      </footer>
    </AuthenticationContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
