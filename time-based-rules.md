---
permalink: /time-based-rules
---

[⬅ Back](/) 

# Using google calendar for time-based rules

We've been working around having time based rules in the sytem for years. Zones that are only active, prompts in the app are only available in the evening, <some other example> were all wishes the company wished very hard for, but engineers kept pushing it back. 
We had a problem this time, because we definitely wanted to have a prompt for driving under influence prevention available in the app. This is how we solved it.

___

Driving under influence is a problem with electric scooters, so we wanted to introduce a way to raise some awareness. Our designers created multiple prototypes and we selected the best one, but after interviewing the cities we found that they definitely didn't want any kind of awareness raising to be shown during the day. For probably the hundredth time, an engineer someone in the world (me) started having panic attacks because this problem was still not solved, but we had to find a way to do it this time.

We sat down to the drawing board and came up with some rules the local teams might think of:

- every day from 5pm to 11pm (sounds simple enough)
- friday to sunday all day (so we need to be able to define only some days, okay)
- friday to sunday, from 5pm to 11pm (so we need to be able to define only some times too, still sounds sensible)
- friday to sunday 10pm to 3am (is that friday 10pm-midnight, and saturday midnight-3am? are the daily rules overlapping?)
- friday to sunday, 10pm to 3am, except every second week add thursday too (do we need biweekly repetitions?)
- friday and saturday, 10pm to 3am, sunday 10pm to 1am only because next day people work (how many different rules is this???)
- friday to sunday, 10pm to 3am, except on May 11th in 2023 because the next day is a working day (do we need to make some set-intersection logic with rules????)
- August 20th 5pm to August 20th 5pm continuously since there's a festival (okay but during that do we still need the friday-sunday rule?)
- a single hour on a single saturday afternoon since there's a big match (what about all the other rules though???)

And I've created this list in the evening while writing this article, so you can imagine how large the imaginable space of these rules could be. From any time to any time, with any custom repetition and exclusions and extensions and YIKES.

For the first few examples, a specification where you define a time and a set of days could make sense (excuse the pseudo-YAML):

```
timeStart: 5pm
timeEnd: 11pm
days: fri, sat, sun
```

But what do you do with rules reaching over midnight? You could have multiple rules, and just go over all of them and see if one applies:

```
rules:
  - timeStart: 10pm
    timeEnd: 12am
    days: fri, sat, sun
  - timeStart: 12am
    timeEnd: 3am
    days: sat, sun, mon
```

This almost covers everything, so a single weeks repetition is enough. We still need to introduce exclusions and one-off extensions:

```
rules:
  - timeStart: 10pm
    timeEnd: 12am
    days: fri, sat, sun
  - timeStart: 12am
    timeEnd: 3am
    days: sat, sun, mon
  - timeStart: 12am
    timeEnd: 3am
    days: mon
    exclude: true
  - timeStart: 12am
    timeEnd: 3am
    date: 2023-05-11
```

(We also consider having timestamp ranges with some rule to repeat them, but then the repetition rules are what become super messy (repeat for 3 days, then skip 2) etc.)

We didn't even discuss the implementation, but you think about configuring this every time, and changing that configuration. This is where you start to really panic and invoke upon the might of the team's PM to ask cities to maybe please just be NORMAL (in your mental model) - but cities realllllly want to show a screen in the app for their football game.

There's one tool which handles this kind of time complexity really well: calendars. Just imagine it. You can create any kind of event length, with a lot of options to repeat them, do one-off exclusions on the repeated occurrences, do one-off events, have overlapping rules - it's all we ever wanted. Google Calendar provides a super nice UI to modify them, too.

___

google calendar export

service read (polling)

can handle traffic

separating ICAL creation and parsing

future plans

https://mamchenkov.net/wordpress/2017/11/21/rrule-will-make-you-hate-calendars/

 > Starting with the most basic rules of repeating every day, and going into complete insanity of repeating every other Thursday, starting from next week and until the beginning of next year every other month, RRULEs can drive even the calmest of people completely insane. 







