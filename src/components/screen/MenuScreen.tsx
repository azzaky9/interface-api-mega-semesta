import * as React from "react";
import TableMenu from "../tables/TableMenu";
import ControlMenu from "../menu/ControlMenu";
import useModal from "../../hooks/useModal";
import Modal from "../modal/Modal";
import {
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  makeStyles
} from "@fluentui/react-components";
import NewMenuForm from "../forms/NewMenuForm";

export default function MenuScreen() {
  const modalUtils = useModal();

  const { handleOpen, isOpen, handleClose } = modalUtils;

  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value as string);
  };

  const controlMenuProps = {
    searchValue: search,
    handleSearch,
    handleOpen
  };

  return (
    <>
      <div className='flex flex-col gap-4 mx-5 mt-3'>
        <Modal
          isOpen={isOpen}
          dialogContent={<DialogContents closeHandler={handleClose} />}
          customSize='w-[360px]'
        />
        <ControlMenu {...controlMenuProps} />
        <TableMenu searchTerm={search} />
      </div>
    </>
  );
}

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px"
  }
});

type Props = {
  closeHandler: () => void;
};

const DialogContents = (props: Props) => {
  const { closeHandler } = props;

  const styles = useStyles();

  return (
    <DialogBody>
      <DialogTitle className='font-bold text-center'>NEW MENU</DialogTitle>
      <DialogContent className={styles.content}>
        <NewMenuForm handleClose={closeHandler} />
      </DialogContent>
      <DialogActions />
    </DialogBody>
  );
};
