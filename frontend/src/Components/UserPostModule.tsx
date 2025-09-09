import React, { useState } from "react"

interface UserPostModuleProps {
    text: string;
    expand: boolean;
    onToggle: () => void;
}
const UserPostModule: React.FC<UserPostModuleProps> = ({text, expand, onToggle}) => {
    return (
        <div 
          className="bg-white p-4 md:p-6 text-black flex rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={onToggle}
        >
            <p 
                className="flex-1"
                style={{
                    display: expand ? 'block' : '-webkit-box',
                    WebkitLineClamp: expand ? 'none' : 2,
                    WebkitBoxOrient: expand ? 'unset' : 'vertical',
                    overflow: expand ? 'visible' : 'hidden',
                    textOverflow: expand ? 'clip' : 'ellipsis'
                }}
            >
                {text}
            </p>
            <div className="mt-2 text-sm text-gray-500 text-right">
                {expand ? "Click to collapse" : "Click to expand"}
            </div>
        </div>
     );
};


 export default UserPostModule;