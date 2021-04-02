import react, { Fragment } from 'react';

import { APP_URL } from './constants';
import Loader from './components/Loader';

const handleButtonClick = (e, bc) => {
    console.log('in button click handler');
    bc.postMessage('This is a test message.');
};

function App() {
    const bc = new BroadcastChannel('test_channel');
    bc.onmessage = function (ev) { console.log(ev); }

    return (
        <Fragment>
            <Loader />
            <button 
                onClick={e => handleButtonClick(e, bc)}
                className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            >
                Click me
            </button>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
                        <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
                        <p className="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
