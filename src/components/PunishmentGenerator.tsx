import { useState } from "react";
import useCounter from "../hooks/useCounter";
import useTimeout from "../hooks/useTimeout";
import { Punishment } from "../types";

interface Props {
  punishments: Punishment[];
}

const generatePunishment = (punishments: Punishment[]) => {
  const min = 0;
  const max = punishments.length;
  return punishments[Math.floor(Math.random() * (max - min) + min)].description;
};

const PunishmentGenerator = ({ punishments }: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const { count, setCount, increment, reset } = useCounter();

  const stopGenerating = () => {
    setIsGenerating(false);
  };

  useTimeout(stopGenerating, 2000);

  if (isGenerating) return <div>Arvotaan rangaistusta...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        width: "50%",
      }}
    >
      <h2>Rangaistus</h2>
      <p>{generatePunishment(punishments)}</p>
      <button onClick={increment}>Restart</button>
    </div>
  );
};

export default PunishmentGenerator;
