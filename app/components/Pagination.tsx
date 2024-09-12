import { Button, Stack } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import styles from "../page.module.css";

interface PaginationProps {
  count: number;
  pages: number;
  current: number;
  onClick: (page: number) => void;
}

export default function Pagination({
  pages,
  current,
  onClick,
}: PaginationProps) {
  return (
    <div className="mb-3 p-3">
      <Stack direction="horizontal" className="justify-content-center">
        <Button
          variant="light"
          size="sm"
          onClick={() => onClick(current - 1)}
          disabled={current === 1}
          className={styles.noBorderRadius}
          title="prev"
        >
          <ChevronLeft size={14} />
        </Button>
        <span className={styles.currentPage}>{`${current}/${pages}`}</span>
        <Button
          variant="light"
          size="sm"
          onClick={() => onClick(current + 1)}
          disabled={current === pages}
          className={styles.noBorderRadius}
          title="next"
        >
          <ChevronRight size={14} />
        </Button>
      </Stack>
    </div>
  );
}
