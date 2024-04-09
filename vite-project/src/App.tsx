import { useState } from "react";
import "./App.css";

const initialTowers: number[][] = [[1, 2, 3, 4, 5], [], []];
const NUM_DISCS: number = initialTowers[0].length;

function App(): JSX.Element {
  const [towers, setTowers] = useState<number[][]>(initialTowers);
  const [selectedTowerIndex, setSelectedTowerIndex] = useState<number | undefined>(undefined);

  function handleSelectedTower(clickedTowerIndex: number): void {
    if (selectedTowerIndex !== undefined) {
      const selectedTower: number[] = towers[selectedTowerIndex];
      const clickedTower: number[] = towers[clickedTowerIndex];

      if (selectedTower.length === 0) {
        alert("Selected tower has no discs.");
        return;
      }

      if (clickedTower.length > 0 && selectedTower[0] > clickedTower[0]) {
        alert("Cannot move a larger disc onto a smaller one.");
        return;
      }

      const newTowers: number[][] = towers.map((tower, index) => {
        switch (index) {
          case selectedTowerIndex:
            return tower.slice(1);
          case clickedTowerIndex:
            return [selectedTower[0], ...tower];
          default:
            return tower;
        }
      });

      setTowers(newTowers);
      setSelectedTowerIndex(undefined);

      if (newTowers[clickedTowerIndex].length === NUM_DISCS) {
        alert("Congratulations! You've solved the Towers of Hanoi.");
      }
    } else {
      setSelectedTowerIndex(clickedTowerIndex);
    }
  }

  return (
    <>
      <p>Click a tower to select the top disc, then click on another tower to move the disc. Click the selected tower again to unselect the disc.</p>
      <div className="towers">
        {towers.map((discs, index) => (
          <div
            className={"tower " + (selectedTowerIndex === index ? "selected" : "")}
            key={index}
            onClick={() => handleSelectedTower(index)}
          >
            <div className="line"></div>
            <div className="discs">
              {discs.map((disc, idx) => (
                <div
                  className="disc"
                  key={idx}
                  style={{
                    width: `${disc * 10 + 10}px`,
                    color: "green",
                    fontWeight: "bold"
                  }}
                >
                  {disc}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
