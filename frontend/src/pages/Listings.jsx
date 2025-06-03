import { pets } from '../data/pets';

export default function Listings() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Adoptable Pets</h2>
      <div className="row">
        {pets.map(pet => (
          <div className="col-md-4 mb-4" key={pet.id}>
            <div className="card h-100">
              <img src={pet.image} className="card-img-top" alt={pet.name} />
              <div className="card-body">
                <h5 className="card-title">{pet.name}</h5>
                <p className="card-text">{pet.description}</p>
                <ul className="list-unstyled">
                  <li><strong>Breed:</strong> {pet.breed}</li>
                  <li><strong>Age:</strong> {pet.age}</li>
                  <li><strong>Location:</strong> {pet.location}</li>
                </ul>
                <a href="#" className="btn btn-primary mt-2">Contact to Adopt</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}