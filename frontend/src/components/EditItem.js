import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

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

const EditItem = ({
    editItemModalOpen,
    handleEditModalClose,
    itemEditing,
    setItemEditingName,
    handleEditSubmit,
}) => (
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
                onClick={handleEditSubmit}
            >
                <FontAwesomeIcon 
                    size="2x" 
                    className="check-circle-icon" 
                    icon={faCheckCircle} 
                />
            </button>
        </div>
    </Modal>
);

export default EditItem;
