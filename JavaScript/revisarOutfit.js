import { renderOutfit } from "./Save/revisarOutfit.js";
import { renderOutfitSummary } from "./Save/guardarOutfit.js";


export function loadPage () {
  renderOutfitSummary();
  renderOutfit();
}

loadPage();