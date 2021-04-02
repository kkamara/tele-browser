import { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faTrashAlt, 
    faPencilAlt,
    faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

/** @const {object} modalEditItemStyles */
const modalEditItemStyles = {
    content : {
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
    }
};

/** @const {object} modalDelItemStyles */
const modalDelItemStyles = {
    content : {
        width: 460,
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

/** @const {func} Items */
const Items = ({ items, broadcastChannel }) => {
    const [editItemModalOpen, setEditItemModalOpen] = useState(false);
    const [delItemModalOpen, setDelItemModalOpen] = useState(false);
    const [deleteChoice, setDeleteChoice] = useState("n");
    const [itemEditing, setItemEditing] = useState(null);
    const [itemDeleting, setItemDeleting] = useState(null);

    /** 
    * @const setItemEditingName 
    * @param {event} e
    */
    const setItemEditingName = name => {
        setItemEditing({
            name,
            name_slug: itemEditing.name_slug,
        });
    }

    /** 
    * @const handleDeleteItem 
    * @param {event} e
    * @param {BroadcastChannel} bc
    * @param {item} item
    */
    const handleDeleteItem = (e, bc, item) => {
        console.log('in item delete handler');
        setItemDeleting(item);
        setDelItemModalOpen(true);
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
        setEditItemModalOpen(true);
        setItemEditing(item);
    }

    /** @const handleEditModalClose */
    const handleEditModalClose = () => {
        setEditItemModalOpen(false);
        setItemEditing(null);
    }

    /** @const handleDeleteModalClose */
    const handleDeleteModalClose = () => {
        setEditItemModalOpen(false);
        setDelItemModalOpen(null);
        setDeleteChoice("n");
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
                                        onClick={e => handleDeleteItem(e, broadcastChannel, {name, name_slug})}
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
                isOpen={editItemModalOpen}
                onRequestClose={handleEditModalClose}
                style={modalEditItemStyles}
                contentLabel="Editing Item"
            >
                <h2 className="text-center text-2xl">Editing {itemEditing && itemEditing.name}</h2>
                <hr />
                <form className="pt-3 pb-5 max-w-md mx-auto">
                    <div className="md:auto">
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
                            onChange={e => setItemEditingName(e.target.value)}
                        />
                    </div>
                </form>
                <hr className="pt-5" />
                <div>
                    <button 
                        className="close-modal-btn float-left"
                        onClick={handleEditModalClose}
                    >
                        Close
                    </button>
                    <button 
                        className='float-right'
                        onClick={e => handleEditItem(e, broadcastChannel)}
                    >
                        <FontAwesomeIcon 
                            size="2x" 
                            className="check-circle-icon" 
                            icon={faCheckCircle} 
                        />
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={delItemModalOpen}
                onRequestClose={handleDeleteModalClose}
                style={modalDelItemStyles}
                contentLabel="Deleting Item"
            >
                <h2 className="text-center text-2xl">Deleting {itemDeleting && itemDeleting.name}</h2>
                <hr />
                <form className="pt-3 pb-5 max-w-md mx-auto">
                    <div className="flex-auto">
                        <label 
                            htmlFor="name"
                            className="mt-2"
                        >
                            Are you sure you want to delete this item?
                        </label>
                        <input 
                            onChange={e => setDeleteChoice(e.target.value, broadcastChannel)}
                            value={deleteChoice}
                            className="ml-5" 
                            type="radio" 
                            id="yes" 
                            name="choice" 
                            value="y"
                        />
                        <label htmlFor="yes">Yes</label>
                        <input 
                            onChange={e => setDeleteChoice(e.target.value, broadcastChannel)}
                            value={deleteChoice}
                            className="ml-5" 
                            type="radio" 
                            id="no" 
                            name="choice" 
                            value="n"
                        />
                        <label htmlFor="no">No</label>
                    </div>
                </form>
                <hr className="pt-5" />
                <div>
                    <button 
                        className="close-modal-btn float-left"
                        onClick={handleDeleteModalClose}
                    >
                        Close
                    </button>
                    <button 
                        className='float-right'
                        onClick={e => handleEditItem(e, broadcastChannel)}
                    >
                        <FontAwesomeIcon 
                            size="2x" 
                            className="check-circle-icon" 
                            icon={faCheckCircle} 
                        />
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Items;
