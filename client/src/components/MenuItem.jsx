import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ListItemButton from '@mui/material/ListItemButton';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import { ListItem } from '@mui/material';

export default function MenuItem() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  let menuItems = [];

  const adminItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon/>,
      path: '/admin'
    },
    {
      text: 'Manage Users',
      icon: <ManageAccountsIcon/>,
      path: ""
    }
  ];

  const userItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon/>,
      path: '/user'
    },
    {
      text: 'Reports',
      icon: <BarChartIcon/>,
      path: '/user'
    },
    {
      text: 'Inventory',
      icon: <InventoryIcon/>,
      path: '/user/inventory'
    },
    {
      text: 'Vendors',
      icon: <StorefrontIcon/>,
      path: '/user/vendors'
    }
  ];

  if (user) {
    if (user.role === 'admin') {
      menuItems = adminItems;
    }

    if (user.role === 'user') {
      menuItems = userItems;
    }
  }

  return (
    <Fragment>
      {menuItems.map(item => (
        <ListItemButton key={item.name} onClick={() => navigate(item.path)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text}/>
        </ListItemButton>
      ))}
    </Fragment>
  );
}
