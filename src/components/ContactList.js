import React from "react";
import { useState } from "react";

// Import the array of the movie objects
import contacts from '../contacts.json';

function ContactList () {
    // Declare const to add a random card
    const [lastDisplayedIndex, setLastDisplayedIndex] = useState(5);
    // Declare const to sort by name and popularity
    const [displayedContacts, setContacts] = useState(contacts.slice(0, 5));

    
    // Function to add a new card
    function addRandomContact() {
        if (lastDisplayedIndex >= contacts.length) return;
        
        const randomIndex = Math.floor(Math.random() * (contacts.length - lastDisplayedIndex)) + lastDisplayedIndex;
        
        // Create a new array for displayed contacts and add the random contact
        const newContacts = [...displayedContacts, contacts[randomIndex]];
        
        setContacts(newContacts);
        setLastDisplayedIndex(prevIndex => prevIndex + 1);
    }

    // Function to sort contacts by name
    function sortByName() {
        setContacts((currentContacts) => 
            [...currentContacts].sort((a, b) => a.name.localeCompare(b.name))
        );
    }

    // Function to sort contacts by popularity
    function sortByPopularity() {
        setContacts((currentContacts) => 
        [...currentContacts].sort((a, b) => b.popularity - a.popularity)
        );
    }

    // Function to delete a contact
    function deleteContact(contactId) {
        const filteredContacts = displayedContacts.filter(contact => contact.id !== contactId);
        setContacts(filteredContacts);
    }

    return (
        <div className="table">
            <h2>Iron Contacts</h2>
            <button onClick={addRandomContact}>Add Random Contact</button>
            <button onClick={sortByName}>Sort by Name</button>
            <button onClick={sortByPopularity}>Sort by Popularity</button>
            <table>
                <thead>
                    <tr className="columnHead">
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Popularity</th>
                        <th>Won Oscar</th>
                        <th>Won Emmy</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedContacts.map(contact => (
                        <tr key={contact.id}>
                            <td>
                                <img src={contact.pictureUrl} alt={contact.name}/>
                            </td>
                            <td>{contact.name}</td>
                            <td>{contact.popularity.toFixed(1)}</td>
                            <td>
                                {contact.wonOscar ? <p>🏆</p> : <p>🙊</p>}
                            </td>
                            <td>
                                {contact.wonEmmy ? <p>🏆</p> : <p>🙊</p>}
                            </td>
                            <td>
                                <button onClick={() => deleteContact(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ContactList;