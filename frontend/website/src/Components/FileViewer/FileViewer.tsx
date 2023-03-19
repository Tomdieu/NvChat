import React from "react";

type Props = {
  fileUrl: string;
  fileType: string;
};

const FileViewer = (props: Props) => {
  const { fileUrl, fileType } = props;

  return (
    <object
      data={fileUrl}
      type={fileType}
      width="100%"
      height="500px"
      aria-label="File Viewer"
    >
      <p>Sorry, your browser doesn't support embedded objects.</p>
    </object>
  );
};

export default FileViewer;
