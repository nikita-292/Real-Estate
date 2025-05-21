
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
//IF there is a current use then show children i.e profile using the outlet
//component or ele show the  signt in 
 

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user); //same name currentUser as defied in usserslice

  return currentUser ? <Outlet /> : <Navigate to='/sign-in'/>;

}