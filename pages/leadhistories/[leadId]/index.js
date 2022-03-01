import ShowHistoryLeads from '../../components/showHistoryLead';
import isAuth from '../../../guards/isAuth';

const HistoryLeads = () => <ShowHistoryLeads />

export default isAuth(HistoryLeads);