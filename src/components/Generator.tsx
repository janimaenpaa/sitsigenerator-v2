import { useState } from "react";
import settings from "../settings";
import PunishmentGenerator from "./PunishmentGenerator";
import TableGenerator from "./TableGenerator";

interface Props {
  restart: () => void;
}

const Generator = (props: Props) => {
  const [isGeneratingTable, setIsGeneratingTable] = useState(true);
  const [isGeneratingPunishment, setIsGeneratingPunishment] = useState(false);
  const [tableHasGenerated, setTableHasGenerated] = useState(false);
  const [PunishmentHasGenerated, setPunishmentHasGenerated] = useState(false);
  const { tables, punishments } = settings;

  if (!tableHasGenerated)
    return (
      <TableGenerator setHasGenerated={setTableHasGenerated} tables={tables} restart={props.restart} />
    );

  if (!PunishmentHasGenerated)
    return <PunishmentGenerator punishments={punishments} />;

  return <div></div>;
};

export default Generator;
