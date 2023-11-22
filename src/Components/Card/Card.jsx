import styles from "./Card.module.scss";

const Card = ({ CardClass, children }) => {
  return <div className={`${styles.card} ${CardClass}`}>{children}</div>;
};

export default Card;
