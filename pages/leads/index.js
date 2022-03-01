import ShowLeads from '../../components/ShowLeads'
import isAuth from '../../guards/isAuth';

const FilterLeads = () => <ShowLeads />

export default isAuth(FilterLeads);