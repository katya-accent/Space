import Planet from './Planet';
import { render, screen } from '@testing-library/react';


describe('Planet component', () => {
    it('should display an image when correct planetName prop is passed', async () => {

        render(<Planet planetName="earth" />);

        const planetImage = screen.getByRole('img')
        expect(planetImage).toBeInTheDocument();
    })

    it('should display invalid planet when wrong planetName prop is passed.', async () => {

        render(<Planet planetName="badname" />);

        const invalidPlanetDiv = screen.getByText(/invalid planet/i);
        expect(invalidPlanetDiv).toBeInTheDocument();
    })
})
