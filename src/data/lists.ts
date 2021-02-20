import { Certifications } from '../types/types';

export interface List {
  title: string;
  username: string; // TODO: create User type
  timestamp?: string;
  description?: string;
}

// TODO remove when we get more real data
export const randomSearchTerms: string[] = [
  'batman',
  'war',
  'superman',
  'spiderman',
  'space',
  'volcano',
  'music',
];

export const lists = (): List[] => {
  return [
    {
      title: 'Top 10 Action Movies',
      username: 'User A. Person',
      description:
        "You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man. – Samuel L. Jackson",
    },
    {
      title: 'Top 10 Drama Movies',
      username: 'User B. Person',
      description:
        "Normally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass. – Samuel L. Jackson",
    },
    {
      title: 'Top 10 SciFi Movies',
      username: 'User C. Person',
      description:
        "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing. – Samuel L. Jackson",
    },
  ];
};

export const mpaCertifications = (): Certifications[] => {
  return [
    {
      certification: 'R',
      meaning:
        'Under 17 requires accompanying parent or adult guardian 21 or older. The parent/guardian is required to stay with the child under 17 through the entire movie, even if the parent gives the child/teenager permission to see the film alone. These films may contain strong profanity, graphic sexuality, nudity, strong violence, horror, gore, and strong drug use. A movie rated R for profanity often has more severe or frequent language than the PG-13 rating would permit. An R-rated movie may have more blood, gore, drug use, nudity, or graphic sexuality than a PG-13 movie would admit.',
      order: 4,
    },
    {
      certification: 'PG',
      meaning:
        'Some material may not be suitable for children under 10. These films may contain some mild language, crude/suggestive humor, scary moments and/or violence. No drug content is present. There are a few exceptions to this rule. A few racial insults may also be heard.',
      order: 2,
    },
    {
      certification: 'NC-17',
      meaning:
        'These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens. NC-17 does not necessarily mean obscene or pornographic in the oft-accepted or legal meaning of those words.',
      order: 5,
    },
    {
      certification: 'G',
      meaning:
        'All ages admitted. There is no content that would be objectionable to most parents. This is one of only two ratings dating back to 1968 that still exists today.',
      order: 1,
    },
    { certification: 'NR', meaning: 'No rating information.', order: 0 },
    {
      certification: 'PG-13',
      meaning:
        'Some material may be inappropriate for children under 13. Films given this rating may contain sexual content, brief or partial nudity, some strong language and innuendo, humor, mature themes, political themes, terror and/or intense action violence. However, bloodshed is rarely present. This is the minimum rating at which drug content is present.',
      order: 3,
    },
  ].sort((a: Certifications, b: Certifications) =>
    a.order > b.order ? 1 : -1
  );
};
