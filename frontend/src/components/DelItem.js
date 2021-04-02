import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

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

/** @const {func} DelItem */
const DelItem = ({
    delItemModalOpen,
    handleDeleteModalClose,
    itemDeleting,
    handleDelSubmit,
    setDeleteChoice,
}) => (
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
                    onChange={e => setDeleteChoice(e.target.value)}
                    value="y"
                    className="ml-5" 
                    type="radio" 
                    id="yes" 
                    name="choice" 
                />
                <label htmlFor="yes">Yes</label>
                <input 
                    onChange={e => setDeleteChoice(e.target.value)}
                    value="n"
                    className="ml-5" 
                    type="radio" 
                    id="no" 
                    name="choice" 
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
                onClick={async () => handleDelSubmit()}
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

export default DelItem;
