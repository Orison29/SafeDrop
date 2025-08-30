export default function FolderList() {
  const folders = [
    { id: 1, name: 'Folder1' },
    { id: 2, name: 'Folder2' },
    { id: 3, name: 'Folder3' },
    { id: 4, name: 'Folder4' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:bg-gray-750 hover:border-gray-600 transition-all cursor-pointer shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center space-x-3">
            <div className="text-blue-400">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-white font-medium">{folder.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}