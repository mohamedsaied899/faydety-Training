import ShowLead from "../../components/ShowLead";
import isAuth from '../../guards/isAuth';

const Leads = () => {
    return (
        <>
         <div><h1>
             <ShowLead />
        </h1></div>
        </>
    );
}

export default isAuth(Leads);