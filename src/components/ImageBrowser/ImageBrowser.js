import './ImageBrowser.css'
import React from 'react'
import { ThemeContext } from '../../App';
import Controls from '../Controls/Controls';
import ImageList from '../ImageList/ImageList';
import FavoriteList from '../FavoriteList/FavoriteList';

export const DataContext = React.createContext();

//elementos del useReducer

let initialArg = { listFavorite: [] };

const backupstate = window.localStorage.getItem('STATE')
if (backupstate !== null) {
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

    const theme = React.useContext(ThemeContext);

    const [imgList, setImgList] = React.useState([])
    const [error, setError] = React.useState(false)

    const [favListReducer, dispatch] = React.useReducer(reducer, initialArg);

    const orderList = (list) => {
        const newList = list.sort((a, b) => {
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

    const addFavorite = React.useCallback((newPhoto) => {
        const payload = newPhoto
        dispatch({ type: 'ADD_FAVORITE', payload })
    }, [])

    const deleteFavorite = React.useCallback((newPhoto) => {
        const payload = newPhoto
        dispatch({ type: 'DELETE_FAVORITE', payload })
    }, [])

    const dataContext = {

        'imgList': imgList,
        'setImgList': setImgList,
        'error': error,
        'setError': setError,
        'favListReducer': favListReducer,
        'addFavorite': addFavorite,
        'deleteFavorite' : deleteFavorite,
        'orderListMemo': orderListMemo,
    }

    return (
        
        <DataContext.Provider value={dataContext}>
            <div className="image-browser " style={{ background: theme.background, color: theme.fontColor }}>
                <Controls />
                <ImageList/>
                <FavoriteList/>
            </div>
        </DataContext.Provider>
    )
}

export default ImageBrowser;