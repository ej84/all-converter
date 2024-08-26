import React from "react";

const FileUploadButton = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };

  return (
    <div className="flex flex-col items-center">
      {/* 파일 업로드 버튼 */}
      <label
        htmlFor="file-upload"
        className="cursor-pointer px-32 py-8 rounded border-2 border-white"
      >
        <p className="p-3 relative right-28 bg-sky-500 hover:bg-sky-600 text-white rounded font-semibold">
          Upload File From Computer
        </p>
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUploadButton;
