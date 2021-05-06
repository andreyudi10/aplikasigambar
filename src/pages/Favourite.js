import React,{useEffect,useState} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdb-react-ui-kit';
import { useHistory, Link} from 'react-router-dom'

import styles from './Favourite.module.css'

const Favourite = () => {
    let history = useHistory()        
    const [favourite,setFavourite] = useState()
    
    useEffect(() => {
        // localStorage.getItem("data")
        console.log(JSON.parse(localStorage.getItem("favourite")))
        setFavourite(JSON.parse(localStorage.getItem("favourite")))

    }, [])
    // useEffect(,[favourite]

    // )

    const handleDetail = (e) => {
        console.log(e.target.getAttribute('fullUrl'))
        history.push(`./details/${e.target.getAttribute('id')}`)        
        // setDetail()
    }

    
    const handleUnFavourite = (e) =>{
        console.log(e.target.getAttribute('id'))
        const id = e.target.getAttribute('id')
        const result = favourite.filter((aray)=>aray.id!==id)        
        setFavourite(result)
        

    }

    const handleSaveStorage = () =>{
        localStorage.setItem("favourite",JSON.stringify(favourite))
    }

    const favouriteBody = favourite && favourite.filter((array)=>array.star===true).map((array,index)=>(                
        <MDBCard className={styles.card}>
            <MDBCardImage className="img-fluid" src={array.thumbnail}
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
                    <MDBBtn className={styles.backButton} onClick={handleSaveStorage}>
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
