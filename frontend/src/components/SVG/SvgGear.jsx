import './svg.css';

const SvgGear = ({className="", label="Settings", nav=false}) => {
    return (
        <svg className={(nav ? 'navSvg ' : '') + `defaultSvg ${className}`} width="214" height="214" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label={label}>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M88 0H126V39.6093C131.359 41.1172 136.458 43.2472 141.213 45.9165L169.225 17.9045L196.095 44.7746L168.083 72.7866C170.753 77.542 172.883 82.6407 174.391 88H214V126H174.391C172.883 131.359 170.753 136.458 168.083 141.213L196.095 169.225L169.225 196.095L141.213 168.083C136.458 170.753 131.359 172.883 126 174.391V214H88V174.391C82.6406 172.883 77.542 170.753 72.7866 168.083L44.7747 196.095L17.9045 169.225L45.9165 141.213C43.2473 136.458 41.1174 131.359 39.6094 126H0V88H39.6094C41.1174 82.6407 43.2473 77.542 45.9165 72.7866L17.9045 44.7746L44.7747 17.9045L72.7866 45.9165C77.542 43.2472 82.6406 41.1172 88 39.6093V0ZM44.7747 26.3898L67.5513 49.1664C60.3389 54.0955 54.0957 60.3387 49.1665 67.5511L26.3899 44.7746L44.7747 26.3898ZM164.833 146.449C159.904 153.661 153.661 159.904 146.449 164.834L169.225 187.61L187.61 169.225L164.833 146.449ZM49.1665 146.449L26.3899 169.225L44.7747 187.61L67.5513 164.834C60.3389 159.904 54.0957 153.661 49.1665 146.449ZM164.833 67.5511L187.61 44.7746L169.225 26.3898L146.449 49.1664C153.661 54.0955 159.904 60.3387 164.833 67.5511ZM6 94H38.2048C37.4138 98.2124 37 102.558 37 107C37 111.442 37.4138 115.788 38.2048 120H6V94ZM177 107C177 111.442 176.586 115.788 175.795 120H208V94H175.795C176.586 98.2124 177 102.558 177 107ZM94 175.795V208H120V175.795C115.788 176.586 111.442 177 107 177C102.558 177 98.2124 176.586 94 175.795ZM120 38.2049C115.788 37.4138 111.442 37 107 37C102.558 37 98.2124 37.4138 94 38.2049V6H120V38.2049ZM107 170C141.794 170 170 141.794 170 107C170 72.2061 141.794 44 107 44C72.2061 44 44 72.2061 44 107C44 141.794 72.2061 170 107 170ZM136 107C136 123.016 123.016 136 107 136C90.9836 136 78 123.016 78 107C78 90.9837 90.9836 78 107 78C123.016 78 136 90.9837 136 107ZM107 131C120.255 131 131 120.255 131 107C131 93.7452 120.255 83 107 83C93.7451 83 83 93.7452 83 107C83 120.255 93.7451 131 107 131Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M88 0H126V39.6093C131.359 41.1172 136.458 43.2473 141.213 45.9165L169.225 17.9045L196.095 44.7746L168.083 72.7865C170.753 77.5419 172.883 82.6407 174.391 88H214V126H174.391C172.883 131.359 170.753 136.458 168.083 141.213L196.095 169.225L169.225 196.095L141.213 168.083C136.458 170.753 131.359 172.883 126 174.391V214H88V174.391C82.6407 172.883 77.5419 170.753 72.7865 168.083L44.7746 196.095L17.9045 169.225L45.9165 141.213C43.2473 136.458 41.1172 131.359 39.6093 126H0L3.32207e-06 88H39.6093C41.1173 82.6407 43.2473 77.5419 45.9165 72.7866L17.9046 44.7746L44.7746 17.9045L72.7866 45.9165C77.542 43.2473 82.6407 41.1172 88 39.6093V0ZM107 131C120.255 131 131 120.255 131 107C131 93.7452 120.255 83 107 83C93.7452 83 83 93.7452 83 107C83 120.255 93.7452 131 107 131Z"/>
        </svg>
    );
};

export default SvgGear;