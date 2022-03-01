import ShowSources from '../../components/ShowSources';
import isAuth from '../../guards/isAuth';

const Sources = () => {
    return (
        <>
         <div><h1>
             <ShowSources />
        </h1></div>
        </>
    );
}

export default isAuth(Sources);