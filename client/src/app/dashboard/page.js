import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import UploadControls from './components/UploadControls';
import FolderList from './components/FolderList';
import FileList from './components/FileList';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <Topbar />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-900">
          {/* Upload Controls */}
          <div className="mb-8">
            <UploadControls />
          </div>
          
          {/* Folders Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Folders</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View all →
              </button>
            </div>
            <FolderList />
          </div>
          
          {/* Recent Files Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Recent Files</h2>
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View all →
              </button>
            </div>
            <FileList />
          </div>
        </main>
      </div>
    </div>
  );
}