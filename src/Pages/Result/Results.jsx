import React, { useEffect } from "react";
import classes from "./Results.module.css";
import { productUrl } from "../../Api/endPoint";
import { useParams } from "react-router-dom";
import Layout from "../../Components/LayOut/LayOut";
import ProductsCard from "../../components/Products/ProductsCard";
import axios from "axios";


function Results() {
  const [results, setResults] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        let request = await axios.get(`${productUrl}/products/category/${categoryName}`
        );
        console.log(request);
        setResults(request.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Layout>
      <div>
        <h1 style={{ padding: "2rm" }}>Results</h1>
        <p style={{ padding: "2rm" }}>Category / {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {results?.map((product) => (
              <ProductsCard key={product.Id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Results;
