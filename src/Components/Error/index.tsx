import styles from "./Error.module.css";

interface Props {
  message: string;
}

function Error({ message }: Props) {
  return (
    <div className={styles.container}>
      <p>Error</p>
      <p>{message}</p>
    </div>
  );
}

export default Error;
