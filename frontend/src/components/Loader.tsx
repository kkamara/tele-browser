import PulseLoader from "react-spinners/PulseLoader";
import { RouteComponentProps } from "react-router";

type Props = {
    classes?: string,
};

const Loader = ({ classes }: Props) => (
    <div className={`${classes && typeof classes === 'string' ? classes : ''} loader`}>
        <PulseLoader color='#008080' />
    </div>
);

export default Loader;
