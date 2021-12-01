import { Button, Title } from "@mantine/core";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import useTimeout from "../hooks/useTimeout";

interface Props {
  setHasGenerated: Dispatch<SetStateAction<boolean>>;
  tables: number[];
  setTables: Dispatch<React.SetStateAction<number[]>>;
}

const generateTableNumber = (tables: number[]) => {
  return tables[Math.floor(Math.random() * tables.length)];
};

const TableGenerator = ({
  tables,
  setTables,
  setHasGenerated,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedTable, setGeneratedTable] = useState<number | null>(null);

  const stopGenerating = () => {
    const table = generateTableNumber(tables);
    setTables(tables.filter((t) => table !== t));
    setGeneratedTable(table + 1);

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
      {generatedTable && (
        <Fragment>
          <div>Rangaistuksen saa pöytä</div>
          <Title style={{ margin: 10, fontSize: "10rem" }}>
            {generatedTable}
          </Title>
          <Button onClick={() => setHasGenerated(true)}>Arvo rangaistus</Button>
        </Fragment>
      )}
    </div>
  );
};

export default TableGenerator;
