import React from "react";
import Photo from "../Photo/Photo";
import { DataContext } from "../ImageBrowser/ImageBrowser";


const ImageList = () => {

    const dataInfo = React.useContext(DataContext)

    return (
        <>
            {dataInfo.error ?
                <p>No hay imagenes para la busqueda</p>
                : dataInfo.imgList[0] ?
                    <>
                        <h3>Resultados de la busqueda:</h3>
                        <div className="image-browser__photo-list">
                            {dataInfo.orderListMemo.map(photo => <Photo key={photo.id} photo={photo} handleClick={dataInfo.addFavorite} />)}
                        </div>
                    </>
                    : <p>Introduce tu busqueda ...</p>}
        </>
    )
}

export default ImageList;