import Modal from "react-modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

function RandomizerModal({ isModalOpen, setIsModalOpen }: Props) {
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Randomize Songs</h2>
        <p>This should allow you to choose a set of songs, based on filters</p>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
}

export default RandomizerModal;
