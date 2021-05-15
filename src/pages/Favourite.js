import React,{useEffect,useState} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import { useHistory, Link} from 'react-router-dom'

import styles from './Favourite.module.css'

const Favourite = () => {
    let history = useHistory()        
    const [mappedData,setMappedData] = useState()
    
    useEffect(() => {
        // localStorage.getItem("data")                
        const allArr = JSON.parse(localStorage.getItem("copyData"))
        // const favArr = allArr.filter((data)=>data.isFavorite == true)        
        setMappedData(allArr)
    }, [])
    // useEffect(,[favourite]

    // )

    const handleDetail = (e) => {
        const id = e.target.getAttribute('id')
        history.push(`./details/${id}`)        
    }

    
    const handleUnFavourite = (e) =>{        
        const id = e.target.id
        const changedMapData =(data) =>({
            albumId:data.albumId,
            id:data.id,
            thumbnailUrl:data.thumbnailUrl,
            title:data.title,
            url:data.url,
            isFavorite:false,  
        })
        const newMappedData = mappedData.map((data)=>data.id==id ? changedMapData(data) : data)
        setMappedData(newMappedData)
        localStorage.setItem("copyData",JSON.stringify(newMappedData))        
    }
    

    const favouriteBody = mappedData && mappedData
                                       .filter((array)=>array.isFavorite===true)
                                       .map((array,index)=>(                
                                            <MDBCard className={styles.card}>
                                                <MDBCardImage className="img-fluid" src={array.thumbnailUrl}
                                                waves onClick={handleDetail} id={array.id} fullUrl={array.url}/>
                                                <MDBCardBody title={array.title} thumbnailUrl={array.thumbnail} fullUrl={array.url}>
                                                    <MDBCardTitle className={styles.title}>{array.title}</MDBCardTitle>                    
                                                    <MDBBtn onClick={handleUnFavourite} id={array.id}>Unfavourit</MDBBtn>
                                                </MDBCardBody>
                                            </MDBCard>    
))

    return (
        <>
            <div className={styles.center}>
                <h1>Favourite</h1>
                <Link to="/">
                    <MDBBtn className={styles.backButton} >
                        Home
                    </MDBBtn>                
                </Link>

            </div>
            <MDBCol className={styles.imageContainer} >
                {favouriteBody}                
            </MDBCol>   
            
        </>
    )
}

export default Favourite
