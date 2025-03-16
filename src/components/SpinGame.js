import React, { useState } from "react";
import "./SpinGame.css";


export default function SpinWheel() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize] = useState(null);
  const prizes = ["10% Off", "15% Off", "5% Off", "❌ Try Again"];
  
  const [play] = useSound(spinSound, { volume: 0.5 });

  const handleSpin = () => {
    if (spinning) return;
    
    setSpinning(true);
    play(); // Play spin sound
    
    const randomDegree = 3600 + Math.floor(Math.random() * 360);
    setRotation(randomDegree);

    setTimeout(() => {
      const index = Math.floor(((randomDegree % 360) / 90) % prizes.length);
      setPrize(prizes[index]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <div className="spin-container">
      <div className="wheel-container">
        <div 
          className={`wheel ${spinning ? "spinning" : ""}`} 
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="slice slice1">10% Off</div>
          <div className="slice slice2">15% Off</div>
          <div className="slice slice3">5% Off</div>
          <div className="slice slice4">❌ Try Again</div>
        </div>
        <button className="spin-btn" onClick={handleSpin} disabled={spinning}>
          🔄 Spin Now
        </button>
      </div>
      {prize && (
        <div className="prize-display">
          {prize.includes("❌") ? "😞 Try Again!" : `🎉 ${prize} 🎉`}
        </div>
      )}
    </div>
  );
}
