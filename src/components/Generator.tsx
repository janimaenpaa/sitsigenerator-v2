import { useState } from "react";
import { Punishment, Settings } from "../types";
import PunishmentGenerator from "./PunishmentGenerator";
import TableGenerator from "./TableGenerator";

interface Props {
  restart: () => void;
  usedPunishments: Punishment[];
  unUsedPunishments: Punishment[];
  settings: Settings;
  setTables: React.Dispatch<React.SetStateAction<number[]>>;
  tables: number[];
}

const Generator = ({
  usedPunishments,
  unUsedPunishments,
  tables,
  setTables,
  restart,
}: Props) => {
  const [isGeneratingTable, setIsGeneratingTable] = useState(true);
  const [isGeneratingPunishment, setIsGeneratingPunishment] = useState(false);
  const [tableHasGenerated, setTableHasGenerated] = useState(false);
  const [PunishmentHasGenerated, setPunishmentHasGenerated] = useState(false);

  if (!tableHasGenerated)
    return (
      <TableGenerator
        setHasGenerated={setTableHasGenerated}
        tables={tables}
        setTables={setTables}
        restart={restart}
      />
    );

  if (!PunishmentHasGenerated)
    return (
      <PunishmentGenerator
        usedPunishments={usedPunishments}
        unUsedPunishments={unUsedPunishments}
        restart={restart}
      />
    );

  return <div></div>;
};

export default Generator;
