import { highToLow, lowToHigh, reebok, puma, adidas, nike,filterByGender, women, men, sortByPrice, filterByBrand, filterByRating, clearFilter } from '../../constant';
import {useProduct} from '../../provider/ProductProvider';
import { useSearchParams } from 'react-router-dom';

function Filter() {
    const { filter, dispatch } = useProduct();
    const { price, gender, brand, rating } = filter;
    const [searchParams, setSearchParams] = useSearchParams();
    
    function compareFilterVal(val, fltr) {
        if(fltr && val) {
            return fltr.toLocaleLowerCase() === val.toLocaleLowerCase();
        }
        return false;
    }
    
    function filterBy(type, payload) {
        const typeLowerCaseVal = type.toLocaleLowerCase();
        if (type) {
            if(compareFilterVal(filter[typeLowerCaseVal], payload)) {
                dispatch({ type: type, payload: "" });

                searchParams.delete(typeLowerCaseVal);
                setSearchParams(searchParams);
            } else {
                dispatch({ type: type, payload: payload });

                const params = new URLSearchParams();
                searchParams.forEach((value, key) => {
                    if(typeLowerCaseVal !== key) { 
                        params.append(key, value);
                    }
                });

                params.append(typeLowerCaseVal, payload.toLocaleLowerCase());
                setSearchParams(params);
            }
        }
    }

    function sliderChangeHandler(e) {
        const currentValue = Number(e.target.value);
        return dispatch({ type: filterByRating, payload: currentValue });
    }

    function resetFilter() {
        dispatch({ type: clearFilter });
        setSearchParams("");
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
                          type="checkbox"
                          className="input-radio" 
                          onChange={() => filterBy(sortByPrice, highToLow)}
                          checked={compareFilterVal(price, highToLow)}
                        />
                        <span className="action-item-text">Price - Low to High</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                         type="checkbox" 
                         className="input-radio"
                         onChange={() => filterBy(sortByPrice, lowToHigh)}
                         checked={compareFilterVal(price, lowToHigh)}
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
                            checked={compareFilterVal(gender, men)}
                        />
                        <span className="action-item-text">Men</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByGender, women)}
                            checked={compareFilterVal(gender, women)}
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
                            checked={brand && compareFilterVal(brand, adidas)}
                        />
                        <span className="action-item-text">Adidas</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, nike)}
                            checked={brand && compareFilterVal(brand, nike)}
                        />
                        <span className="action-item-text">Nike</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, puma)}
                            checked={brand && compareFilterVal(brand, puma)}
                        />
                        <span className="action-item-text">Puma</span>
                    </label>
                </div>
                <div>
                    <label className="filter-section-content-action">
                        <input
                            type="checkbox" 
                            onChange={() => filterBy(filterByBrand, reebok)}
                            checked={brand && compareFilterVal(brand, reebok)}
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