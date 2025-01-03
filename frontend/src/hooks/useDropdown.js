import React, { useEffect, useRef, useState } from 'react'

function useDropdown() {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);  // Create a ref for the modal
    const buttonRef = useRef(null);  // Create a ref for the button

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const hideDropdown=()=>{
        setShowDropdown(false);
    }

    useEffect(() => {
        function handleClickOutside(event) {

            // Check if the click is outside the modal or the button
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setShowDropdown(false); // Close the modal on outside click
            }
        }

        if (showDropdown) {
            // Attach the event listener only when the modal is open
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            // Remove the event listener when the modal is closed
            document.removeEventListener("mousedown", handleClickOutside);
        }

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]); // Re-run effect when isModalOpen changes

  return ({showDropdown,dropdownRef,buttonRef,toggleDropdown,hideDropdown})
}

export default useDropdown