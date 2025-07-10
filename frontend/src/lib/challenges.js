const challenges = [
  {
    text: "It's the hope of slaves sitting around a fire singing freedom songs; the hope of immigrants setting out for distant shores; the hope of a young naval lieutenant bravely patrolling the Mekong Delta; the hope of a millworker's son who dares to defy the odds; the hope of a skinny kid with a funny name who believes that America has a place for him, too. Hope - Hope in the face of difficulty. Hope in the face of uncertainty. The audacity of hope!",
    description: "Barack Obama's Keynote Address (2004)",
    title: "The Audacity of Hope",
  },
  {
    text: "And so, my fellow Americans: ask not what your country can do for you, ask what you can do for your country. My fellow citizens of the world: ask not what America will do for you, but what together we can do for the freedom of man...",
    description: "John F. Kennedy's Inaugural Address (1961)",
    title: "JFK's Inaugural Address",
  },
  {
    text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin but by the content of their character. I have a dream today!",
    description: "Martin Luther King Jr. - From 'I Have a Dream' speech (1963)",
    title: "I Have a Dream",
  },
  {
    text: "I'm gonna make him an offer he can't refuse. Now you just go outside and enjoy yourself, and ah, forget about all this nonsense. I want you to leave it all to me.",
    description: "The Godfather (1972)",
    title: "An Offer He Can't Refuse",
  },
  {
    text: "My mama always said, Life was like a box of chocolates; you never know what you're gonna get.",
    description: "Forest Gump (1994)",
    title: "Box of Chocolates",
  },
  {
    text: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer, the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them. To die - to sleep, No more.",
    description: "William Shakespeare - To be or not to be",
    title: "To be or Not To Be",
  },
  {
    text: "So, even though you have broken my heart yet again, I wanted to say, in another life, I would have really liked just doing laundry and taxes with you.",
    description: "Everything Everywhere All At Once (2022)",
    title: "Laundry and Taxes",
  },
  {
    text: "Out, damned spot, out, I say! One. Two. Why then, 'tis time to do 't. Hell is murky. Fie, my lord, fie, a soldier and afeard? What need we fear who knows it, when none can call our power to account? Yet who would have thought the old man to have had so much blood in him?",
    description: "Lady Macbeth - Macbeth Act 5 Scene 1",
    title: "Lady's Macbeth Guilt",
  },
  {
    text: "All that is gold does not glitter, not all those who wander are lost; the old that is strong does not wither, deep roots are not reached by the frost.",
    description:
      "J.R.R. Tolkien - The Riddle of Strider (Fellowship of the Ring)",
    title: "The Riddle of Strider",
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
    text: "I know what it's like to lose. To feel so desperately that you're right, yet to fail nonetheless. It's frightening. Turns the legs to jelly. I ask you, to what end? Dread it, run from it, destiny arrives all the same.",
    description: "Thanos - Avengers Infinity War (2018)",
    title: "Destiny Arrives All the Same",
  },
].map((challenge) => ({
  ...challenge,
  text: challenge.text + " ", // Append a space to the end of every challenge text -> TypeBox takes this extra space into account in order to end a game
}));

export default challenges;
