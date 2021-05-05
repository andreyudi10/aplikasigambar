import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { useHistory} from 'react-router-dom'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import styles from './Home.module.css'
function Home(props) {    
    let history = useHistory()    
    const [imageData,setImageData] = useState()
    const [search, setSearch] = useState('')
    const [filteredData, setFilteredData]=useState()
    const handleClick = (e) =>(           
        history.push(`./${e.target.parentNode.getAttribute('id')}`)        
    )
    const handleChange = (e) => {        
        setSearch(e.target.value)
    }    

    const handleDetail = (e) => {
        console.log(e.target.getAttribute('fullUrl'))
        history.push(`./${e.target.getAttribute('id')}`)        
        // setDetail()
    }

    useEffect(()=>{
        const getImage = async () => {            
              const res = await axios.get(                
                `https://jsonplaceholder.typicode.com/albums/1/photos`
              );
              const result = await res.data;
              console.log(result);              
              setImageData(result);            
        }
        getImage()
        console.log(imageData)
    }
    ,[])

    useEffect(()=>{     
        if(imageData) {
            const results = imageData.filter(data =>
                data.title.toLowerCase().indexOf(search.toLowerCase()) > -1             
              );
              setFilteredData(results);
        }
    }        
    ,[search])


    const cardBody = filteredData ?    
    filteredData && filteredData.map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className="img-fluid" src={array.thumbnailUrl}
            waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
            <MDBCardBody title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleClick} >Favourite</MDBBtn>
            </MDBCardBody>
        </MDBCard>    
    )):
    imageData && imageData.map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className="img-fluid" src={array.thumbnailUrl}
            waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
            <MDBCardBody id={array.id} title={array.title} thumbnailUrl={array.thumbnailUrl} fullUrl={array.url}>
                <MDBCardTitle>{array.title}</MDBCardTitle>                    
                <MDBBtn onClick={handleClick} >Favourite</MDBBtn>
            </MDBCardBody>
        </MDBCard>    
    ))
    
    return(
        <div className={styles.area}>
            <h1 className={styles.title}>                
                Welcome In Photo Gallery
            </h1>            
            <div className={styles.center}>
                <input  type="text" 
                        value={search} 
                        onChange={handleChange} 
                        placeholder="Search by title"
                        className={styles.input}>                
                </input>         
                <MDBBtn className={styles.button}>Favourite</MDBBtn>   
            </div>
            <MDBCol className={styles.imageContainer} >
                {cardBody}
            </MDBCol>   
        </div>
    )
}

export default Home;