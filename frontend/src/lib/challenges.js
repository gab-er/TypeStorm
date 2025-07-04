// const challenges = [
//   "I have a dream that one day every valley shall be exalted, every hill and mountain shall be made low, the rough places will be made plain, and the crooked places will be made straight; and the glory of the Lord shall be revealed, and all flesh shall see it together.",

//   "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness.",

//   "The only thing we have to fear is fear itself - nameless, unreasoning, unjustified terror which paralyzes needed efforts to convert retreat into advance. In every dark hour of our national life, a leadership of frankness and vigor has met with that understanding and support of the people themselves.",

//   "Success is not final, failure is not fatal: it is the courage to continue that counts. Never give in - never, never, never, never - in nothing, great or small, large or petty, never give in except to convictions of honor and good sense. Courage is rightly esteemed the first of human qualities.",

//   "That's one small step for a man, one giant leap for mankind. As we explore the unknown, we must remember how far we've come - from wooden rockets to space stations, from primitive tools to digital revolutions. Humanity's journey is driven by bold ideas and the courage to act on them.",

//   "You may encounter many defeats, but you must not be defeated. In fact, it may be necessary to encounter the defeats so you can know who you are, what you can rise from, and how you can still come out of it. Strength grows in moments when you think you can't go on.",

//   "Government of the people, by the people, for the people, shall not perish from the earth. These honored dead gave their lives that a nation might live. It is for us, the living, to be dedicated to the unfinished work they have thus far so nobly advanced.",

//   "All we have to decide is what to do with the time that is given us. Many that live deserve death. And some that die deserve life. Can you give it to them? Then do not be too eager to deal out death in judgment, even the very wise cannot see all ends.",
// ].map((challenge) => challenge + " "); // Append a space to the end of every challenge item -> TypeBox takes this extra space into account in order to end a game

const challenges = [
  {
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena.",
    description:
      "Theodore Roosevelt - From his 'Man in the Arena' speech (1910)",
  },
  {
    text: "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills.",
    description:
      "John F. Kennedy - From his 'Moon Speech' at Rice University (1962)",
  },
  {
    text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today!",
    description: "Martin Luther King Jr. - From 'I Have a Dream' speech (1963)",
  },
  {
    text: "It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived. He never retaliated, never armed himself, and never raised a hand in violence.",
    description: "Harper Lee - From 'To Kill a Mockingbird' (1960)",
  },
  {
    text: "The world is very different now. For man holds in his mortal hands the power to abolish all forms of human poverty and all forms of human life. And yet the same revolutionary beliefs for which our forebears fought are still at issue around the globe.",
    description: "John F. Kennedy - From his Inaugural Address (1961)",
  },
  {
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And YOU are the one who'll decide where to go.",
    description: "Dr. Seuss - From 'Oh, The Places You'll Go!' (1990)",
  },
  {
    text: "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move. Many races believe that it was created by some sort of god, though the Jatravartid people believe it was sneezed out.",
    description:
      "Douglas Adams - Opening lines from 'The Hitchhiker's Guide to the Galaxy' (1979)",
  },
  {
    text: "We shall go on to the end, we shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be.",
    description:
      "Winston Churchill - From his 'We Shall Fight on the Beaches' speech (1940)",
  },
  {
    text: "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest that I go to than I have ever known. These words are spoken by Sydney Carton as he faces the guillotine.",
    description:
      "Charles Dickens - Closing lines of 'A Tale of Two Cities' (1859)",
  },
  {
    text: "All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.",
    description:
      "J.R.R. Tolkien - The Riddle of Strider (Fellowship of the Ring)",
  },
  {
    text: "It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to.",
    description: "J.R.R. Tolkien - Bilbo's advice (Fellowship of the Ring)",
  },
  {
    text: "I will not say: do not weep; for not all tears are an evil. The story's end is but a grey rain-curtain turned all to silver glass, and then you see it: white shores, and beyond, a far green country.",
    description: "J.R.R. Tolkien - Gandalf's comfort (Return of the King)",
  },
].map((challenge) => ({
  text: challenge.text + " ", // Append a space to the end of every challenge text -> TypeBox takes this extra space into account in order to end a game
  description: challenge.description,
}));

export default challenges;
