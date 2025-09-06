const router = require('next/router');
import { useRouter } from 'next/navigation';
export default function Sidebar() {
  const router = useRouter();
  const navItems = [
    { name: 'Folder', active: true },
    { name: 'Files', active: false },
    { name: 'Starred', active: false },
    { name: 'Trash', active: false },
  ];

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/signin');
  };

  return (
    <div className="w-64 bg-black border-r border-gray-800 flex flex-col">
      {/* Sidebar Content */}
      <div className="flex-1 py-6">
        <nav className="space-y-2 px-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                item.active
                  ? 'bg-gray-800 text-white border border-gray-700'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-gray-800">
        <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
}