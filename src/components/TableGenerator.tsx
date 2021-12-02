import { Button, Center, Loader, Text, Title } from "@mantine/core";
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

const TableGenerator = ({ tables, setTables, setHasGenerated }: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedTable, setGeneratedTable] = useState<number | null>(null);

  const stopGenerating = () => {
    const table = generateTableNumber(tables);
    setTables(tables.filter((t) => table !== t));
    setGeneratedTable(table + 1);

    setIsGenerating(false);
  };

  useTimeout(stopGenerating, 5000);

  if (isGenerating)
    return (
      <Center style={{ flexDirection: "column" }}>
        <Loader size={160} />
        <Text style={{ fontSize: "4vw", marginTop: 10 }}>
          Arvotaan pöytää...
        </Text>
      </Center>
    );

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
          <Text style={{ margin: 10, fontSize: "6vw", textAlign: "center" }}>
            Rangaistuksen saa pöytäryhmä
          </Text>
          <Title style={{ margin: 10, fontSize: "12vw" }}>
            {generatedTable}
          </Title>
          <Button onClick={() => setHasGenerated(true)}>Arvo rangaistus</Button>
        </Fragment>
      )}
    </div>
  );
};

export default TableGenerator;
