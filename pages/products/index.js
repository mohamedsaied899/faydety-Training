import ShowProducts from '../../components/ShowProducts';
import isAuth from '../../guards/isAuth'

const Products = () => {
    return (
        <>
         <div><h1>
             <ShowProducts />
        </h1></div>
        </>
    );
}

export default isAuth(Products);