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
            <p className={expand ? "" : "line-clamp-2"}>{text}</p>
        </div>
     );
};


 export default UserPostModule;