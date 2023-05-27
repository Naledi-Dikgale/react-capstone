import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Detail.css';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Detail = () => {
  const selectedStockId = useSelector((state) => state.stocks.selectedStock);
  const stock = useSelector((state) => state.stocks.stocks)
    .filter((elem) => elem.id === selectedStockId)[0];

  return (

    <div>
      <nav className="detnav">
        <NavLink to="/" className="back"><AiOutlineArrowLeft /></NavLink>
      </nav>
      {
                selectedStockId ? (
                  <div className="details">
                    <h1>{stock.companyName}</h1>
                    <div className="infobar">
                      <span className="infoname">Price  </span>
                      <span className="infonumeric">{stock.price}</span>
                    </div>
                    <div className="infobar">
                      <span className="infoname">Volume  </span>
                      <span className="infonumeric">{stock.volume}</span>
                    </div>
                    <div className="infobar">
                      <span className="infoname">Beta  </span>
                      <span className="infonumeric">{stock.beta}</span>
                    </div>
                    <div className="infobar">
                      <span className="infoname">Dividend  </span>
                      <span className="infonumeric">{stock.lad}</span>
                    </div>
                    <div className="infobar">
                      <span className="infoname">Market Cap  </span>
                      <span className="infonumeric">{stock.marketCap}</span>
                    </div>
                  </div>
                ) : <div>Data not loaded </div>
            }

    </div>
  );
};

export default Detail;
