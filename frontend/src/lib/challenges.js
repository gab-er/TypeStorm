const challenges = [
  {
    text: "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena.",
    description:
      "Theodore Roosevelt - From his 'Man in the Arena' speech (1910)",
    title: "Man in the Arena",
  },
  {
    text: "We choose to go to the moon in this decade and do the other things, not because they are easy, but because they are hard, because that goal will serve to organize and measure the best of our energies and skills.",
    description:
      "John F. Kennedy - From his 'Moon Speech' at Rice University (1962)",
    title: "Moon Speech",
  },
  {
    text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today!",
    description: "Martin Luther King Jr. - From 'I Have a Dream' speech (1963)",
    title: "I Have a Dream",
  },
  {
    text: "It was times like these when I thought my father, who hated guns and had never been to any wars, was the bravest man who ever lived. He never retaliated, never armed himself, and never raised a hand in violence.",
    description: "Harper Lee - From 'To Kill a Mockingbird' (1960)",
    title: "True Bravery",
  },
  {
    text: "The world is very different now. For man holds in his mortal hands the power to abolish all forms of human poverty and all forms of human life. And yet the same revolutionary beliefs for which our forebears fought are still at issue around the globe.",
    description: "John F. Kennedy - From his Inaugural Address (1961)",
    title: "Inaugural Wisdom",
  },
  {
    text: "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. You're on your own. And you know what you know. And YOU are the one who'll decide where to go.",
    description: "Dr. Seuss - From 'Oh, The Places You'll Go!' (1990)",
    title: "Oh, The Places You'll Go!",
  },
  {
    text: "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move. Many races believe that it was created by some sort of god, though the Jatravartid people believe it was sneezed out.",
    description:
      "Douglas Adams - Opening lines from 'The Hitchhiker's Guide to the Galaxy' (1979)",
    title: "Hitchhiker's Opening",
  },
  {
    text: "We shall go on to the end, we shall fight in France, we shall fight on the seas and oceans, we shall fight with growing confidence and growing strength in the air, we shall defend our island, whatever the cost may be.",
    description:
      "Winston Churchill - From his 'We Shall Fight on the Beaches' speech (1940)",
    title: "We Shall Fight",
  },
  {
    text: "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest that I go to than I have ever known. These words are spoken by Sydney Carton as he faces the guillotine.",
    description:
      "Charles Dickens - Closing lines of 'A Tale of Two Cities' (1859)",
    title: "Tale of Two Cities",
  },
  {
    text: "All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.",
    description:
      "J.R.R. Tolkien - The Riddle of Strider (Fellowship of the Ring)",
    title: "Riddle of Strider",
  },
  {
    text: "It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to.",
    description: "J.R.R. Tolkien - Bilbo's advice (Fellowship of the Ring)",
    title: "Bilbo's Wisdom",
  },
  {
    text: "I will not say: do not weep; for not all tears are an evil. The story's end is but a grey rain-curtain turned all to silver glass, and then you see it: white shores, and beyond, a far green country.",
    description: "J.R.R. Tolkien - Gandalf's comfort (Return of the King)",
    title: "Gandalf's Farewell",
  },
  {
    text: "I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks.",
    description: "Walter White - Breaking Bad (Season 4, Episode 6)",
    title: "I Am The Danger",
  },
  {
    text: "I did it for me. I liked it. I was good at it. And I was really... I was alive.",
    description: "Walter White - Breaking Bad (Final Episode)",
    title: "Walter's Confession",
  },
  {
    text: "hello there",
    description: "test",
    title: "Test Greeting",
  },
  
].map((challenge) => ({
  ...challenge,
  text: challenge.text + " ", // Append a space to the end of every challenge text -> TypeBox takes this extra space into account in order to end a game
}));

export default challenges;
