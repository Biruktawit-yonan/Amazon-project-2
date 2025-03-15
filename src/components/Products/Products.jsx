import React, {useState,useEffect} from 'react'
import axios from 'axios';
import ProductsCard from './ProductsCard';
import classes from "./Products.module.css"
function Products() {
   const [Products, setProducts] = useState([]);

    useEffect(()=>{
axios
.get("https://fakestoreapi.com/products") 

.then((res) => {
console.log(res);
const singleProduct= res.data;
setProducts(singleProduct);
    
    }).catch((err)=>{
console.log(err)

});
 },[]);

 return (
   <section className={classes.products_container}>
     {Products?.map((ProductsInfo, i) => {
       return <ProductsCard renderAdd={true} renderDesc={false} key={i} product={ProductsInfo} />;
     })}
   </section>
 );
}

export default Products;