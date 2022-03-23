import { collections } from '../../data/Collections';
import Collection from './Collection';

function CollectionList() {
        
    function clickHandler(type) {
    }
    return (
        <div className="product-category-group">
            {
                collections 
                && collections.map((item, index) =>{
                    return (
                        <Collection item={item} action={clickHandler} key={index}/>
                    )
                })
            }
            
        </div>
    );
};

export default CollectionList;