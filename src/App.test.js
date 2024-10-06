import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notecard from './components/Notecard/Notecard'; 
import '@testing-library/jest-dom';

jest.mock('./utils/Api', () => ({
    archiveNotesByIdApi: jest.fn(),
    delNoteByIdApi: jest.fn(),
    trashNotesApiById: jest.fn(),
    updateNoteByIdApi: jest.fn(),
}));

describe('Notecard Component', () => {
    const mockUpdateList = jest.fn();
    const mockNoteDetails = {
        Title: 'Test Title',
        Description: 'Test Description',
        isArchived: false,
        isDeleted: false,
        Color: 'white',
    };

    beforeEach(() => {
        render(<Notecard noteDetails={mockNoteDetails} updateList={mockUpdateList} />);
    });

    test('renders the component with title and description', () => {
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    test('calls updateList when the delete icon is clicked', () => {
        const deleteButton = screen.getByText(/delete note/i); 
        fireEvent.click(deleteButton);

        expect(mockUpdateList).toHaveBeenCalledWith(mockNoteDetails, 'trash');
    });

    test('opens the modal when the note is clicked', () => {
        fireEvent.click(screen.getByText('Test Title'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    test('changes color when a color swatch is clicked', () => {
        const colorButton = screen.getByRole('button', { name: /color/i });
        fireEvent.click(colorButton);
        
        const colorSwatch = screen.getByText(/#faaFA8/i); 
        fireEvent.click(colorSwatch);

        expect(mockUpdateList).toHaveBeenCalledWith(expect.objectContaining({ Color: '#FAAFA8' }), 'color');
    });

    test('closes the menu when clicking outside', () => {
        const menuButton = screen.getByRole('button', { name: /more/i }); 
        fireEvent.click(menuButton);

        const closeButton = screen.getByText(/add label/i);
        fireEvent.click(closeButton);

        expect(menuButton).not.toBeVisible();
    });
});
