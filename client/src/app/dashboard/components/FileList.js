export default function FileList() {
  const files = [
    { id: 1, name: 'File1', type: 'document', size: '2.4 MB' },
    { id: 2, name: 'File2', type: 'image', size: '1.8 MB' },
    { id: 3, name: 'File3', type: 'document', size: '3.2 MB' },
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
    }
  };

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 hover:border-gray-600 transition-all cursor-pointer shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-purple-400">
                {getFileIcon(file.type)}
              </div>
              <div>
                <h3 className="text-white font-medium">{file.name}</h3>
                <p className="text-gray-400 text-sm">{file.size}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}