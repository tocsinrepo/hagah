// Same ESV verses as the web app (index.html). Keep the two lists in sync when adding verses.
// Scripture quotations are from the ESV Bible, (c) 2001 by Crossway. Used by permission. All rights reserved.
export const TOPICS = [
  { id:"purity", name:"Purity", line:"A clean heart before God", verses:[
    {ref:"Psalm 119:9", text:"How can a young man keep his way pure? By guarding it according to your word.", blank:"word", wrong:["strength","plan"]},
    {ref:"Psalm 51:10", text:"Create in me a clean heart, O God, and renew a right spirit within me.", blank:"clean", wrong:["brave","strong"]},
    {ref:"Matthew 5:8", text:"Blessed are the pure in heart, for they shall see God.", blank:"see", wrong:["serve","seek"]}
  ], doer:["Turn away from one thing that pulls my eyes or mind","Fill a quiet moment today with this verse instead of my phone","Confess one hidden thing to God honestly"],
     prayer:"Ask God to make your heart clean and keep your way pure." },
  { id:"wisdom", name:"Wisdom", line:"Fearing the Lord, asking for wisdom", verses:[
    {ref:"Proverbs 9:10", text:"The fear of the LORD is the beginning of wisdom.", blank:"beginning", wrong:["reward","end"]},
    {ref:"James 1:5", text:"If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him.", blank:"generously", wrong:["slowly","rarely"]},
    {ref:"Proverbs 3:5", text:"Trust in the LORD with all your heart, and do not lean on your own understanding.", blank:"understanding", wrong:["strength","friends"]}
  ], doer:["Ask God for wisdom before one decision today","Wait and listen before I give my opinion","Seek counsel from one godly person this week"],
     prayer:"Ask God for wisdom in one real decision you're facing." },
  { id:"peace", name:"Peace", line:"A mind stayed on Him", verses:[
    {ref:"John 14:27", text:"Peace I leave with you; my peace I give to you.", blank:"give", wrong:["owe","lend"]},
    {ref:"Isaiah 26:3", text:"You keep him in perfect peace whose mind is stayed on you, because he trusts in you.", blank:"trusts", wrong:["works","waits"]},
    {ref:"Philippians 4:7", text:"And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.", blank:"guard", wrong:["test","fill"]}
  ], doer:["Hand one worry to God in prayer and leave it there","Be a peacemaker in one tense conversation","Take five quiet minutes with this verse before bed"],
     prayer:"Give God the thing that's worrying you most right now." },
  { id:"love", name:"Love", line:"Loved first, so we love", verses:[
    {ref:"1 John 4:19", text:"We love because he first loved us.", blank:"first", wrong:["always","once"]},
    {ref:"John 15:12", text:"This is my commandment, that you love one another as I have loved you.", blank:"commandment", wrong:["suggestion","reward"]},
    {ref:"1 Corinthians 13:4", text:"Love is patient and kind.", blank:"patient", wrong:["proud","quick"]}
  ], doer:["Do one kind thing for someone who can't repay me","Be patient with the person who tests me most today","Tell someone I love them and mean it"],
     prayer:"Thank God for loving you first, and ask Him to love someone through you." },
  { id:"faithfulness", name:"Faithfulness", line:"He is faithful, so we can be", verses:[
    {ref:"Lamentations 3:23", text:"They are new every morning; great is your faithfulness.", blank:"morning", wrong:["year","season"]},
    {ref:"2 Timothy 2:13", text:"If we are faithless, he remains faithful—for he cannot deny himself.", blank:"faithful", wrong:["silent","distant"]},
    {ref:"1 Corinthians 4:2", text:"Moreover, it is required of stewards that they be found faithful.", blank:"faithful", wrong:["famous","busy"]}
  ], doer:["Keep one small promise I made","Do one ordinary task well, as for the Lord","Show up for someone who's counting on me"],
     prayer:"Thank God for His faithfulness and ask Him to make you faithful in small things." },
  { id:"patience", name:"Patience", line:"Waiting on the Lord", locked:true, verses:[
    {ref:"Psalm 37:7", text:"Be still before the LORD and wait patiently for him.", blank:"patiently", wrong:["quickly","alone"]},
    {ref:"James 1:19", text:"Let every person be quick to hear, slow to speak, slow to anger.", blank:"hear", wrong:["speak","judge"]},
    {ref:"Romans 12:12", text:"Rejoice in hope, be patient in tribulation, be constant in prayer.", blank:"tribulation", wrong:["comfort","success"]}
  ], doer:["Listen fully before I answer today","Let one delay go without complaining","Wait on God in one thing instead of forcing it"],
     prayer:"Ask God for patience in the place you feel most rushed." },
  { id:"delight", name:"Delight", line:"Sweeter than honey", locked:true, verses:[
    {ref:"Psalm 1:2", text:"His delight is in the law of the LORD, and on his law he meditates day and night.", blank:"meditates", wrong:["argues","worries"]},
    {ref:"Psalm 119:16", text:"I will delight in your statutes; I will not forget your word.", blank:"forget", wrong:["question","outgrow"]},
    {ref:"Psalm 119:103", text:"How sweet are your words to my taste, sweeter than honey to my mouth!", blank:"honey", wrong:["gold","wine"]}
  ], doer:["Come back to this verse three times today","Read one more psalm slowly tonight","Share what I'm enjoying in Scripture with someone"],
     prayer:"Ask God to make His word sweet to you again." }
];
