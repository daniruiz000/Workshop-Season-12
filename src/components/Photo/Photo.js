

const Photo = (props) => {

    return (
        <div className="photo" key={props.photo.id}>
            <img onClick={() => props.handleClick(props.photo)} src={props.photo.src.small} alt={props.photo.alt} />
            <p>{props.photo.alt}</p>
        </div>
    )
}

export default Photo;