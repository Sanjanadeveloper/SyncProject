import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const DashboardFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="hover:text-blue-400" aria-label="Facebook"><Facebook /></a>
                    <a href="#" className="hover:text-blue-400" aria-label="Twitter"><Twitter /></a>
                    <a href="#" className="hover:text-blue-400" aria-label="LinkedIn"><Linkedin /></a>
                </div>
                <p>© {new Date().getFullYear()} SocialSync. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default DashboardFooter;