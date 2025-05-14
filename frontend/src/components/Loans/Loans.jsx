import React, { useState, useEffect, useRef } from "react";
import { iconsImgs } from "../../utils/images";
import "./Loans.css";



const Loans = () => {
 
  return (
    <div className="grid-one-item grid-common grid-c1 flex flex-col justify-between">
      <div className="grid-c-title pb-8">
        <h3 className="grid-c-title-text">
        Deal Creation
        </h3>
        <button className="grid-c-title-icon"> 
          <img src={iconsImgs.plus} />
        </button>
      </div>
      <div className="grid-c7-content pt-2">
        
        
      </div>
    </div>
  );
};

export default Loans;
