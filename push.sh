#!/bin/bash


# 1. Alle Änderungen sammeln
git add .

# 2. Den Benutzer nach einem Namen für den Commit fragen
echo "Wie soll dieser Commit heißen? (z.B. 'Level 1 fertig' oder 'Bugfix')"
read commit_message

# 3. Den Commit mit deinem Text ausführen
git commit -m "$commit_message"

# 4. Hochladen
git push origin main

echo "---------------------------------------"
echo "Fertig! 'El Pollo Loco' ist auf GitHub."