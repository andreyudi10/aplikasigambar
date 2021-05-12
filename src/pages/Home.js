import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory} from 'react-router-dom'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import {Link} from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import styles from './Home.module.css'
function Home(props) {    
    let history = useHistory()    
    const [imageData,setImageData] = useState()
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData]=useState()
    const [favourite,setFavourite]=useState([])
    const [valueDebounce, setValueDebounce] = useState("")
    const [ mappedData, setMappedData] = useState()
        
    
    // ambil data entah dari api ato local storage
    useEffect(()=>{        
        const getStorageData = JSON.parse(localStorage.getItem("copyData"))
        if(getStorageData){
            setImageData(getStorageData)   
        }else{
            const getImage = async () => {            
                const res = await axios.get(                
                    `https://jsonplaceholder.typicode.com/albums/1/photos`
                  );
                  const result = await res.data;
                  console.log(result);              
                  setImageData(result);                          
                }
                getImage()        
            }
        },[])
    
        // taro imageData di mappedData ini yang di map
    useEffect(()=>{     
        const getStorageData = JSON.parse(localStorage.getItem("copyData"))           
        if(imageData && getStorageData){
            const newData = (data)=>({
                albumId:data.albumId,
                id:data.id,
                thumbnailUrl:data.thumbnailUrl,
                title:data.title,
                url:data.url,
                isFavorite:data.isFavorite,    
                })
            const addKeyFavourite = imageData && imageData.map(data=>newData(data))            
            setMappedData(addKeyFavourite)         
            localStorage.setItem("copyData",JSON.stringify(addKeyFavourite))               
        }else if(imageData){
        const newData = (data)=>({
                albumId:data.albumId,
                id:data.id,
                thumbnailUrl:data.thumbnailUrl,
                title:data.title,
                url:data.url,
                isFavorite:false,    
            })
            const addKeyFavourite = imageData && imageData.map(data=>newData(data))            
            setMappedData(addKeyFavourite)         
            localStorage.setItem("copyData",JSON.stringify(addKeyFavourite))                           
        }                 
    },[imageData])
    
    // manipulasi imageData pake search sehingga menjadi filteredData
    useEffect(()=>{     
        if(mappedData) {
            const results = mappedData && mappedData.filter((data) =>(
                data.title.toLowerCase().indexOf(valueDebounce.toLowerCase()) > -1             
                ));
                setFilteredData(results)                            
            }        
        }        
    ,[valueDebounce])
        
        
    const handleDetail = (e) => {
        console.log(e.target.getAttribute('fullUrl'))
        history.push(`./details/${e.target.getAttribute('id')}`)        
        // setDetail()
    }    
    
    const  handleFavourite = (e)=>{                
        const id = e.target.id
        const changedMapData =(data) =>({
            albumId:data.albumId,
            id:data.id,
            thumbnailUrl:data.thumbnailUrl,
            title:data.title,
            url:data.url,
            isFavorite:true,  
        })
        const newMappedDta = mappedData.map((data)=>data.id==id ? changedMapData(data) : data)
        setMappedData(newMappedDta)
        console.log(newMappedDta)
        localStorage.setItem("copyData",JSON.stringify(newMappedDta))
        }    

    const cardBody = filteredData ?    
    filteredData && filteredData.map((array,index)=>(                
        <MDBCard className={styles.card}>
        <MDBCardImage className="img-fluid" src={array.thumbnailUrl}
        waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
        <MDBCardBody title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle className={styles.title}>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleFavourite} id={array.id} className={styles.button}>Favourite</MDBBtn>
        </MDBCardBody>
        </MDBCard>    
    )):
    mappedData && mappedData.map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className={`img-fluid ${styles.objekfit}`} src={array.thumbnailUrl}
            waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
            <MDBCardBody id={array.id} title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle className={styles.title}>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleFavourite} id={array.id} className={styles.button}>Favourite</MDBBtn>
            </MDBCardBody>
        </MDBCard>    
    ))

    const handleChangeDebounce = (e) =>{
        console.log(e.target.value)
        setValueDebounce(e.target.value)
    }
    
    return(
        <div className={styles.area}>
            <h1 className={`${styles.titlereal} ${true?styles.titlereal2:styles.titlereal}`}>                
                Welcome In Photo Gallery
            </h1>            
            <div className={styles.center}>
                {/* <input  type="text" 
                        value={search} 
                        onChange={handleChange} 
                        placeholder="Search by title"
                        className={styles.input}>                
                </input>          */}
                <DebounceInput
                    minLength={2}
                    debounceTimeout={500}
                    onChange={handleChangeDebounce}
                    className={styles.debounce}
                    placeholder="Search by title"
                    />                
                <Link to="/favourite">
                    <MDBBtn className={styles.button} >Favourite Page</MDBBtn>                   
                </Link>
            </div>
            <MDBCol className={styles.imageContainer} >
                {cardBody}
            </MDBCol>   
        </div>
    )
}

export default Home;
