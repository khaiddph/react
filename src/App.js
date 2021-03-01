
import './App.css';
import Category from './components/catergory/Category'
import ListProduct from './components/product/ListProduct'
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/home/home.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className='menu'> 
            <li className='list_router'>
              <Link to="Home">home</Link>
            </li>
            <li className='list_router'>
              <Link to="ListProduct">Product</Link>
            </li>
            <li className='list_router'>
              <Link to="Category">Categori</Link>
            </li>
            
          </ul>
        </nav>

        <Switch>
          <Route path="/ListProduct">
            < ListProduct/>
          </Route>
          <Route path="/Category">
            <Category />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
  
}

export default App;
