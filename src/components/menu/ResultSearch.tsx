import * as React from "react";
import { Menus } from "../menu/MenuList";
import { DataRequest as MenuDataState } from "../../types/types";

type Props = {
  dataMenu: MenuDataState[];
  searchTerm: string;
};

const ResultSearch: React.FC<Props> = (props: Props) => {
  const { dataMenu, searchTerm } = props;

  const doSearch = () => {
    const matchResult = dataMenu.filter((data, _) => {
      const exactName = data.name.trim().toLowerCase();

      return exactName.includes(searchTerm.trim().toLowerCase());
    });

    return matchResult;
  };

  const result = doSearch();

  return (
    <React.Suspense fallback={<p>Mencari...</p>}>
      <Menus data={result} />
    </React.Suspense>
  );
};

export default ResultSearch;
