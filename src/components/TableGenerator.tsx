import { Dispatch, SetStateAction, useState } from "react";
import useTimeout from "../hooks/useTimeout";
import settings from "../settings";

interface Props {
  setHasGenerated: Dispatch<SetStateAction<boolean>>;
  tables: number;
  restart: () => void;
}

const generateTableNumber = (tables: number) => {
  const min = 1;
  const max = tables + 1;
  return Math.floor(Math.random() * (max - min) + min);
};

const TableGenerator = ({ tables, setHasGenerated, restart }: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);

  const stopGenerating = () => {
    setIsGenerating(false);
  };

  useTimeout(stopGenerating, 2000);

  if (isGenerating) return <div>Arvotaan pöytää...</div>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Rangaistuksen saa pöytä</div>
      <h2>{generateTableNumber(tables)}</h2>
     {/*  <button onClick={restart}>Restart</button> */}
      <button onClick={() => setHasGenerated(true)}>Arvo rangaistus</button>
    </div>
  );
};

export default TableGenerator;
