function Card(props) {
    return (
        <div className="flex flex-col justify-center items-center border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            {/* Image */}
            <img src={props.image} alt={props.title} className="w-16 h-16 mb-4" />
            
            {/* Title */}
            <h2 className="text-lg font-semibold text-center">{props.title}</h2>
        </div>
    );
}

export default Card;