import { useEffect, useState } from "react";
import { getAllNotesApi } from "../../utils/Api";
import Notecard from "../Notecard/Notecard";
import './ArchiveContainer.scss';
import { useSelector } from "react-redux";

export default function ArchiveContainer({handleArchiveClick}){
    const [archiveList, setArchive] = useState();
    const getArchiveList = useSelector((store) => store.notes.archiveList);
    useEffect(()=>{
        getArchiveNotes();
    }, []);
    async function getArchiveNotes(){
        try{
              console.log(getArchiveList);
            setArchive(getArchiveList);
        }catch(error){
          console.error(error);
        }
    }

    function handleArchiveClick(data, action){
        if(action === "unarchive" || action === "trash"){
            setArchive(archiveList.filter(note => note._id !== data._id));
        }else if(action === "color"){
            setArchive(archiveList.map(note => {
                if(note._id === data._id)
                    return data
                return note
        }));
        }
    };


    return(
        <>
            <div className="dashbd-archive-cnt">
            {archiveList?.map(note => !note.isDeleted && note.isArchived?(
            <Notecard noteDetails={note} updateList={handleArchiveClick} key={note._id} />
            ):null
            )}  
            </div>
        </>
    )
}