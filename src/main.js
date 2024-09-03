import { k } from "./Loader";
import { Game } from "./scenes/Game";

k.scene('Game',()=> Game(k));

k.go('Game');
