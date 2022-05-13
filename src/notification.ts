//Funktion, die nach Beenden des Spiels (also wenn alle identischen Karten aufgedeckt wurden) ein Pop-Up erzeugt. Dieses fragt den Spieler ob er noch einmal spielen möchte. Wenn er auf "OK" klickt, wird die Seite neu geladen und das Spiel damit resettet, bei Klick auf "Abbrechen" passiert nichts.
export function showPlayAgainAlert(): void {
    if (confirm("You won! Wanna play again?")) {
      location.reload();
    }
  }