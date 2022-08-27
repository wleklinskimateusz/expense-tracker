import { majorScale, Table } from "evergreen-ui";
import React, { FC } from "react";

interface Data {
  [key: string]: string | number;
}

export const DataTable: FC<{ data: Data[] }> = ({ data }) => {
  if (data.length === 0) {
    return <>No Data</>;
  }
  return (
    <Table
      width={majorScale(Object.keys(data[0]).length * 15)}
      margin={majorScale(2)}
      padding={majorScale(2)}
    >
      <Table.Head>
        {Object.keys(data[0]).map((key, index) => (
          <Table.TextHeaderCell key={index}>{key}</Table.TextHeaderCell>
        ))}
      </Table.Head>
      <Table.Body height={240}>
        {data.map((row, index) => (
          <Table.Row key={index} isSelectable>
            {Object.values(row).map((value, index) => (
              <Table.TextCell key={index} isNumber={!isNaN(Number(value))}>
                {value}
              </Table.TextCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
