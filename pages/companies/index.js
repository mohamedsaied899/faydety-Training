import ShowCompanies from "../../components/ShowCompanies";
import isAuth from '../../guards/isAuth';

const Companies = () => {
    return (
        <>
         <div><h1>
             <ShowCompanies />
        </h1></div>
        </>
    );
}

export default isAuth(Companies);