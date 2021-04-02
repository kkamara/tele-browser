import { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrashAlt, 
    faPencilAlt,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

/** @const {func} Items */
const Items = ({ items, broadcastChannel }) => {
    const [modelOpen, setModelOpen] = useState(false);
    const [itemEditing, setItemEditing] = useState(null);

    /** 
    * @const handleDeleteItem 
    * @param {event} e
    * @param {BroadcastChannel} bc
    */
    const handleDeleteItem = (e, bc) => {
        console.log('in item delete handler');
    }

    /** 
    * @const handleEditItem 
    * @param {event} e
    * @param {BroadcastChannel} bc
    * @param {item} item
    */
    const handleEditItem = (e, bc, item) => {
        e.preventDefault();
        console.log('in item edit handler');
        setModelOpen(true);
        setItemEditing(item);
    }

    const handleModalClose = () => {
        setModelOpen(false);
        setItemEditing(null);
    }
    
    return (
        <div id="item-container" className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
                                        onClick={e => handleDeleteItem(e, broadcastChannel)}
                                    />
                                </button>
                                <button className="ml-2">
                                    <FontAwesomeIcon 
                                        size="2x" 
                                        className="pencil-alt-icon" 
                                        icon={faPencilAlt} 
                                        onClick={e => handleEditItem(e, broadcastChannel, {name, name_slug})}
                                    />
                                </button>
                            </div>
                        </div>
                </div>
            ))}
            <Modal
                isOpen={modelOpen}
                onRequestClose={handleModalClose}
                style={customStyles}
                contentLabel="Edit Item"
            >
                <h2 className="text-center">Edit Item</h2>
                <hr/>
                <form className="max-w-md mx-auto">
                    <div className="md:flex">
                        <label 
                            htmlFor="name"
                            className="mt-2"
                        >
                            Name:
                        </label>
                        <input 
                            minLength={3}
                            maxLength={20}
                            name="name" 
                            type="text" 
                            className="rounded text-pink-500 ml-10"
                            value={itemEditing ? itemEditing.name : ''}
                            onChange={e => console.log(e)}
                        />
                        <button 
                            className='ml-10'
                            onClick={e => handleEditItem(e, broadcastChannel)}
                        >
                            <FontAwesomeIcon 
                                size="2x" 
                                className="check-circle-icon" 
                                icon={faCheckCircle} 
                            />
                        </button>
                    </div>
                </form>
                <div>
                    <button 
                        className="close-modal-btn float-left"
                        onClick={handleModalClose}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Items;
