import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View:React.FC = () => {

    const [userData,setuserData]=useState<any>({})
    let { id } = useParams();

    const view = async(userId:any) =>{
        await axios.get(`http://localhost:8000/api/user/getall/${userId}`)
        .then((result)=>{
            setuserData(result.data.result)
            
        })
        .catch((error)=>{
            console.log(error);   
        })

    }

    useEffect(() => {
        view(id);
    }, [id])
    return (
        <div>
            {
                userData && <div>
                    <h3>{userData?.title}</h3>
                    <p>{userData?.description}</p>
                    <img className="previewImg" src={`http://localhost:8000/public/${userData?.image}`} alt="" />
                </div>
            }
        </div>
    );
};

export default View;