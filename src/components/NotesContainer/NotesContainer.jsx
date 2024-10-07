    import { useEffect, useState } from "react";
    import { getAllNotesApi } from "../../utils/Api";
    import AddNote from "../AddNote/AddNote";
    import './NotesContainer.scss'
    import Notecard from "../Notecard/Notecard";
    import {useSelector} from "react-redux";

    
    export default function NotesContainer(){
        const [notesList, setNotesList] = useState([]);
        const getData = useSelector((store) => store.notes.notesList);
        console.log(getData)
        useEffect(()=>{
            setNotesList(getData);
        }, []);
        
        
        function handleUpdateList(data, action){
            if(action === "archive" || action === "trash"){
                setNotesList(notesList.filter(note => note._id !== data._id));
            }else if(action === "color" || action === "update"){
                setNotesList(notesList.map(note => {
                    if(note._id === data._id)
                        return data
                    return note
                    }));
            }else if(action === "create"){
                setNotesList(getData);
            };
        };

        return(
            <>  
                <div className="notesCnt-input-cnt">
                < AddNote updateNote={handleUpdateList} className="dashnd-createInput-cnt" />
                {notesList?.map(note => !note.isDeleted && !note.isArchived && (
                    <Notecard noteDetails={note} updateList={handleUpdateList} key={note._id} className="dashbd-notecard-cnt"/>
                ))}
                </div>
            </>
        )
    }

    //khadbjlLK
    //kjdkjh@hkdafjl.com


// 9390286246