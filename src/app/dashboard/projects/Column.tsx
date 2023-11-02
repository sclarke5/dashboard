import { Box, Paper } from "@mui/material";
import styles from './Projects.module.scss';

const Column = ({ isOver, children }: { isOver: boolean, children: any }) => {
  const className = isOver ? ' highlight-region' : '';

  return (
    <Box>
      <Paper sx={{ padding: '1rem 2rem', minHeight: '50vh' }} >
        <div className={`col${className}`}>
          {children}
        </div>
      </Paper>
    </Box>
  )
 }

 export { Column }