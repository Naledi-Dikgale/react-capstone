import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { fetchStocks, select, search } from './homeSlice';

const Home = () => {
  const stocks = useSelector((state) => state.stocks.stocks);
  const loading = useSelector((state) => state.stocks.loading);
  const searchTerm = useSelector((state) => state.stocks.searchTerm);
  const dispatch = useDispatch();
  useEffect(() => {
    if (stocks.length === 0) dispatch(fetchStocks());
  }, [dispatch, stocks.length]);

  if (loading) {
    return <h1>...Loading...</h1>;
  }

  return (
    <div>
      <nav className="navbar">
        <h1>Stocks</h1>
        <div className="searchbar">
          <input onChange={(event) => dispatch(search(event.target.value))} type="text" />
          <button type="submit">Submit</button>

          <button className="searchbtn" type="button" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>

        </div>

      </nav>
      <ul className="companyList">
        {
                        stocks.map((stock) => (

                          stock.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                            <NavLink to="/details" onClick={() => dispatch(select(stock.id))} key={stock.id} className="companyListItem">
                              <div className="namePrice">
                                <img className="arrow" src="arrow.svg" alt="detailsImg" />
                                <div className="bottom">
                                  <h3>{stock.companyName}</h3>
                                  <span className="price">
                                    Price: $
                                    {stock.price}
                                  </span>
                                </div>
                              </div>
                              {/* {
  stock.beta > 1.7 ? <span className="volatile volatility">Volatile</span>
  : <span className="stable volatility">Stable</span>
} */}
                            </NavLink>
                          ) : ''
                        ))
                    }
      </ul>
    </div>
  );
};

export default Home;
