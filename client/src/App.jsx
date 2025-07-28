
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import AuthLayout from './components/auth/layout';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminProducts from './pages/admin/products';
import AdminOrders from './pages/admin/orders';
import AdminFeatures from './pages/admin/features';
import ShoppingLayout from './components/shopping/layout';
import PageNotFound from './pages/not-found';
import ShoppingHome from './pages/shopping/home';
import ShoppingAccount from './pages/shopping/account';
import ShoppingCheckout from './pages/shopping/checkout';
import ShoppingListing from './pages/shopping/listing';
import CheckAuth from './components/common/check-auth';
import UnAuthPage from './pages/unAuth-page';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { Progress } from './components/ui/progress';
import PaypalReturn from './pages/shopping/paypal-return';
import PaymentSuccessPage from './pages/shopping/payment-sucess';
import { ToastContainer } from 'react-toastify';
import SearchProducts from './pages/shopping/serach';


function App() {

  // Redux state to check if user is authenticated
  // and to get user information
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  },[dispatch]);

  if (isLoading) return <div className='w-fill justify-center items-center p-4'><Progress value={75} /></div>

  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      {/* <h1>Header components</h1> */}

      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckout />} />
          <Route path='listing' element={<ShoppingListing />} />
          <Route path='paypal-return' element={<PaypalReturn />} />
          <Route path='payment-success' element={<PaymentSuccessPage />} />
          <Route path='search' element={<SearchProducts />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/unAuth-page' element={<UnAuthPage />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop/>
    </div>
  )
}

export default App
