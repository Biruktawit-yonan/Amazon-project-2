import React from 'react'
import Carousel from "../../components/Carousel/CarouselEffect"
import Category from '../../components/Category/Category';
import Products from '../../components/Products/Products';
import Layout from '../../components/Layout/Layout';
function LandingPage() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Products />
    </Layout>
  );
}

export default LandingPage