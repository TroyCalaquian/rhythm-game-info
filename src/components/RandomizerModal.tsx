import Modal from "react-modal";

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
}

function RandomizerModal({
  isModalOpen,
  setIsModalOpen,
  selectedClass,
  setSelectedClass,
}: Props) {

  const classFaceValues = {
    "1": ["10", "10+", "11"], // Class "i"
    "2": ["11+", "12", "12+"], // Class "ii"
    "3": ["12+", "13", "13+"], // Class "iii"
    "4": ["13+", "14", "14+"], // Class "iv"
    "5": ["14", "14+", "15"], // Class "v"
    "6": ["14+", "15", "15+"], // Class "INF"
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Randomizer Modal"
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

        <div style={{ marginTop: "20px" }}>
          <p>
            <strong>Select Class:</strong>
          </p>
          <div>
            {/* i: 10 - 11 . ii: 11+ - 12+ . iii: 12+ - 13+ . iv: 13+ - 14+ . v: 14 - 15 . INF: 14+ - 15+ */}
            {[
              { label: "i", value: "1" },
              { label: "ii", value: "2" },
              { label: "iii", value: "3" },
              { label: "iv", value: "4" },
              { label: "v", value: "5" },
              { label: "INF", value: "6" },
            ].map((item) => (
              <label key={item.value} style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  name="courseClass"
                  value={item.value}
                  checked={selectedClass === item.value}
                  onChange={(e) => setSelectedClass(e.target.value)}
                />{" "}
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            id="randomOmnimixFilter">
          </input>
          <label htmlFor="checkmarkFilter" style={{ marginLeft: "8px" }}>
            Include Omnimix Songs
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <a
            className="btn btn-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </a>
          {/* Pretty sure the functionality of random goes here */}
          <a
            className="btn btn-primary"
            onClick={() => {
              console.log("Randomizing with class:", selectedClass);
              setIsModalOpen(false);
            }}
          >
            Randomize
          </a>
        </div>
      </Modal>
    </>
  );
}

export default RandomizerModal;
