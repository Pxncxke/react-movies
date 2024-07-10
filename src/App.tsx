import './App.css';
import Menu from './Menu';
import { BrowserRouter } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
import routes from './route-config';
import configureValidations from './Validations';
import Footer from './Footer';

configureValidations();

function App() {

  

  return (
    <>
    <BrowserRouter>
      <Menu />
      <div className='container'>
        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
