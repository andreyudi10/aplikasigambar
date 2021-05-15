import React, { useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useParams} from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './DetailGambar.module.css'
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader"

function DetailGambar(props) {    
    const {id} = useParams()
    const [imageData, setImageData] = useState()
    const [filteredData, setFilteredData ] = useState()
    const [ loading, setLoading ] = useState(true)
    
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

    

    useEffect(()=>{
        const getData = async () =>{
            const res = await axios.get(
              `https://jsonplaceholder.typicode.com/albums/1/photos`
            ) 
            setImageData(res.data)
            await setInterval(2000)
            setLoading(false)
       }
       getData()
    },[])
    useEffect(()=>{
        if(imageData){
            const result = imageData.filter((aray)=>aray.id.toString()===id)
            console.log(imageData)
            setFilteredData(result)
        }
    },[imageData])
     
    const show = filteredData && <img src={filteredData[0].url}></img>
    const tryLoad = async () => {
        return filteredData ?
               <img src={filteredData[0].url}></img>:
               <p>none</p>
    }
    return(
        <div className={styles.area}>
            <div>
                <h1 className={styles.title}>
                    Detail Gambar                                                
                </h1>
                <Link to="/">
                    <MDBBtn className={styles.backButton}>
                        Home
                    </MDBBtn>                
                </Link>
            </div>            
            {loading ?  <ClipLoader loading={loading} css={override} size={150} />: show }            
            {/* {tryLoad} */}
        </div>
    )
}

export default DetailGambar;