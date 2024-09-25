import './DashboardContainer.scss';
import keepIcon from './keeps.png';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" id='dashCnt-drawer-ct'>
      <List className='dashCnt-list-cnt'>
        <ListItem name='listItem' id='dashCnt-bulbItem-cnt'>
          <LightbulbOutlinedIcon id='dashCnt-bulb-cnt' name='icon'/>
          <ListItemText primary='Notes'  name='item'/>
        </ListItem>
        <ListItem name='listItem'>
          <NotificationsNoneOutlinedIcon id='dashCnt-notify-cnt' name='icon'/>
          <ListItemText primary='Reminders' name='item'/>
        </ListItem>
        <ListItem name='listItem'>
          <CreateOutlinedIcon id='dashCnt-create-cnt' name='icon'/>
          <ListItemText primary='Edit labels' name='item' />
        </ListItem>
        <ListItem name='listItem'>
          <ArchiveOutlinedIcon id='dashCnt-archive-cnt' name='icon'/>
          <ListItemText primary='Archive' name='item'/>
        </ListItem>
        <ListItem name='listItem'>
          <DeleteOutlineOutlinedIcon id='dashCnt-trash-cnt' name='icon'/>
          <ListItemText primary='Trash' name='item'/>
        </ListItem>
      </List>
    </Box>
);

export default function DashboardContainer() {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => {
        setDrawer((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const drawerElement = document.getElementById('dashCnt-drawer-cnt');
            const menuButton = document.querySelector('.DashCnt-bar3-cnt');

            if (drawer && drawerElement && !drawerElement.contains(event.target) && !menuButton.contains(event.target)) {
                setDrawer(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [drawer]);

    return (
        <>
            <div className="dashCnt-header-cnt">
                <MenuOutlinedIcon className="DashCnt-bar3-cnt" onClick={toggleDrawer} />
                <img src={keepIcon} alt="keepIcon" className='DashCnt-keepIcon-cnt' />
                <span className='dashCnt-headerlabel-cnt'>Keep</span>
                <SearchIcon className='dashCnt-searchIcon-cnt' />
                <input className='dashCnt-search-cnt' placeholder='Search' />
                <Drawer open={drawer} onClose={() => setDrawer(false)} id='dashCnt-drawer-cnt'>
                    {DrawerList}
                </Drawer>
            </div>
            <Outlet />
        </>
    );
}
