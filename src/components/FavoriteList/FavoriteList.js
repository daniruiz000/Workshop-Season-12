import React from "react";
import Photo from "../Photo/Photo";
import { DataContext } from "../ImageBrowser/ImageBrowser";

const FavoriteList = () => {

    const dataInfo = React.useContext(DataContext)

    return (
        <>
            {dataInfo.favListReducer.listFavorite[0] ? <>
                <h3>Favoritos:</h3>
                <div className="image-browser__favorite-list">
                    {dataInfo.favListReducer.listFavorite.map(photo => <Photo key={photo.id} photo={photo} handleClick={dataInfo.deleteFavorite} />)}
                </div>
            </>
                : <p> No hay favoritos seleccionados...</p>}
        </>
    )
}

export default FavoriteList;