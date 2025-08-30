import UploadButton from './UploadButton';
import CreateFolderButton from './CreateFolderButton';

export default function UploadControls() {
  return (
    <div className="flex items-center space-x-4">
      <UploadButton />
      <CreateFolderButton />
    </div>
  );
}