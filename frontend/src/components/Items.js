import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Items = ({ items }) => (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        {items.map(({name, name_slug}) => (
                <div key={name_slug} className="p-8">
                    <div 
                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold grid grid-cols-10"
                    >
                        <div className="col-span-9">{name}</div>
                        <div className="col-end">
                            <button>
                                <FontAwesomeIcon 
                                    size="2x" 
                                    className="trash-alt-icon" 
                                    icon={faTrashAlt} 
                                />
                            </button>
                            <button className="ml-2">
                                <FontAwesomeIcon 
                                    size="2x" 
                                    className="pencil-alt-icon" 
                                    icon={faPencilAlt} 
                                />
                            </button>
                        </div>
                    </div>
            </div>
        ))}
    </div>
);

export default Items;
