import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../Styles/productpage.css';
import * as actionTypes from '../Redux/actionTypes';
import Loading from './Loading';

function ProductMainSection(props) {
  const productId = useParams();
  const { product, loading, error } = props.productData;
  const [qty, setQty] = useState(1);
  console.log(qty)

  useEffect(() => {
    props.getProduct(productId.id);
  }, [productId]);

  return (loading ? <Loading/> : error ? <div>{error}</div> :
    <div className="container-fluid">
      <div className="card">
        <div className="row">
          <aside className="col-sm-5 border-right">
            <article className="gallery-wrap">
              <div className="img-big-wrap">
                <div><div className="text-center m-3">
                  <img className="img-fluid" src={product.img} alt={product.name} height="auto" />
                </div></div>
              </div>
              <div className="img-small-wrap">
                <div className="item-gallery"> <img src={product.img} alt={product.name} /> </div>
                <div className="item-gallery"> <img src={product.img} alt={product.name} /> </div>
                <div className="item-gallery"> <img src={product.img} alt={product.name} /> </div>
                <div className="item-gallery"> <img src={product.img} alt={product.name} /> </div>
              </div>
            </article>
          </aside>
          <aside className="col-sm-7">
            <article className="card-body p-5">
              <h3 className="title mb-3">{product.name}</h3>
              <p className="price-detail-wrap">
                <span className="price h3 text-warning">
                  <span className="currency">INR &#8377;</span><span className="num">{product.price}</span>
                </span>
              </p>
              <dl className="item-property">
                <dt>Description</dt>
                <dd><p>{product.description}</p></dd>
              </dl>
              <dl className="param param-feature">
                <dt>Item Number</dt>
                <dd>{product._id}</dd>
              </dl>
              <dl className="param param-feature">
                <dt>Avilable Quantity:</dt>
                <dd>{product.countInStock}</dd>
              </dl>

              {product.countInStock > 0 &&

                <>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <dl className="param param-inline">

                        <dt>Quantity: </dt>
                        <dd>
                          <select value={qty} onChange={(e) => setQty(e.target.value)} className="form-control form-control-sm" style={{ width: 70 }}>
                            {[...Array(product.countInStock).keys()].map(x =>

                              <option key={x + 1} value={x + 1}> {x + 1} </option>

                            )}
                          </select>
                        </dd>
                      </dl>
                    </div>
                  </div>

                </>

              }

              <hr />
              {product.countInStock > 0 ?

                <>
                  <Link to="/login?redirect=checkout" className="btn btn btn-primary"> Buy now </Link>
                  <Link to={`/cart/${product._id}?qty=${qty}`} className="btn btn btn-outline-primary mx-2"> <i className="fas fa-shopping-cart" /> Add to cart </Link>
                </>

                :

                <Link to="#" className="btn btn btn-warning"> Notify Me </Link>

              }

            </article>
          </aside>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  productData: state.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: (productId) => dispatch({type: actionTypes.GET_PRODUCT_REQUEST, productId})
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductMainSection);


