import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../Styles/homebanner.css';

function HomeBanner(props) {
    const { recentView } = props.productData;

    return (recentView.length > 0 &&

        <div class="tcb-product-slider">
            <div class="container">
                <h3 className="bg-warning p-2 text-dark rounded">Recent view items</h3>
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">

                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <div class="row">

                                {recentView.map((item) =>

                                    <div class="col-xs-6 col-sm-3">
                                        <div class="tcb-product-item">
                                            <div class="tcb-product-photo">
                                                <Link to="#"><img src={item.img} class="img-responsive" alt="a" /></Link>
                                            </div>
                                            <div class="tcb-product-info">
                                                <div class="tcb-product-title">
                                                    <h4><Link to="#">{item.name}</Link></h4></div>
                                                <div class="tcb-product-rating">
                                                    <i class="active glyphicon glyphicon-star"></i><i class="active glyphicon glyphicon-star"></i><i class="active glyphicon glyphicon-star"></i><i class="glyphicon glyphicon-star"></i><i class="glyphicon glyphicon-star"></i>
                                                    <Link to="#">({item.totalProductReviews} ratings)</Link>
                                                </div>
                                                <div class="tcb-hline"></div>
                                                <div class="tcb-product-price">
                                                    $ {item.price}
                                  </div>
                                            </div>
                                        </div>
                                    </div>

                                )}




                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>



    )
}

const mapStateToProps = state => ({
    productData: state.product
});


export default connect(mapStateToProps)(HomeBanner);
