import React from "react";
import infos from "./Categoryinfo"
import CategoryCard from './CategoryCard'
import style from './Category.module.css'
function Category() {
  return (
    <div className={style.category__container}>
      {infos?.map((info, i) => (
        <CategoryCard key={i} data={info} />
      ))}
    </div>
  );
}

export default Category;
