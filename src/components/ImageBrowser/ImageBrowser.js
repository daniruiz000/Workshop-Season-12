import './ImageBrowser.css'
import React from 'react'
import Photo from '../Photo/Photo';

const ImageBrowser = () => {

    const API_URL = 'https://api.pexels.com/v1/search?query=';
    const API_KEY = 'cdzDkd5FRRNU351MjDVARqDCqF3P9WXMsQYkveXKNel6L8TumpMNJXrn'

    const inputRef = React.useRef(null)

    const [imgList, setImgList] = React.useState([])
    const [favoriteList, setFavoriteList] = React.useState([])

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
                setImgList(data.photos)
            });
    }

    const addFavorite = (newPhoto) => {

        const newList = [...favoriteList, newPhoto]
        setFavoriteList(newList)
    }

    const deleteFavorite = (newPhoto) => {

        const newList = favoriteList.filter(photo => photo.id !== newPhoto.id)
        setFavoriteList(newList)
    }

    return (
        <div className="app" >
            <div>
                <input ref={inputRef} type='text' placeholder='  Introduce el texto para buscar imagenes'></input>
                <button onClick={() => callAPI(inputRef.current.value)}>Buscar imagenes</button>
                <button>Cambiar Tema</button>

            </div>

            {imgList[0] ?
                <div>
                    <h3>Listado de fotos:</h3>
                    {imgList.map(photo => {
                        return (
                            <Photo key = {photo.id} photo= {photo} handleClick = {addFavorite}/>
                        )
                    })}
                </div>
                : <p>Introduce tu imagen ...</p>}

            {favoriteList[0] ?
                <div>
                    <h3>Favoritos:</h3>
                    {favoriteList.map(photo => {
                        return (
                            <Photo key = {photo.id} photo= {photo} handleClick = {deleteFavorite}/>
                        )
                    })}
                </div>
                : <p> No hay favoritos...</p>}

        </div>
    )
}
export default ImageBrowser;