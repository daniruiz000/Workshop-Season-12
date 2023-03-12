import React from "react";
import { DataContext } from "../ImageBrowser/ImageBrowser";

const Controls = () => {

    const API_URL = 'https://api.pexels.com/v1/search?query=';
    const API_KEY = 'cdzDkd5FRRNU351MjDVARqDCqF3P9WXMsQYkveXKNel6L8TumpMNJXrn';

    const inputRef = React.useRef(null);

    const dataInfo = React.useContext(DataContext);
    
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
                    dataInfo.setImgList(data.photos)
                    dataInfo.setError(false)
                    
                } else {
                    dataInfo.setError(true)
                }
            });
    }

    return (

        <form onSubmit={(event) => callAPI(event)} className="image-browser__controls">
            <input ref={inputRef} type='text' placeholder='  Introduce el texto para buscar imagenes'></input>
            <button type='submit'>Buscar imagenes</button>
        </form>
    )
}

export default Controls;