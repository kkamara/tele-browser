import PulseLoader from "react-spinners/PulseLoader";

const Loader = ({ classes }) => (
    <div className={`${classes && typeof classes === 'string' ? classes : ''} loader`}>
        <PulseLoader color='#008080' />
    </div>
);

export default Loader;
