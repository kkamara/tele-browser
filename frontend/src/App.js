import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { APP_URL } from './constants';
import Loader from './components/Loader';

function App() {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = function (ev) { console.log(ev); }

    /** 
     * @const closeBCConnection 
     * @param {event} e
     * @param {BroadcastChannel} bc
     */
    const closeBCConnection = (e, bc) => {
        console.log('in button click handler', e, bc);
        // bc.postMessage('This is a test message.');
        bc.close();
    };
    
    /** 
    * @const handleItemSubmit 
    * @param {event} e
    * @param {BroadcastChannel} bc
    */
    const handleItemSubmit = (e, bc) => {
        console.log('in item submit handler');
    }

    /** render */
    return (
        <Fragment>
            <Loader />
            <button 
                onClick={e => closeBCConnection(e, bc)}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
                Close connection
            </button>
            <form className="max-w-md mx-auto">
                <div className="md:flex">
                    <label 
                        htmlFor="name"
                        className="mt-2"
                    >
                        Name:
                    </label>
                    <input 
                        name="name" 
                        type="text" 
                        className="rounded text-pink-500 ml-10"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <button 
                        className='ml-10'
                        onClick={e => handleItemSubmit(e, bc)}
                    >
                        <FontAwesomeIcon size="2x" className="plus-icon" icon={faPlus} />
                    </button>
                </div>
            </form>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div 
                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold grid grid-cols-10"
                    >
                        <div className="col-span-8" >Case study</div>
                        <div className="col-end">
                            <button>
                                <FontAwesomeIcon size="2x" className="trash-alt-icon" icon={faTrashAlt} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
