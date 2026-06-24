import { useEffect } from "react";
import { useState } from "react";

const ProductCard=({image,title})=>{
  return(
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <span>{title}</span>
    </div>
  )
}

const Page_size=10;

function App(){

  const[products,setProducts]=useState([]);
  const[currentPage,setCurrentPage]=useState(0);

  const fetchData=async()=>{
    const data=await fetch("https://dummyjson.com/products?limit=500");
    const json=await data.json();
    setProducts(json?.products);
  }
  useEffect(()=>{
    fetchData();
  },[])
  // console.log(products);
  const numberof_Products=products.length;
  const numberof_pages=Math.ceil(numberof_Products/Page_size);
  const start=currentPage * Page_size;
  const end=start + Page_size;

  const handlePageChange=(n)=>{
    setCurrentPage(n);
  }

  return !products.length?(
    <h1>No products found</h1>
  ):(
  
    <div className="app">
    <h1>Pagination</h1>
    {[...Array(numberof_pages).keys()].map((n)=>(
      <span className="page-number" key={n} onClick={()=>handlePageChange(n)}>
        {n}
        </span>
      )) }
    <div className="products-container">
    { 
      products.slice(start,end).map((p)=>(
        <ProductCard key={p.id} image={p.thumbnail} title={p.title}/>
      ))
    }
    </div>
    </div>
  )  
}
export default App