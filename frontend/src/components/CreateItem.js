import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreateItem = ({
    name,
    setName,
    handleItemSubmit,
}) => (
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
                onChange={e => setName(e.target.value)}
                value={name}
            />
            <button 
                className='ml-10'
                onClick={async e => handleItemSubmit(e)}
            >
                <FontAwesomeIcon size="2x" className="plus-icon" icon={faPlus} />
            </button>
        </div>
    </form>
);

export default CreateItem;
