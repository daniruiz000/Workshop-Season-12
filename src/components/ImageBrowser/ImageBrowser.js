import './ImageBrowser.css'
import React from 'react'
import Photo from '../Photo/Photo';
import { ThemeContext } from '../../App';



//elementos del useReducer

let initialArg = { listFavorite: [] };

const backupstate = window.localStorage.getItem('STATE')
if (backupstate !== null ){
    initialArg = JSON.parse(backupstate) 
} 

const reducer = (state, action) => {

    const newState = { ...state }

    switch (action.type) {

        case 'ADD_FAVORITE':

            const coincidence = state.listFavorite.filter(photo => photo.id === action.payload.id)

            if (!coincidence[0]) {
                newState.listFavorite = [...newState.listFavorite, action.payload]
            }
            break;

        case 'DELETE_FAVORITE':

            newState.listFavorite = newState.listFavorite.filter(photo => photo.id !== action.payload.id)

            break;

        default:
            break;
    }
    window.localStorage.setItem('STATE', JSON.stringify(newState))
    return newState
}

//Componente

const ImageBrowser = () => {

    const API_URL = 'https://api.pexels.com/v1/search?query=';
    const API_KEY = 'cdzDkd5FRRNU351MjDVARqDCqF3P9WXMsQYkveXKNel6L8TumpMNJXrn'

    const inputRef = React.useRef(null)

    const [imgList, setImgList] = React.useState([])
    const [error, setError] = React.useState(false)
    
 
    const theme = React.useContext(ThemeContext);

    const [favListReducer, dispatch] = React.useReducer(reducer, initialArg);

    const callAPI = (event) => {
        event.preventDefault()

        const options = {
            headers: {
                'Authorization': `${API_KEY}`
            }
        };

        const finalUrl = `${API_URL}${inputRef.current.value}`;

        fetch(finalUrl, options)
            .then(response => response.json())
            .then(data => {
                if (data.photos[0]) {
                    setImgList(data.photos)
                    setError(false)
                    
                } else {
                    setError(true)
                }
            });
    }

    const orderList = (list)=>{
        const newList = list.sort((a,b) => {
            if (a.alt > b.alt) {
                return 1;
              }
              if (a.alt < b.alt) {
                return -1;
              }
     
              return 0;

        })
        return newList
    }

    const orderListMemo = React.useMemo(() => orderList(imgList), [imgList]);


    const addFavorite = (newPhoto) => {
        const payload = newPhoto
        dispatch({ type: 'ADD_FAVORITE', payload })
    }

    const deleteFavorite = (newPhoto) => {
        const payload = newPhoto
        dispatch({ type: 'DELETE_FAVORITE', payload })
    }

    return (

            <div className="image-browser " style={{ background: theme.background, color: theme.fontColor }}>

                <form onSubmit={(event) => callAPI(event)} className="image-browser__controls">
                    <input ref={inputRef} type='text' placeholder='  Introduce el texto para buscar imagenes'></input>
                    <button type='submit'>Buscar imagenes</button>
                   
                </form>

                {error ?
                    <p>No hay imagenes para la busqueda</p>
                    : imgList[0] ?
                        <>
                            <h3>Resultados de la busqueda:</h3>
                            <div className="image-browser__photo-list">
                                {orderListMemo.map(photo => <Photo key={photo.id} photo={photo} handleClick={addFavorite} />)}
                            </div>
                        </>
                        : <p>Introduce tu busqueda ...</p>}


                {favListReducer.listFavorite[0] ? <>
                    <h3>Favoritos:</h3>
                    <div className="image-browser__favorite-list">
                        {favListReducer.listFavorite.map(photo => <Photo key={photo.id} photo={photo} handleClick={deleteFavorite} />)}
                    </div>
                </>
                    : <p> No hay favoritos seleccionados...</p>}

            

            </div>
      
    )
}
export default ImageBrowser;