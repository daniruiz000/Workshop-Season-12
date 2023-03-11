import './ImageBrowser.css'
import React from 'react'
import Photo from '../Photo/Photo';

//elementos del use reducer

const initialArg = {listFavorite:[]};

const reducer = (state, action)=>{

    const newState = {...state}

    switch (action.type) {

        case 'ADD_FAVORITE':
            
        const coincidence = state.listFavorite.filter(photo => photo.id === action.payload.id)

        if (!coincidence[0]) {
            newState.listFavorite = [...newState.listFavorite, action.payload]
        }
            break;

        case 'DELETE_FAVORITE':
            
        newState.listFavorite =  newState.listFavorite.filter(photo => photo.id !== action.payload.id)
  
        break;

        default:
            break;
    }
    return newState
}

//Componente

const ImageBrowser = () => {

    const API_URL = 'https://api.pexels.com/v1/search?query=';
    const API_KEY = 'cdzDkd5FRRNU351MjDVARqDCqF3P9WXMsQYkveXKNel6L8TumpMNJXrn'

    const inputRef = React.useRef(null)

    const [imgList, setImgList] = React.useState([])
    const [favoriteList, setFavoriteList] = React.useState([])
    const[error, setError] = React.useState(false)

    const [favList, dispatch] = React.useReducer(reducer, initialArg);

    const callAPI = (text) => {

        const options = {
            headers: {
                'Authorization': `${API_KEY}`
            }
        };

        const finalUrl = `${API_URL}${text}`;

        fetch(finalUrl, options)
            .then(response => response.json())
            .then(data => {
                if(data.photos[0]){
                setImgList(data.photos)
                }else{
                    setError(true)
                }
            });
    }

    const addFavorite = (newPhoto) => {

        const coincidence = favoriteList.filter(photo => photo.id === newPhoto.id)

        if (!coincidence[0]) {
            const newList = [...favoriteList, newPhoto]
            setFavoriteList(newList)
        }
    }

    const deleteFavorite = (newPhoto) => {

        const newList = favoriteList.filter(photo => photo.id !== newPhoto.id)
        setFavoriteList(newList)
    }

    return (
        <div className="image-browser" >

            <div className="image-browser__controls">
                <input ref={inputRef} type='text' placeholder='  Introduce el texto para buscar imagenes'></input>
                <button onClick={() => callAPI(inputRef.current.value)}>Buscar imagenes</button>
                <button>Cambiar Tema</button>
            </div>
            
            {imgList[0] ? <>
                <h3>Resultados de la busqueda:</h3>
                <div className="image-browser__photo-list">
                    {imgList.map(photo => <Photo key={photo.id} photo={photo} handleClick={addFavorite} />)}
                </div>
            </>
                : <p>Introduce tu imagen ...</p>}

            {favoriteList[0] ?<>
                <h3>Favoritos:</h3>
                <div className="image-browser__favorite-list">
                    {favoriteList.map(photo => <Photo key={photo.id} photo={photo} handleClick={deleteFavorite} />)}
                </div>
            </>
                : <p> No hay favoritos seleccionados...</p>}

        </div>
    )
}
export default ImageBrowser;