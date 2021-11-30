import { useState } from "react";
import settings from "../settings";
import { Punishment } from "../types";
import PunishmentGenerator from "./PunishmentGenerator";
import TableGenerator from "./TableGenerator";

interface Props {
  restart: () => void;
  usedPunishments: Punishment[];
  unUsedPunishments: Punishment[];
}

const Generator = ({ usedPunishments, unUsedPunishments, restart }: Props) => {
  const [isGeneratingTable, setIsGeneratingTable] = useState(true);
  const [isGeneratingPunishment, setIsGeneratingPunishment] = useState(false);
  const [tableHasGenerated, setTableHasGenerated] = useState(false);
  const [PunishmentHasGenerated, setPunishmentHasGenerated] = useState(false);
  const { tables, punishments } = settings;

  if (!tableHasGenerated)
    return (
      <TableGenerator
        setHasGenerated={setTableHasGenerated}
        tables={tables}
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
