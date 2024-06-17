import React from 'react';
import Button from './Components/Buttoncom';
import { useNavigate } from 'react-router-dom';
import RefreshExcel from './Components/RefreshExcel';

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10">
      <div className="flex flex-col items-center justify-center">
        <RefreshExcel />
        <Button label="FormA" onClick={() => navigate("/FormA")} />
        <Button label="FormB" onClick={() => navigate("/FormB")} />
      </div>
    </div>
  );
}

export default Landing;
