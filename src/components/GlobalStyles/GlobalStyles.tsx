import PropTypes from 'prop-types';
import './GlobalStyles.scss';

function GlobalStyles({ children }:any) {
    return children;
}

GlobalStyles.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyles;
