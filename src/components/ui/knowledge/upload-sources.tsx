import PDFUploader from "./pdf-uploader";
import TextUploader from "./txt-uploader";

export default function KnowledgeBaseUploadSources() {
  return (
    <div className="mb-7">
      <p className="text-upper text-primary/50 text-xs font-bold tracking-wider uppercase">
        Add knowledge source
      </p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <PDFUploader />
        <TextUploader />
      </div>
    </div>
  );
}
