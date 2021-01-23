import './App.css';
import Home from '../src/components/HomePage/homePage';
import Header from '../src/components/Header/header';
// import Footer from '../src/components/Footer/footer';
// import Login from './components/regestration/signup';

import Content from '../src/components/Content/content';
import { Route, Switch } from 'react-router-dom';
import Context from '../src/context/auth';

function App() {
  return (
    <Context>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/posts/:id' component={Content} />
      </Switch>
    </Context>
  );
}

export default App;
