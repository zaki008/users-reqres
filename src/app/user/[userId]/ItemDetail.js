import { Box } from "@mui/material";
import styles from "./detail.module.css";

const ItemDetail = ({ label, fill }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: 2,
      }}
    >
      <span className={styles.label}>{label}</span>
      <span className={styles.fill}>{fill}</span>
    </Box>
  );
};

export default ItemDetail;
