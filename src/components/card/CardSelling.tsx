import {
  makeStyles,
  tokens,
  shorthands,
  Text
} from "@fluentui/react-components";
import {
  Card,
  CardHeader,
  CardProps,
  Button,
  CardPreview
} from "@fluentui/react-components";
import {
  MoreHorizontalRegular,
  ReceiptMoneyRegular
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  main: {
    ...shorthands.gap("36px"),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap"
  },

  card: {
    width: "360px",
    maxWidth: "100%",
    height: "fit-content"
  },

  section: {
    width: "fit-content"
  },

  title: {
    ...shorthands.margin(0, 0, "12px")
  },

  horizontalCardImage: {
    width: "28px",
    height: "28px"
  },

  headerImage: {
    ...shorthands.borderRadius("4px"),
    maxWidth: "44px",
    maxHeight: "44px"
  },

  caption: {
    color: tokens.colorNeutralForeground3
  },

  text: {
    ...shorthands.margin(0)
  }
});

const CardSelling = (props: CardProps) => {
  const styles = useStyles();

  const {} = props;

  return (
    <Card
      className={styles.card}
      orientation='horizontal'
    >
      <CardPreview className={styles.horizontalCardImage}>
        <ReceiptMoneyRegular className='text-sm' />
      </CardPreview>

      <CardHeader
        header={<Text weight='semibold'>Penjualan</Text>}
        action={
          <Button
            appearance='transparent'
            icon={<MoreHorizontalRegular />}
            aria-label='More options'
          />
        }
      />
    </Card>
  );
};

export default CardSelling;
