import React, { useEffect, useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useParams} from "react-router-dom";
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './DetailGambar.module.css'

function DetailBank(props) {    
    const {id} = useParams()
    const [imageData, setImageData] = useState()
    const [filteredData,setFilteredData] = useState()
    

    useEffect(()=>{
        const getImage = async () => {            
              const res = await axios.get(                
                `https://jsonplaceholder.typicode.com/albums/1/photos`
              );
              const result = await res.data;
            //   console.log(result);              
              setImageData(result);            
        }
        getImage()
        // console.log(imageData)
    }
    ,[])
    useEffect(()=>{
        if(imageData){
            const result = imageData.filter((aray)=>aray.id.toString()===id)
            console.log('result',result[0].url)
            setFilteredData(result)
        }
    }    
     ,[imageData])
    // const [data,setData] = useState(dataLihat.data)    
    // const objekFilteredData = data.filter((aray)=>aray.accountNumber.toString()===id)
    // const arrayFilteredData = objekFilteredData[0].details    
    // const [hasil,setHasil]=useState(arrayFilteredData)
    // const [searchTerm,setSearchTerm]=useState('')
    // const [filtered,setFiltered] = useState()
    // const [currency,setCurrency] = useState(objekFilteredData[0].currency)     
    // useEffect(()=>{
    //     const results = arrayFilteredData.filter((value)=>
    //         value.transactionnarative.indexOf(searchTerm.toLowerCase()) > -1
    //     )        
    //     setFiltered(results)
    //     console.log(filtered)
    // }
    // ,[searchTerm])
    
    // const handleChange = (e) => {
    //     setSearchTerm(e.target.value)
    // }

    // const tableBody = filtered && filtered.map((value,key)=>        
    //     <tr key={key.toString()}>
    //         <th scope='row'>{key+1}</th>
    //         <th scope='row'>{value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
    //         <th scope='row'>{value.date}</th>
    //         <th scope='row'>{currency}</th>                         
    //         <th scope='row'>{value.debit}</th>
    //         <th scope='row'>{value.credit}</th>
    //         <th scope='row'>{value.transactionnarative}</th>
    //     </tr>                            
    // )    
    const show = filteredData && <img src={filteredData[0].url}></img>
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
            {show}            
        </div>
    )
}

export default DetailBank;

