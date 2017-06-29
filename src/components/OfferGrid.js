import React from 'react';
import PropTypes from 'prop-types';

export default class OfferGrid extends React.Component {
    render() {
        return (
            <div className="row">
                {this.props.offers.map((offer) => {
                    const flashSale = Number(offer.flash_sale);
                    return (
                        <div className="col-sm-4 col-md-4" key={offer.id}>
                            <div className="thumbnail" style={{height: '350px'}}>
                                <img src={offer.img} alt={offer.name} style={{height: '170px'}}/>
                                <div className="caption">
                                    <h5>{offer.name}</h5>
                                    {!flashSale ? (
                                        <div style={{marginBottom: '10px'}}>
                                            <span className="label label-success" style={{fontSize: '1.2em'}}>&euro; {Number(offer.price).toFixed(2)}</span>
                                            <span className="label label-default pull-right">&euro; {Number(offer.old_price).toFixed(2)}</ span >
                                        </div>
                                    ) : (
                                        <div style={{marginBottom: '10px'}}>
                                            <span className="label label-success" style={{fontSize: '1.2em'}}>{offer.discount}% Korting</span>
                                        </div>
                                    )}
                                    <p>
                                        <a href={offer.url} rel="noopener noreferrer" className="btn btn-primary"
                                           role="button" target="_blank">Bekijken</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>
        )
    }
}

OfferGrid.propTypes = {
    offers: PropTypes.array.isRequired
};