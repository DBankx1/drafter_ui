import PDFUploader from "./pdf-uploader";

export default function KnowledgeBaseSources() {
  return (
    <div>
      <p className="text-upper text-primary/50 text-xs font-bold tracking-wider uppercase">
        Add knowledge source
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <PDFUploader />
      </div>
    </div>
  );
}
