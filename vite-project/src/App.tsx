import { useState } from "react";
import "./App.css";

const initialTowers: number[][] = [[1, 2, 3, 4, 5], [], []];
const NUM_DISCS: number = initialTowers[0].length;

function App(): JSX.Element {
  const [towers, setTowers] = useState<number[][]>(initialTowers);
  const [selectedTowerIndex, setSelectedTowerIndex] = useState<
    number | undefined
  >();

  function handleSelectedTower(clickedTowerIndex: number): void {
    if (selectedTowerIndex === undefined) {
      setSelectedTowerIndex(clickedTowerIndex);
      return;
    }

    const selectedTower: number[] = towers[selectedTowerIndex];
    const clickedTower: number[] = towers[clickedTowerIndex];

    if (selectedTower.length === 0) {
      setSelectedTowerIndex(undefined);
      return;
    }

    if (selectedTower[0] > (clickedTower[0] ?? Infinity)) {
      setSelectedTowerIndex(clickedTowerIndex);
      alert(`Can't put bigger disc above smaller one`);
      return;
    }

    const newTowers: number[][] = [...towers];
    const shiftedDisc: number = newTowers[selectedTowerIndex].shift()!;
    newTowers[clickedTowerIndex].unshift(shiftedDisc);
    setTowers(newTowers);
    setSelectedTowerIndex(undefined);

    if (clickedTower.length >= NUM_DISCS && towers[0] !== initialTowers[0]) {
      alert(`You win!`);
    }
  }


  return (
    <><p>Click a tower to select top dic, click on another tower to move disc. Click selected tower again to unselect the disc</p>
      <div className="towers">
        {towers.map((discs, index) => (
          <div
            className={
              "tower " + (selectedTowerIndex === index ? "selected" : "")
            }
            key={index}
            onClick={() => handleSelectedTower(index)}
          >
            <div className="line"></div>
            <div className="discs">
              {discs.map((disc, index) => (
                <div
                  className="disc"
                  key={index}
                  style={{
                    width: `${disc * 10 + 10}px`,
                    color: `green`,
                    fontWeight: `bold`,
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
