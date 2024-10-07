import './DashboardContainer.scss';
import keepIcon from './keeps.png';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box, List, ListItem, ListItemText } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotesApi } from '../../utils/Api';
import { getNotesToList } from '../../utils/Store/NoteSlice';

const DrawerList = ({ onItemClick }) => (
    <Box sx={{ width: 250 }} role="presentation" id='dashCnt-drawer-ct'>
        <List className='dashCnt-list-cnt'>
            <ListItem button onClick={() => onItemClick('/notes')} name='listItem' id='dashCnt-notes-cnt'>
                <LightbulbOutlinedIcon id='dashCnt-bulb-cnt' name='icon' />
                <ListItemText primary='Notes' name='item' />
            </ListItem>
            <ListItem name='listItem' id='dashCnt-reminder-cnt'>
                <NotificationsNoneOutlinedIcon id='dashCnt-notify-cnt' name='icon' />
                <ListItemText primary='Reminders' name='item' />
            </ListItem>
            <ListItem name='listItem' id='dashCnt-edit-cnt'>
                <CreateOutlinedIcon id='dashCnt-create-cnt' name='icon' />
                <ListItemText primary='Edit labels' name='item' />
            </ListItem>
            <ListItem name='listItem' button onClick={() => onItemClick('/archive')} id='dashCnt-archive-cnt'>
                <ArchiveOutlinedIcon id='dashCnt-archive-cnt' name='icon' />
                <ListItemText primary='Archive' name='item' />
            </ListItem>
            <ListItem name='listItem' button onClick={() => onItemClick('/trash')} id='dashCnt-trash-cnt'>
                <DeleteOutlineOutlinedIcon id='dashCnt-trash-cnt' name='icon' />
                <ListItemText primary='Trash' name='item' />
            </ListItem>
        </List>
    </Box>
);

export default function DashboardContainer() {
    const [drawer, setDrawer] = useState(false);
    const toggleDrawer = () => {
        setDrawer((prev) => !prev);
    };
    const navigate = useNavigate();
    const location = useLocation();
    const [head, setHead] = useState('Keep');
    const dispatch = useDispatch();
    
    useEffect(() => {
        getAllNotes()
    }, []);

    useEffect(() => {     
        switch (location.pathname) {
            case '/archive':
                setHead('Archive');
                break;
            case '/trash':
                setHead('Trash');
                break;
            case '/notes':
                setHead('Keep');
                break;
            default:
                setHead('Keep');
        }
    }, [location.pathname]);


    const handleItemClick = (path) => {
        navigate(path);
        setDrawer(false);
    }
    const handleMouseEnter = () => {
        setDrawer(true);
    };

    const getAllNotes = async() => {
        let notes = await getAllNotesApi('allNotes');
        dispatch(getNotesToList(notes.data.data));
    }
    


    return (
        <>  
            <div className="dashCnt-header-cnt">
                <MenuOutlinedIcon className="DashCnt-bar3-cnt" onClick={toggleDrawer} />
                {head === "Keep" && <img src={keepIcon} alt="keepIcon" className='DashCnt-keepIcon-cnt' />}
                <span className='dashCnt-headerlabel-cnt'>{head}</span>
                <SearchIcon className='dashCnt-searchIcon-cnt' />
                <input className='dashCnt-search-cnt' placeholder='Search' />
            </div>
            <div className='left-corner'>
                <Drawer open={drawer} onClose={() => setDrawer(false)} id='dashCnt-drawer-cnt'>
                    <DrawerList onItemClick={handleItemClick} />
                </Drawer>
            </div>
            <div className='dashbd-subNotes-ct'>
            <div className='dashbd-nav-cnt'>
                <LightbulbOutlinedIcon onMouseEnter={handleMouseEnter} className='dashbd-nts-ct' id="dashbd-bulbnav-cnt"/>
                <NotificationsNoneOutlinedIcon onMouseEnter={handleMouseEnter} className='dashbd-nts-ct' />
                <EditOutlinedIcon onMouseEnter={handleMouseEnter} className='dashbd-nts-ct' />
                <ArchiveOutlinedIcon onMouseEnter={handleMouseEnter} className='dashbd-nts-ct' />
                <DeleteOutlineOutlinedIcon onMouseEnter={handleMouseEnter} className='dashbd-nts-ct' />
            </div>        
            <Outlet className="dashbd-outlet-cnt" />
            </div>
        </>
    );
}



