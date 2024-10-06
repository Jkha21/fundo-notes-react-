import { useEffect, useState } from "react";
import { getAllNotesApi } from "../../utils/Api";
import Notecard from "../Notecard/Notecard";
import './TrashContainer.scss';
import { useSelector } from "react-redux";

export default function TrashContainer(handleDeleteClick){
    const [trashList, setTrash] = useState();
    const getTrashList = useSelector((store) => store.notes.trashList);
    // setTrash(getTrashList);
    useEffect(()=>{
        getDelNotes();
    }, []);
    async function getDelNotes(){
        try{
            const data = await getAllNotesApi();
              console.log(data);
            setTrash(data.data.data);
        }catch(error){
          console.error(error);
        }
    };
    
    function handleDeleteClick(data, action){
        if(action === "restore" || action === "permanentDelete"){
            setTrash(trashList.filter(note => note._id !== data._id));
        }else if(action === "permanentDelete"){
            getDelNotes();
        }
    };


    return(
        <>  <div className="dashbd-trash-cnt">
            {getTrashList?.map(note => note.isDeleted ?(
            <Notecard noteDetails={note} updateList={handleDeleteClick} key={note._id} />
            ):null
            )}  
            </div>
        </>
    )
}