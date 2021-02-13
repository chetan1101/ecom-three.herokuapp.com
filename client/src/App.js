
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ProductViewPage from './Pages/ProductViewPage';
import CartPage from './Pages/CartPage';
import LoginPage from './Pages/LoginPage';
import CheckoutPage from './Pages/CheckoutPage';
import RegisterPage from './Pages/RegisterPage';
import PaymentPage from './Pages/PaymentPage';
import OrderDetailPage from './Pages/OrderDetailPage';
import MyOrders from './UserPages/MyOrders';
import MyProfile from './UserPages/MyProfile';
import PrivateRoute from './Components/PrivateRoute';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container-fluid" style={{ minHeight: "calc(100vh - 424px)" }}>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/view-item/:id' component={ProductViewPage} />
          <Route path='/cart/:id?' component={CartPage}/>
          <Route path='/login' component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          
          <PrivateRoute path='/checkout' component={CheckoutPage} />
          <PrivateRoute path='/payment/:id' component={PaymentPage} />
          <PrivateRoute path="/order-detail/:id" component={OrderDetailPage} />
          <PrivateRoute path="/orders-history" component={MyOrders} />
          <PrivateRoute path="/my-profile" component={MyProfile}/>
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
