import React, { useEffect } from 'react';
import './Notecard.scss';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RestoreFromTrashOutlinedIcon from '@mui/icons-material/RestoreFromTrashOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { archiveNotesByIdApi, delNoteByIdApi, trashNotesApiById, updateNoteByIdApi } from '../../utils/Api';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddNote from '../AddNote/AddNote';
import { useDispatch } from 'react-redux';
import { removeNoteFromList, archiveNoteFromList } from '../../utils/Store/NoteSlice';



const Notecard = ({noteDetails, updateList}) =>{
    const {Title, Description, isArchived, isDeleted, _id, Color="white"} = noteDetails;
    const dispatch = useDispatch();
    const [menu, setMenu] = useState(null);
    const menuClick = Boolean(menu);
    const [open, setOpen] = React.useState(false);
    const [colorMenu, setColorMenu] = useState(null);
    const colorMenuClick = Boolean(colorMenu);

    // const [anchorEl, setAnchorEl] = React.useState(null);
    
    const handleIconsClick = async(action, obj) => {
        if(action === "archive"){
            archiveNotesByIdApi(_id);
            console.log()
            dispatch(archiveNoteFromList(noteDetails));
            updateList(noteDetails, "archive");
        }else if(action === "trash"){
            // trashNotesApiById(_id);
            dispatch(removeNoteFromList(noteDetails));    
            updateList(noteDetails, "trash");
            handleMenuClose();
        }else if(action === "color"){
            const data = await updateNoteByIdApi(_id, obj); 
            updateList(data.data.data, "color");
            handleColorMenuClose();
        }else if(action === "restore"){
            trashNotesApiById(_id);
            updateList(noteDetails, "restore");
        }else if(action === "permanentDelete"){
            delNoteByIdApi(_id);
            updateList(noteDetails, "delete");
        }else if(action === "unarchive"){
            archiveNotesByIdApi(_id);
            updateList(noteDetails, "unarchive");
        }
    };
    
    const handleMenuClick = (event) => {
        setMenu(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenu(null);
      };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 500, 
        bgcolor: 'background.paper', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4 
    };

    const handleColorMenuClick = (event) =>{
        setColorMenu(event.currentTarget);
        console.log(colorMenu);
    };

    const handleColorMenuClose = () =>{
        setColorMenu(null);
    };


    
    return (
    <>  
        {!open?<div className="noteCard-tickNote-cnt" >
        < CheckCircleRoundedIcon className="noteCard-tick-cnt" />
        <div className="noteCard-wrapper-cnt" style={{backgroundColor: Color}}>
                <span className="noteUI-content-cnt" onClick={handleOpen}>
                    {Title}
                </span><br />
                <span onClick={handleOpen} className='noteCard-description-cnt'>{Description}</span>
            {
                isDeleted?
            <div className="noteUI-actions-cnt">
                <RestoreFromTrashOutlinedIcon className="size-6" onClick={() => handleIconsClick('restore')}/> 
                <DeleteForeverOutlinedIcon className="size-6" onClick={() => handleIconsClick('permanentDelete')}/>
            </div>:
            <div className="noteCard-actions-cnt">
            < NotificationsNoneOutlinedIcon className="size-6"/>
            <PersonAddOutlinedIcon className="size-6" />
            <ColorLensOutlinedIcon className="size-6" onClick={handleColorMenuClick}/>
            <Menu id="dashbd-colormenu-cnt" anchorEl={colorMenu} colorMenuClick={colorMenuClick} open={colorMenuClick} onClose={handleColorMenuClose}>
            <div className="color-palette-cnt">
                                    {['#FFFFFF', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1'].map(color => (
                                        <div key={color} className="color-swatch" style={{ backgroundColor: color }} onClick={() => handleIconsClick("color", {"Color": color})}></div>
                                    ))}
            </div>
            </Menu>
            < PhotoOutlinedIcon className="size-6" tile="Note"/>
            {isArchived ?<UnarchiveOutlinedIcon className="size-6" onClick={() => handleIconsClick('unarchive')}/>:<ArchiveOutlinedIcon className="size-6" onClick={() => handleIconsClick('archive')} />}
            <MoreVertOutlinedIcon  className="size-6" onClick={handleMenuClick}/>
            <Menu
                id="basic-menu"
                menuClick={menuClick}
                open={menuClick}
                onClose={handleMenuClose}
                anchorEl={menu}
            >
                <MenuItem onClick={() => {
                    handleIconsClick('trash');
                    handleMenuClose();
                }}>Delete Note</MenuItem>
                <MenuItem onClick={handleMenuClose}>Add label</MenuItem>
            </Menu>
            </div>
            }
        </div>
        </div>:
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddNote noteDetails= {noteDetails} openAddNote={true} />
      </Modal>
        }
    </>
    )
}

export default Notecard;



