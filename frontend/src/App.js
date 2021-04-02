import { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import API_ROUTES from './api-routes';
import Loader from './components/Loader';
import Items from './components/Items';

/** @func App */
function App() {
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = function (ev) { console.log(ev); }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(
                    `${API_ROUTES.ITEM.ROOT}${API_ROUTES.ITEM.READ}`
                )
                setData(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

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

    /** 
     * r e n d e r    a p p
     */

    if (true === loading) {
        return <Loader />;
    }

    return (
        <Fragment>
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
                        onClick={e => handleItemSubmit(e, bc)}
                    >
                        <FontAwesomeIcon size="2x" className="plus-icon" icon={faPlus} />
                    </button>
                </div>
            </form>
            <Items items={data} />
        </Fragment>
    );
}

export default App;
