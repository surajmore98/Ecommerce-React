import Category from "./Category";
import { categories } from "../../data/Categories";

function CategoryList() {
    return (
        <div className="product-category-list">
            {
                categories && categories.map((category, index) => {
                    return(
                        <Category category={category} key={index}/>
                    )
                })
            }
        </div>
    );
}

export default CategoryList;