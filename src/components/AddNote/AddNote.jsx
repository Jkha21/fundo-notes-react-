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
import { useDispatch} from 'react-redux';



const AddNote = ({noteDetails={}, openAddNote=false, updateNote}) =>{
    const [menu, setMenu] = useState(null);
    const wrapperRef = useRef(null);
    const [noteTitle, setNoteTitle] = useState(noteDetails.Title);
    const [noteDescription, setNoteDescription] = useState(noteDetails.Description);
    const [noteColor, setNoteColor] = useState(noteDetails.Color || "white");
    const id = noteDetails._id;
    const dispatch = useDispatch();
    const menuClick = Boolean(menu);
    const [create, setCreate] = useState(openAddNote);
    const [colorMenu, setColorMenu] = useState(null);
    const colorMenuClick = Boolean(colorMenu);
    
    const handleMenuClick = (event) => {
        setMenu(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setMenu(null);
      };

    const handleWrap = () =>{
      setCreate(!create);
    };

    
    const createNote = async() =>{
        if(!noteTitle && !noteDescription){
        }else if(id){
            const notesList = updateNoteByIdApi(`updateNote/${id}`, {"Title":noteTitle, "Description": noteDescription, "Color": 
            noteColor});
            const data = (await notesList).data.data;
            updateNote(data, "update");
            setNoteTitle("");
            setNoteDescription("");
            setNoteColor("white");
            handleWrap();
        }else{
            const notesList = await createNoteApi({"Title": noteTitle, "Description": noteDescription, "Color": noteColor});
            console.log(noteTitle, noteDescription, noteColor)
            const data = await notesList.data.data;
            dispatch(addNoteToList(data));
            updateNote(data, "create");
            handleWrap();
        }
        resetFields();
        handleWrap();
    }

    const resetFields = () =>{
        setNoteTitle("");
        setNoteDescription("");
        setNoteColor("white");
    };

    const handleColorMenuClick = (event) =>{
        setColorMenu(event.currentTarget);
        console.log(colorMenu);
    };
 
    const handleColorMenuClose = () =>{
        setColorMenu(null);
    };

    // const [backgroundColor, setBackgroundColor] = useState({Color});



    
    return (
    <>
        {!create?
        <div className="noteInput-dashwrap-cnt" onClick={handleWrap}>
        <div className="noteInput-dashinput-cnt">
                <input type="text" className="addNote-noteInputCnt-cnt" placeholder='Take a note...'value={""}/>
                <div className='dashbd-iconact-cnt'>
                    <CheckBoxOutlinedIcon className="dashbd-icon-cnt"/>
                    <BrushOutlinedIcon className="dashbd-icon-cnt"/>
                    <PhotoOutlinedIcon className="dashbd-icon-cnt"/>
                </div>
          </div>
        </div>:
        <div className="noteUI-wrapper-cnt" style={{backgroundColor: noteColor}}>
            <div className='noteInput-inputCnt-cnt' >
                <input type="text" className="noteInput-titleInput-cnt" placeholder='Title'value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} style={{ backgroundColor: noteColor }}/>
                <input type="text" className="noteInput-noteInputbox-cnt" placeholder='Take a note...' value= {noteDescription} onChange={(e) => setNoteDescription(e.target.value)} style={{ backgroundColor: noteColor }}/>
            </div>
            <div className='dashbd-icon-ct'>
                <div className="noteUI-iconsactions-cnt">
                    <NotificationsNoneOutlinedIcon className="dashbd-iconAt-cnt"/>
                    <PersonAddOutlinedIcon className="dashbd-iconAt-cnt" />
                    <ColorLensOutlinedIcon className="dashbd-iconAt-cnt" onClick={handleColorMenuClick}/>
                    <Menu id="dashbd-colormenu-cnt" anchorEl={colorMenu} colorMenuClick={colorMenuClick} open={colorMenuClick} onClose={handleColorMenuClose}>
                    <div className="color-palette-cnt">
                                    {['#FFFFFF', '#FAAFA8', '#F39F76', '#FFF8B8', '#E2F6D3', '#B4DDD3', '#D4E4ED', '#AECCDC', '#D3BFDB', '#F6E2DD', '#E9E3D4', '#EFEFF1'].map(color => (
                                        <div key={color} className="color-swatch" style={{ backgroundColor: color }} onClick={() =>  setNoteColor(color)}></div>
                                    ))}
                    </div>
                    </Menu>
                    <PhotoOutlinedIcon className="dashbd-iconAt-cnt" title="Note"/>
                    <ArchiveOutlinedIcon className="dashbd-iconAt-cnt" />   
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
                <button className='noteInput-closeBtn-cnt' onClick={createNote} style={{ backgroundColor: noteColor }}>
                    Close
                </button>
            </div>
          </div> 

        }
    
    </>
    )
}

export default AddNote;
