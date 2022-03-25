import { highToLow, lowToHigh, reebok, puma, adidas, nike,filterByGender, women, men, sortByPrice, filterByBrand, filterByRating, clearFilter } from '../../constant';
import {useProduct} from '../../provider/ProductProvider';

function Filter() {
    const { filter, dispatch } = useProduct();
    const { price, gender, brand, rating } = filter;
    const isHighToLow = price === highToLow;
    const isMen = gender === men;

    function filterBy(type, payload) {
        if (type) {
            dispatch({ type: type, payload: payload });
        }
        new Error(`type is not handled-${type}`);
    }

    function sliderChangeHandler(e) {
        const currentValue = Number(e.target.value);
        return dispatch({ type: filterByRating, payload: currentValue });
    }

    function resetFilter() {
        dispatch({ type: clearFilter });
    }

    return (
        <div className="filter-section">
            <div className="filter-section-header">
                <div className="filter-section-header-title">Filters</div>
                <button className="btn bg-white filter-section-header-action" onClick={resetFilter}>Clear</button>
            </div>
            <div className="filter-section-content">
                <div className="filter-section-content-title">Sort by</div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                          type="radio"
                          className="input-radio" 
                          onChange={() => filterBy(sortByPrice, highToLow)}
                          checked={price && isHighToLow}
                        />
                        <span className="action-item-text">Price - Low to High</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                         type="radio" 
                         className="input-radio"
                         onChange={() => filterBy(sortByPrice, lowToHigh)}
                         checked={price && !isHighToLow}
                        />
                        <span className="action-item-text">Price - High to Low</span>
                    </label>
                </div>
            </div>
            
            <div className="filter-section-content">
                <div className="filter-section-content-title">Category</div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByGender, men)}
                            checked={gender && isMen}
                        />
                        <span className="action-item-text">Men</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByGender, women)}
                            checked={gender && !isMen}
                        />
                        <span className="action-item-text">Women</span>
                    </label>
                </div>
            </div>

            <div className="filter-section-content">
                <div className="filter-section-content-title">Brands</div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, adidas)}
                            checked={brand && brand === adidas}
                        />
                        <span className="action-item-text">Adidas</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, nike)}
                            checked={brand && brand === nike}
                        />
                        <span className="action-item-text">Nike</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, puma)}
                            checked={brand && brand === puma}
                        />
                        <span className="action-item-text">Puma</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, reebok)}
                            checked={brand && brand === reebok}
                        />
                        <span className="action-item-text">Reebok</span>
                    </label>
                </div>
            </div>

            <div className="filter-section-content">
                <div className="filter-section-content-title">
                    <span>
                        Rating - {rating} 
                    </span>
                    <span className="material-icons">
                        star
                    </span>
                </div>
                <div className="filter-section-content-action flex-flow-vertical">
                    <input type="range" min="1" max="5" value={rating} className="filter-section-content-slider" id="myRange" onChange={(e) => sliderChangeHandler(e)} />
                </div>
            </div>
        </div>
    )
}

export default Filter;