import Session from 'infra/database/Session';
import FilterOptions from 'interfaces/FilterOptions';
import SpeciesModel, { SpeciesFilter } from 'models/Species';

export default class SpeciesService {
  private session = new Session();
  private speciesModel = new SpeciesModel(this.session);

  getSpecies(filter: SpeciesFilter, options: FilterOptions) {
    return this.speciesModel.getSpecies(filter, options);
  }

  getSpeciesById(speciesId: number) {
    return this.speciesModel.getSpeciesById(speciesId);
  }
}