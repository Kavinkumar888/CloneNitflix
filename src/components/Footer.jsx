import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-netflix-dark border-t border-white/5 mt-16 py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-netflix-gray text-sm mb-6">Questions? Call 1-800-STREAMFLIX</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            ['FAQ', 'Help Center', 'Account', 'Media Center'],
            ['Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use'],
            ['Privacy', 'Cookie Preferences', 'Corporate Info', 'Contact Us'],
            ['Speed Test', 'Legal Notices', 'Only on Streamflix'],
          ].map((col, i) => (
            <ul key={i} className="space-y-3">
              {col.map(item => (
                <li key={item}>
                  <a href="#" className="text-netflix-gray hover:text-white text-xs transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-netflix-gray text-xs">© 2024 Streamflix, Inc.</p>
          <span className="text-netflix-red font-black text-lg">STREAMFLIX</span>
        </div>
      </div>
    </footer>
  );
}
