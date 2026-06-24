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

  const goToPrevPage=()=>{
    setCurrentPage((prev)=>Math.max(prev-1,0));
  }
const goToNextPage=()=>{
    setCurrentPage((prev)=>Math.min(prev+1,numberof_pages-1));
  }

  return !products.length?(
    <h1>No products found</h1>
  ):(
  
    <div className="app">
    <h1>Pagination</h1>
    <button disabled={currentPage===0} className="page-number" onClick={goToPrevPage}>👈</button>
    {[...Array(numberof_pages).keys()].map((n)=>(
      <button className={"page-number" + (n===currentPage ? " active" : "")} key={n} onClick={()=>handlePageChange(n)}>
        {n+1}
        </button>
      )) }
      <button disabled={currentPage===numberof_pages-1} className="page-number" onClick={goToNextPage}> 👉</button>
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