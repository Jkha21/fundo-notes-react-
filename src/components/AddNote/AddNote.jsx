import React, { useEffect, useState } from 'react';
import './AddNote.scss';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import { useRef } from 'react';
import { archiveNotesByIdApi, createNoteApi, updateNoteByIdApi } from '../../utils/Api';
import { addNoteToList } from '../../utils/Store/NoteSlice';
import { useDispatch, useSelector } from 'react-redux';



const AddNote = ({noteDetails={}, openAddNote=false, updateNote}) =>{
    const [menu, setMenu] = useState(null);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const menuClick = Boolean(menu);
    const [create, setCreate] = useState(openAddNote);
    let {Title="", Description="", _id="", Color=""} = noteDetails;
    let noteTitle = Title?Title:"";
    let noteDescription = Description?Description:"";
    let noteColor = Color?Color:"white";
    const [colorMenu, setColorMenu] = useState(null);
    const colorMenuClick = Boolean(colorMenu);

    const handleIconsClick = (action, obj) =>{
        if(action === 'archive'){
            handleArchive();
            updateNote({action, obj});
        }else if(action === "color"){
            setBackgroundColor(obj)
        }
    };
    
    const handleMenuClick = (event) => {
        setMenu(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setMenu(null);
      };

    const handleWrap = () =>{
      setCreate(!create);
    };

    const handleArchive = () =>{
        const data = archiveNotesByIdApi(_id);
        return data;
    }
    
    const createNote = async() =>{
        if(!noteTitle && !noteDescription){
            handleWrap();
        }else if(_id){
            const notesList = updateNoteByIdApi(_id, {"Title":noteTitle, "Description": noteDescription, "Color": 
            noteColor});
            const data = (await notesList).data;
            updateNote(noteDetails, "update");
            handleWrap();
        }else{
            const notesList = await createNoteApi({"Title": noteTitle, "Description": noteDescription, "Color": noteColor});
            const data = await notesList.data.data;
            console.log(data);
            dispatch(addNoteToList(data));
            updateNote(data, "create");
        }
        handleWrap();
    }

    const handleColorMenuClick = (event) =>{
        setColorMenu(event.currentTarget);
        console.log(colorMenu);
    };
 
    const handleColorMenuClose = () =>{
        setColorMenu(null);
    };

    const [backgroundColor, setBackgroundColor] = useState({Color});



    
    return (
    <>
        {!create?
        <div className="noteInput-dashwrap-cnt" onClick={handleWrap}>
        <div className="noteInput-dashinput-cnt">
                <input type="text" className="noteInput-noteInputCnt-cnt" placeholder='Take a note...'/>
                <div className='dashbd-iconact-cnt'>
                    <CheckBoxOutlinedIcon className="dashbd-icon-cnt"/>
                    <BrushOutlinedIcon className="dashbd-icon-cnt"/>
                    <PhotoOutlinedIcon className="dashbd-icon-cnt"/>
                </div>
          </div>
        </div>:
        <div className="noteUI-wrapper-cnt" style={{backgroundColor: backgroundColor}}>
            <div className='noteInput-inputCnt-cnt' >
                <input type="text" className="noteInput-titleInput-cnt" placeholder='Title' onChange={(e) => noteTitle=e.target.value} style={{ backgroundColor: backgroundColor }}/>
                <input type="text" className="noteInput-noteInputbox-cnt" placeholder='Take a note...' onChange={(e) => noteDescription = e.target.value} style={{ backgroundColor: backgroundColor }}/>
            </div>
            <div className='dashbd-icon-ct'>
                <div className="noteUI-iconsactions-cnt">
                    <NotificationsNoneOutlinedIcon className="dashbd-iconAt-cnt"/>
                    <PersonAddOutlinedIcon className="dashbd-iconAt-cnt" />
                    <ColorLensOutlinedIcon className="dashbd-iconAt-cnt" onClick={handleColorMenuClick}/>
                    <Menu id="dashbd-colormenu-cnt" anchorEl={colorMenu} colorMenuClick={colorMenuClick} open={colorMenuClick} onClose={handleColorMenuClose}>
                    <div className="color-palette-cnt">
                                    {['#FFFFFF', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1'].map(color => (
                                        <div key={color} className="color-swatch" style={{ backgroundColor: color }} onClick={() => handleIconsClick('color' , color)}></div>
                                    ))}
                    </div>
                    </Menu>
                    <PhotoOutlinedIcon className="dashbd-iconAt-cnt" title="Note"/>
                    <ArchiveOutlinedIcon className="dashbd-iconAt-cnt" onClick={() => handleIconsClick('archive')} />   
                    <MoreVertOutlinedIcon  className="dashbd-iconAt-cnt" onClick={handleMenuClick}/>
                    <Menu
                        id="basic-menu"
                        anchorEl={menu}
                        menuClick={menuClick}
                        open={menuClick}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                    </Menu>
                    <UndoIcon className="noteUI-undo-cnt"/>
                    <RedoIcon className="noteUI-redo-cnt" />
                </div>
                <button className='noteInput-closeBtn-cnt' onClick={createNote} style={{ backgroundColor: backgroundColor }}>
                    Close
                </button>
            </div>
          </div> 

        }
    
    </>
    )
}

export default AddNote;
