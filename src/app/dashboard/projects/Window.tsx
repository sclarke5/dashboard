import Modal from 'react-modal';
import styles from './Projects.module.scss';

const Window = ({ show, item, onClose }: {
  show: boolean,
  item: any,
  onClose: any
}) => {
  Modal.setAppElement('body')
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay} 
    >
      <div className="close-button-ctn">
        <h1 style={{ flex: '1 90%' }}>{item.title}</h1>
        <button className="close-btn" onClick={onClose}>X</button>
        <div>
          <h2>Description</h2>
          <p>{item.content}</p>
          <h2>Status</h2>
          <p>
            {item.icon} {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
          </p>
        </div>
      </div>
    </Modal>
  )
}

export { Window }