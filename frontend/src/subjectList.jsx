import { useNavigate } from "react-router-dom";

function Subjectlist(){
    const subjects=JSON.parse(localStorage.getItem('sub_list'));
    const navigate=useNavigate();
    return (
        <>
        <div className="subjectList">
            <h1>SUBJECTS</h1>
            <div className="subjectcards">
                {
                    subjects.map((subject,index)=>(
                        <div className='sublist' key={index} onClick={()=>navigate(`/feedback/${subject.subjectCode}/${subject.subjectName}`)}>
                            <h2>{subject.subjectCode} - {subject.subjectName}</h2>
                        </div>
                        
                    ))

                }
            </div>
        </div>
        </>
    )
}

export default Subjectlist;