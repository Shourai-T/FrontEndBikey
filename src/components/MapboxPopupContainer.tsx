import ReactDOM from 'react-dom';

interface MapboxPopupContainerProps {
  children: React.ReactNode;
  container: HTMLElement;
}

const MapboxPopupContainer: React.FC<MapboxPopupContainerProps> = ({ children, container }) => {
  return ReactDOM.createPortal(children, container);
};

export default MapboxPopupContainer;
