import { Box } from "@mui/material";

import { Document, Page } from "react-pdf";

type Props = {
  file: string;
  caption: string;
};

const FileMessage = (props: Props) => {
  const { file, caption } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <Document file={file}>
        <Page pageNumber={1} />
      </Document>
      <span>{caption}</span>
    </Box>
  );
};

export default FileMessage;
