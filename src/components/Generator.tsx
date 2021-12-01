import { Dispatch, useState } from "react";
import { Punishment, Settings } from "../types";
import PunishmentGenerator from "./PunishmentGenerator";
import TableGenerator from "./TableGenerator";

interface Props {
  restart: () => void;
  punishments: Punishment[];
  setPunishments: Dispatch<React.SetStateAction<Punishment[]>>;
  settings: Settings;
  setTables: Dispatch<React.SetStateAction<number[]>>;
  tables: number[];
}

const Generator = ({
  punishments,
  setPunishments,
  tables,
  setTables,
  restart,
}: Props) => {
  const [isGeneratingTable, setIsGeneratingTable] = useState(true);
  const [isGeneratingPunishment, setIsGeneratingPunishment] = useState(false);
  const [tableHasGenerated, setTableHasGenerated] = useState(false);
  const [PunishmentHasGenerated, setPunishmentHasGenerated] = useState(false);

  console.log({ punishments });

  if (!tableHasGenerated)
    return (
      <TableGenerator
        setHasGenerated={setTableHasGenerated}
        tables={tables}
        setTables={setTables}
      />
    );

  if (!PunishmentHasGenerated)
    return (
      <PunishmentGenerator
        punishments={punishments}
        setPunishments={setPunishments}
        restart={restart}
      />
    );

  return <div></div>;
};

export default Generator;
