import Banner from "./Banner";
import CategoryList from "./CategoryList";
import CollectionList from "./CollectionList";
import Navbar from "../Navbar";

function Home() {
    return(
        <div>
            <Navbar/>
            <div className="main-content layout-grid">
                <CategoryList/>
                <Banner/>
                <CollectionList/>
            </div>
        </div>
    );
}

export default Home;