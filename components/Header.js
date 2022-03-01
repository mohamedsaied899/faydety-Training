import { Avatar, Layout, Menu } from 'antd';
import Router from 'next/router';
import { clearItem } from '../services/local-storage.service';
import { logout } from '../apis/authApis';
import {
  Triangle
} from 'react-feather';
import DashHeader from './styles/Header';

import Link from 'next/link';
import { useAppState } from './shared/AppProvider';

const { SubMenu } = Menu;
const { Header } = Layout;

const logOut = async () => { 
    // call logout api
   await logout()
    // clear local host data
    clearItem()
    // rediredt to login page
    Router.push('/signin')
}

const MainHeader = () => {
  const [state, dispatch] = useAppState();
  return (
    <DashHeader>
      <Header>
        <Link href="/">
          <a className="brand">
            <Triangle size={24} strokeWidth={1} />
            <strong className="mx-1 text-black">{state.name}</strong>
          </a>
        </Link>

        <span className="mr-auto" />

        <Menu mode="horizontal">
          <SubMenu title={<Avatar src="/static/images/avatar.jpg" />}>
            <Menu.Item onClick={logOut}>Signout</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
