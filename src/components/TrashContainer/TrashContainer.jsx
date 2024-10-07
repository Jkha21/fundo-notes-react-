import { useEffect, useState } from "react";
import { getAllNotesApi } from "../../utils/Api";
import Notecard from "../Notecard/Notecard";
import './TrashContainer.scss';
import { useSelector } from "react-redux";

export default function TrashContainer(handleDeleteClick){
    const [trashList, setTrash] = useState([]);
    const getTrashList = useSelector((store) => store.notes.notesList);
    
    useEffect(()=>{
        getDelNotes();
    }, []);

    const getDelNotes = () =>{
        try{
            setTrash(getTrashList);
        }catch(error){
          console.error(error);
        }
    };
    
    function handleDeleteClick(data, action){
        if(action === "restore" || action === "permanentDelete"){
            setTrash(trashList.filter(note => note._id !== data._id));
        }
    };


    return(
        <>  <div className="dashbd-trash-cnt">
            {trashList?.map(note => note.isDeleted ?(
            <Notecard noteDetails={note} updateList={handleDeleteClick} key={note._id} />
            ):null
            )}  
            </div>
        </>
    )
}