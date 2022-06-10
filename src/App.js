import { memo, useEffect } from 'react';
import { useDispatch } from "react-redux";
import './App.css';
import Mainhome from './components/Mainhome';
import { getApiAction } from './redux/actions/apiActions';

function App() {
  const dispatch = useDispatch();
  const callApi = () =>{
    return async (dispatch) => 
    {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      dispatch(getApiAction(data))
    }
  }



  useEffect(()=>{
    dispatch(callApi())
  },[])
 console.log("object")
  return (
    <>
      <Mainhome />
    </>
  );
}

export default memo(App);
