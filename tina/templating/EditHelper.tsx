import { IconButton } from "@radix-ui/themes";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { tinaField } from "tinacms/dist/react";
import styles from "./EditHelper.module.css";

export default (props: any) => {
  return (
    <IconButton
      color="blue"
      data-tina-field={tinaField(props.content ?? props)}
      radius="full"
      variant="soft"
      className={styles.editButton}
    >
      <MixerHorizontalIcon width="16" height="16" />
    </IconButton>
  );
};
