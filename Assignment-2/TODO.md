Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.

```js
[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $group: {
      _id: "$isActive",
      count: {
        $sum: 1,
      },
    },
  },
];
```

2. Find all users whose name includes `blake` case insensitive.

```js
[
  {
    $match: {
      name: { $regex: "blake", $options: "i" },
    },
  },
];
```

3. Find all males.

```js
[
  {
    $match: {
      gender: "male",
    },
  },
  {
    $group: {
      _id: "male",
      count: {
        $sum: 1,
      },
    },
  },
];
```

4. Find all active males.

```js
[
  {
    $match: {
      gender: "male",
      isActive: true,
    },
  },
  {
    $group: {
      _id: "$gender",
      count: {
        $sum: 1,
      },
    },
  },
];
```

5. Find all active females whose age is >= 25.

```js
[
  {
    $match: {
      gender: "female",
      isActive: true,
      age: { $gte: 25 },
    },
  },
  {
    $group: {
      _id: "$gender",
      count: {
        $sum: 1,
      },
    },
  },
];
```

6. Find all 40+ males with green eyecolor.

```js
[
  {
    $match: {
      gender: "male",
      eyeColor: "green",
      age: {
        $gt: 40,
      },
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        eyeColor: "$eyeColor",
      },
      count: {
        $sum: 1,
      },
    },
  },
];
```

7. Find all blue eyed men working in 'USA'.

```js
[
  {
    $match: {
      eyeColor: "blue",
      gender: "male",
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: {
        eyeColor: "$eyeColor",
        companyLocation: "$company.location.country",
      },
      count: {
        $sum: 1,
      },
    },
  },
];
```

8. Find all female working in Germany with green eyes and apple as favoriteFruit.

```js
[
  {
    $match: {
      gender: "female",
      eyeColor: "green",
      favoriteFruit: "apple",
      "company.location.country": "Germany",
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        eyeColor: "$eyeColor",
        favoriteFruit: "$favoriteFruit",
        companyLocation: "$company.location.country",
      },
      count: {
        $sum: 1,
      },
    },
  },
];
```

9. Count total male and females.

```js
[
  {
    $group: {
      _id: "$gender",
      count: { $sum: 1 },
    },
  },
];
```

10. Count all whose eyeColor is green.

```js
[
  {
    $match: {
      eyeColor: "green",
    },
  },
  {
    $group: {
      _id: "$eyeColor",
      count: { $sum: 1 },
    },
  },
];
```

11. Count all 20+ females who have brown eyes.

```js
[
  {
    $match: {
      gender: "female",
      eyeColor: "brown",
      age: { $gt: 20 },
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        eyeColor: "$eyeColor",
      },
      count: { $sum: 1 },
    },
  },
];
```

12. Count all occurences of all eyeColors. Something like:-

```
blue -> 30
brown -> 67
green -> 123
```

```js
[
  {
    $group: {
      _id: "$eyeColor",
      count: {
        $sum: 1,
      },
    },
  },
];
```

13. Count all females whose tags array include `amet` in it.

```js
[
  {
    $match: {
      gender: "female",
      tags: { $in: ["amet"] },
    },
  },
  {
    $group: {
      _id: "$gender",
      count: {
        $sum: 1,
      },
    },
  },
];
```

14. Find the average age of entire collection

```js
[
  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age",
      },
    },
  },
];
```

15. Find the average age of males and females i.e. group them by gender.

```js
[
  {
    $group: {
      _id: "$gender",
      averageAge: { $avg: "$age" },
    },
  },
];
```

16. Find the user with maximum age.

```js
[
  {
    $sort: {
      age: -1,
    },
  },
  {
    $limit: 1,
  },
];
```

17. Find the document with minimum age.

```js
[
  {
    $sort: {
      age: 1,
    },
  },
  {
    $limit: 1,
  },
];
```

18. Find the sum of ages of all males and females.
19. Group all males by their eyeColor.

```js
[
  {
    $match: {
      gender: "male",
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        eyeColor: "$eyeColor",
      },
    },
  },
];
```

20. group all 30+ females by their age.

```js
[
  {
    $match: {
      gender: "female",
      age: { $gt: 30 },
    },
  },
  {
    $group: {
      _id: { gender: "$gender", age: "$age" },
    },
  },
];
```

21. Group all 23+ males with blue eyes working in Germany.

```js
[
  {
    $match: {
      gender: "male",
      age: { $gt: 23 },
      "company.location.country": "Germany",
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        age: "$age",
        companyLocation: "$company.location.country",
      },
    },
  },
];
```

22. Group all by tag names i.e. use \$unwind since tags are array.

```js
[
  {
    $unwind: "$tags",
  },
  {
    $group: {
      _id: null,
      numberOfTags: { $sum: 1 },
    },
  },
];
```

23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

```js
[
  {
    $match: {
      gender: "male",
      registered: {
        $lt: new ISODate("2015-01-01"),
      },
    },
  },
  {
    $group: {
      _id: "$favoriteFruit",
      count: { $sum: 1 },
      users: { $push: "$name" },
    },
  },
];
```

24. Group all females by their favoriteFruit.

```js
[
  {
    $match: {
      gender: "female",
    },
  },
  {
    $group: {
      _id: {
        gender: "$gender",
        favoriteFruit: "$favoriteFruit",
      },
    },
  },
];
```

25. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

```js
[
  {
    $match: {
      gender: "female",
      favoriteFruit: "apple",
      eyeColor: "blue",
      "company.location.country": "USA",
    },
  },
  {
    $sort: {
      registered: -1,
    },
  },
];
```

26. Find all 18+ inactive men and return only the fields specified below in the below provided format

```
{
  name: "",
  email: '';
  identity: {
    eye: '',
    phone: '',
    location: ''
  }
}
```

```js
[
  {
    $match: {
      gender: "male",
      isActive: false,
      age: {
        $gt: 18,
      },
    },
  },
  {
    $project: {
      name: 1,
      email: "$company.email",
      identity: {
        eye: "$eyeColor",
        phone: "$company.phone",
        location: "$company.location",
      },
    },
  },
];
```
