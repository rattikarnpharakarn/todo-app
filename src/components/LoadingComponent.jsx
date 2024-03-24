// import React from 'react';
import { useSelector } from "react-redux";

const LoadingComponent = () => {
  const isLoading = useSelector((state) => state.loading);


  return (
    <div className="loading-container">
      {isLoading.isLoading && <div className="loading-spinner" style={{height: '30px'}}></div>}
    </div>
  );
};

export default LoadingComponent;
