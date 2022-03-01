import Plan from "../../components/Plan";
import isAuth from '../../guards/isAuth';

const Plans = () => < Plan/>

export default isAuth(Plans);