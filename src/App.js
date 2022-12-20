import './App.css';
import {useState} from "react";


function App() {
    const randomCelebs = [
        'Boris Johnson', 'Bobby Kennedy', 'Madonna', 'Anne Robinson', 'Heather Small',
        'Dave Gorman', 'Donald Trump', 'Liz Truss', 'Lenin', 'Rasputin', 'Henry VIII',
        'Barbara Dickson', 'Hamza Yassim', 'Matt Hancock', 'Katy Perry','Justin Bieber','Taylor Swift','Rihanna','Lady Gaga', 'Justin Timberlake','Ellen DeGeneres',
        'Britney Spears','Cristiano Ronaldo','Kim Kardashian West','Justin Bieber','Taylor Swift','Selena Gomez','Jennifer Lopez','Ariana Grande','Oprah Winfrey','Harry Styles','Bill Gates',
        'Bruno Mars','Adele','Miley Ray Cyrus','Alicia Keys','Neymar','Emma Watson','Avril Lavigne','Mariah Carey','Ed Sheeran','Christina Aguilera','Jim Carrey','Aamir Khan',
        'Beyonce Knowles','Paris Hilton','Ricky Martin','Simon Cowell','Wayne Rooney','Kylie Jenner','Stephen Fry','Charlie Sheen','Andres Iniesta','Russell Brand','Tom Hanks','Ricky Gervais',
        'Victoria Beckham','Rafa Nadal','Gareth Bale','Simon Pegg','Calvin Harris','Richard Branson','Steve Martin','Fearne Cotton','Rio Ferdinand','Floyd Mayweather','Holly Willoughby','Hugh Jackman',
        'Sergio Ramos','J.K. Rowling','Luis Suarez','Robert Downey Jr','Jimmy Carr','Tom Cruise','Serena Williams','Jeremy Clarkson','Demi Moore','Samuel L Jackson','Alan Sugar','Yoko Ono',
        'David De Gea','John Cleese','Gary Lineker','Shane Warne','kylie minogue','Robbie Williams','Tom Hiddleston','Ian Rush',
        'Richard Nixon', 'Gene Kelly', 'Sean Connery', 'Elizabeth Taylor', 'Frank Sinatra', 'Nelson Mandela', 'Margaret Thatcher',
        'Neil Armstrong', 'Alan Turing', 'Albert Einstein', 'Charlie Chaplin', 'David Bowie', 'Emmeline Pankhurst', 'Gandhi', 'Muhammad Ali', 'Pele',
        'Picasso', 'Alfred Hitchcock', 'Andy Warhol'
    ]
    const [names, setNames] = useState([])
    const [currentName, setCurrentName] = useState('');
    const [showNames, setShowNames] = useState(false);
    const [message, setMessage] = useState();

    function setMessageFor(text) {
        setMessage(text)
        setTimeout(() => {
            setMessage(null)
        }, 1500)
    }

    function addName() {
        setNames([...names, currentName.toLowerCase()]);
        setCurrentName('')
        setMessageFor(<div>Named added, pass to next player</div>);
    }

    const handleChange = (event) => {
        setCurrentName(event.target.value);
    };

    function clearAll() {
        setNames([]);
        setCurrentName('');
        setMessageFor(<div>New game</div>)
    }

    function addRandom() {
        function newRandomName() {
            const r = Math.random();
            return randomCelebs[Math.floor(randomCelebs.length * r)];
        }

        if (randomCelebs.every(n => names.includes(n))) {
            setMessageFor(<div>No more random names available</div>)
        } else {

            let ransomName = newRandomName();
            while (names.includes(ransomName)) {
                ransomName = newRandomName();
            }
            setNames([...names, ransomName.toLowerCase()]);
            setMessageFor(<div>Random named added</div>)
        }
    }

    function show() {
        const namesCopy = [...names]
        shuffleArray(namesCopy)
        setNames(namesCopy)
        setShowNames(true)
    }

    function hide() {
        setShowNames(false)
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <div>
                        <label>Add a famous name</label>

                    </div>
                    <input type="text" id="name" name="add-name"  minLength="4" required="true"  size="20" onChange={handleChange} value={currentName}/>
                    <input type="button" value="add" onClick={addName}/>
                </div>
                <div>
                    {message}
                </div>
                <div>
                    <input type="button" value="add random" onClick={addRandom}/>
                    <input type="button" value="show names" onClick={show}/>
                    <input type="button" value="hide names" onClick={hide}/>
                    <input type="button" value="start new game" onClick={clearAll}/>
                </div>

                <div id="names">
                    {showNames && <ul>
                        {names.map(n => <li key={n}>{n}</li>)}
                    </ul>}
                </div>
            </header>
            <div>
                <p>Rules:
                    <ul>
                        <li>Pass the phone to each player - they should choose a famous person, type it in, and
                            click add
                        </li>
                        <li>Once all players have added their famous name, someone will click show names and read the
                            names aloud <em>twice</em></li>
                        <li>They should then click hide names</li>
                        <li>Play starts with the youngest player, they ask another player if they are a name they
                            remember from the list
                        </li>
                        <li>if they are right, the person must say yes. They now become a member of the asker's team.
                            Their job now is to help that player win
                        </li>
                        <li>if they are wrong, play passes to the player wrongly accused</li>
                        <li>if you guess the identity of someone with a team the whole team joins your team</li>
                        <li>there is <em>one rule</em> about guessing: you must not guess the same name as the last persons guess - if you do you forfeit your go, and the play passes to the person you asked</li>
                        <li>you must also decide before playing whether bluffing is allowed - are you able to ask someone if they are your hidden identity</li>
                        <li>the game continues like this util all players identity has been revealed. Last person
                            identity is hidden wins
                        </li>
                    </ul>
                </p>
            </div>
        </div>
    );
}

export default App;
