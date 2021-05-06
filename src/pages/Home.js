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
    const [value, setValue] = useState("")
    const handleClick = (e) =>(           
        history.push(`./${e.target.parentNode.getAttribute('id')}`)        
    )
    const handleChange = (e) => {        
        setSearch(e.target.value)
    }    

    const handleDetail = (e) => {
        console.log(e.target.getAttribute('fullUrl'))
        history.push(`./details/${e.target.getAttribute('id')}`)        
        // setDetail()
    }
    

    function isNotDuplicate(w){
        const isDuplicate = new Set(w).size !== w.length
        const isNotDuplicate = !isDuplicate        
        return isNotDuplicate    
    }

    const  handleFavourite = (e)=>{
        console.log(e.target.parentNode)
        const id = e.target.parentNode.getAttribute('id')
        const title = e.target.parentNode.getAttribute('title')
        const thumbnail = e.target.parentNode.getAttribute('thumbnailUrl')
        const url = e.target.parentNode.getAttribute('fullUrl')

        // ...JSON.parse(localStorage.getItem("favourite"))
        if(favourite!==[]){            
            const objekFavourite = [
                    ...favourite,{
                    id:id,
                    title:title,
                    thumbnail:thumbnail,
                    url:url,
                    star:true
                    }
            ]                      
            const arrayObjekFavourite = objekFavourite.map((value)=>value.id)
            if(isNotDuplicate(arrayObjekFavourite)){
                
                setFavourite(objekFavourite)
                localStorage.setItem("favourite",JSON.stringify(objekFavourite))
            }                   
            // localStorage.setItem("favourite",JSON.stringify(favourite))
        }
<<<<<<< HEAD
        if(favourite===[]){
=======
       if(favourite===[]) {
>>>>>>> 90152a0130b9f18ccf4cfb43fc8a08a7337fc72f
            const firstFavourite = [
                {
                    id:id,
                    title:title,
                    thumbnail:thumbnail,
                    url:url,
                }
            ]                        
                setFavourite(firstFavourite)
                localStorage.setItem("favourite",JSON.stringify(firstFavourite))
            
            // localStorage.setItem("favourite",JSON.stringify(favourite))
        }
                        
        // localStorage.setItem("favourite",JSON.stringify(favourite))
    }
    console.log(favourite)
    

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
        console.log(imageData)
        
        if(JSON.parse(localStorage.getItem("favourite"))){
            // console.log()
            setFavourite(JSON.parse(localStorage.getItem("favourite")))
        }
    }
    ,[])

    useEffect(()=>{     
        if(imageData) {
            const results = imageData.filter(data =>
                data.title.toLowerCase().indexOf(value.toLowerCase()) > -1             
              );
              setFilteredData(results);
        }
    }        
    ,[value])


    const cardBody = filteredData ?    
    filteredData && filteredData.map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className="img-fluid" src={array.thumbnailUrl}
            waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
            <MDBCardBody title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle className={styles.title}>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleFavourite} >Favourite</MDBBtn>
            </MDBCardBody>
        </MDBCard>    
    )):
    imageData && imageData.map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className={`img-fluid ${styles.objekfit}`} src={array.thumbnailUrl}
            waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
            <MDBCardBody id={array.id} title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle className={styles.title}>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleFavourite} >Favourite</MDBBtn>
            </MDBCardBody>
        </MDBCard>    
    ))
    
    return(
        <div className={styles.area}>
            <h1 className={styles.titlereal}>                
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
                    onChange={event => setValue(event.target.value)} 
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
