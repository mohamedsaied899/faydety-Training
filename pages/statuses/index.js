import Status from '../../components/ShowStatus';
import isAuth from '../../guards/isAuth';

const Statuses = () => {
    return (
        <>
         <div><h1>
             <Status />
        </h1></div>
        </>
    );
}

export default isAuth(Statuses);