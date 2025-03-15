import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoint'
import ProductCard from '../../components/Products/ProductsCard'
import Loder from '../../components/Loder/Loder'
import Layout from '../../Components/LayOut/LayOut'

function ProductDetail() {
  const {productId} = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
   axios.get(`${productUrl}/products/${productId}`)
   .then((res) => {
    setProduct(res.data)
    setIsLoading(false)
   }).catch((err) =>{
    console.log(err);
    setIsLoading(false)
   })

  }, [])
  

  return (
    <Layout>
      {isLoading?(<Loder/>):(<ProductCard 
      product={product} 
      flex={true} 
      renderDesc={true}
      renderAdd={true}
      />)}
      
    </Layout>
  )
}

export default ProductDetail