// // import React from 'react';
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/reducers/actions/loading/loading";
import LoadingComponent from "../../components/LoadingComponent";
import Home from "../home";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2000);
  }, [dispatch]);

  return (
    <>
      {isLoading === true && <LoadingComponent />}
      <div className={isLoading ? "container opacity-25" : "container"} style={{marginTop: '40px'}}>
        <Home />
      </div>
    </>
  );
};

export default Layout;
