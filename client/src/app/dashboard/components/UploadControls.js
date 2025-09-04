import UpButton from './UpButtons';

export default function UploadControls() {
  return (
    <div className="flex items-center space-x-4">
      <UpButton label = "Upload File" />
      <UpButton label = "Create Folder" />
    </div>
  );
}