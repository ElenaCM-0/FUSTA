```mermaid
sequenceDiagram

participant browser
participant server

Note right of browser: A new note is created. 
The browser creates a new note with the current date and the given content <br>
The browser adds this note to the data it prints <br>
The browser repaints the page

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Note left of server: The server adds this note, with the given date, to its database

```