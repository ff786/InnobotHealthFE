import React, { useState } from 'react';

function DropdownWithSearch({ options, onSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    // const formattedOptions = options.map(item => `${item.firstName} ${item.lastName}`);

    const filteredOptions = options.filter(option => {
        const formattedOption = `${option.firstName} ${option.lastName}`
        return formattedOption.toLowerCase().includes(searchTerm.toLowerCase())
    });

    const handleSelect = option => {
        onSelect(option);
        setIsOpen(false);
        setSearchTerm(option.firstName.concat(' ').concat(option.lastName));
    };

    const handleOpen = () => {
        setIsOpen(true);
        setSearchTerm('');
    }

    return (
        <div className="dropdown">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={handleOpen}
            />
            {isOpen && (
                <div className="dropdown-menu">
                    {filteredOptions.map((option, index) => (
                        <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleSelect(option)}
                        >
                            {option.firstName} {option.lastName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownWithSearch;
