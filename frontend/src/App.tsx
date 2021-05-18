import {
    Fragment,
    useState,
    useEffect,
} from 'react';
import axios from 'axios';

import API_ROUTES from './api-routes';
import Loader from './components/Loader';
import Items from './components/Items';
import CreateItem from './components/CreateItem';

/** @func App */
function App() {
    const [data, setData] = useState(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    /**
     * @const {BroadcastChannel} bc
     * @param {MessageEvent} event
     */
    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = function (event) {
        setData(event.data);
    }

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
    * @const handleItemSubmit
    * @param {event} e
    */
    const handleItemSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${API_ROUTES.ITEM.ROOT}${API_ROUTES.ITEM.CREATE}`,
                { name }
            );
            setData(data => {
                const newData = [ ...data, res.data ];
                bc.postMessage(newData);
                return newData;
            });
            setName("");
        } catch (err) {
            console.log(err);
            alert(JSON.stringify(err.response.data));
            setName("");
        }
    }

    /**
     * r e n d e r    a p p
     */

    if (true === loading) {
        return <Loader />;
    }

    return (
        <Fragment>
            <CreateItem
                name={name}
                setName={setName}
                handleItemSubmit={handleItemSubmit}
            />
            <Items
                items={data}
                setItems={setData}
                broadcastChannel={bc}
            />
        </Fragment>
    );
}

export default App;
