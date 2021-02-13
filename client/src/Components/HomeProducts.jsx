
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionTypes from '../Redux/actionTypes';
import Loading from './Loading';

function HomeProducts(props) {
  const { productList, loading, error } = props.productData;
  const history = useHistory();

  useEffect(() => {
    props.getProductList()
  }, [])
  
  return (loading ? <Loading/> : error ? <div>{error}</div> :
    <div className="album py-5 bg-light">
      <div className="container">
      <h3 className="bg-warning p-2 text-dark rounded">Tranding items</h3>
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3">
          {productList.map((item) =>

            <div className="col">
              <div className="card shadow-sm">
                <div className="text-center">
                  <img src={item.img} alt={item.name} width="300" height="auto" />
                </div>
                <div className="card-body">
                  <p className="card-text">{item.name}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button onClick={() => history.push(`/view-item/${item._id}`)} type="button" className="btn btn-sm btn-outline-secondary">View Item</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Add To Cart</button>
                    </div>
                    <small className="text-muted">{item.countInStock} Avilable</small>
                  </div>
                </div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  productData: state.productList
});

const mapDispatchToProps = dispatch => ({
  getProductList: () => dispatch({type: actionTypes.GET_PRODUCTLIST_REQUEST})
})


export default connect(mapStateToProps, mapDispatchToProps)(HomeProducts);
