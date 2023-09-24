export const ProductCategories = {
  mainCategory: [
    {label: 'Alcoholic Beverages', value: 'Alcoholic Beverages'},
    {label: 'Beverages', value: 'Beverages'},
    {
      label: 'Condiments, Spices, Cooking Oils',
      value: 'Condiments, Spices, Cooking Oils',
    },
    {label: 'Dairy', value: 'Dairy'},
    {label: 'Grains, Noodles', value: 'Grains, Noodles'},
    {label: 'Wagyu Beef', value: 'Wagyu Beef'},
    {
      label: 'Proteins, Eggs, Vegetarian Meat',
      value: 'Proteins, Eggs, Vegetarian Meat',
    },
    {label: 'Seafood', value: 'Seafood'},
    {label: 'Dessert, Snacks, Sweets', value: 'Dessert, Snacks, Sweets'},
    {label: 'Vegetables, Fruits', value: 'Vegetables, Fruits'},
    {
      label: 'Ready to Eat / Cooked Products',
      value: 'Ready to Eat / Cooked Products',
    },
    {label: 'Kitchen Items', value: 'Kitchen Items'},
  ],

  subCategories: {
    'Alcoholic Beverages': [
      {label: 'Sake', value: 'Sake'},
      {label: 'Beer', value: 'Beer'},
      {label: 'Wine', value: 'Wine'},
      {label: 'Shochu', value: 'Shochu'},
      {label: 'Awamori', value: 'Awamori'},
      {label: 'Whiskey', value: 'Whiskey'},
      {label: 'Spirits', value: 'Spirits'},
      {label: 'Rock Ice, Ice', value: 'Rock Ice, Ice'},
    ],
    Beverages: [
      {
        label: 'Green Tea, Matcha, Hojicha',
        value: 'Green Tea, Matcha, Hojicha',
      },
      {label: 'Bottled Tea Beverages', value: 'Bottled Tea Beverages'},
      {label: 'Soft Drinks, Fruit Juices', value: 'Soft Drinks, Fruit Juices'},
      {label: 'Herbal Tea', value: 'Herbal Tea'},
    ],
    'Condiments, Spices, Cooking Oils': [
      {label: 'Seasonings, Dashi', value: 'Seasonings, Dashi'},
      {label: 'Dressing', value: 'Dressing'},
      {label: 'Cooking Oils', value: 'Cooking Oils'},
      {label: 'Spices', value: 'Spices'},
      {label: 'Soy Sauce', value: 'Soy Sauce'},
      {
        label: 'BBQ Sauce, Asian Sauce, Dipping Sauce',
        value: 'BBQ Sauce, Asian Sauce, Dipping Sauce',
      },
      {label: 'Vinegar', value: 'Vinegar'},
    ],
    Dairy: [
      {label: 'Yogurt', value: 'Yogurt'},
      {label: 'Creme', value: 'Creme'},
      {label: 'Butter', value: 'Butter'},
      {label: 'Margarine', value: 'Margarine'},
      {label: 'Milk', value: 'Milk'},
    ],
    'Grains, Noodles': [
      {label: 'Rice', value: 'Rice'},
      {label: 'Grains', value: 'Grains'},
      {label: 'Ramen Noodles', value: 'Ramen Noodles'},
      {label: 'Udon Noodles', value: 'Udon Noodles'},
      {label: 'Soba Noodles', value: 'Soba Noodles'},
      {label: 'Noodles (Other)', value: 'Noodles (Other)'},
    ],
    'Wagyu Beef': [{label: 'Wagyu Beef', value: 'Wagyu Beef'}],
    'Proteins, Eggs, Vegetarian Meat': [
      {label: 'Processed Meat', value: 'Processed Meat'},
      {label: 'Soy Meat Alternatives', value: 'Soy Meat Alternatives'},
      {label: 'Meat Alternatives (Other)', value: 'Meat Alternatives (Other)'},
      {label: 'Eggs', value: 'Eggs'},
    ],
    Seafood: [
      {label: 'Fish', value: 'Fish'},
      {label: 'Shell Fish', value: 'Shell Fish'},
      {label: 'Processed Seafood', value: 'Processed Seafood'},
    ],
    'Dessert, Snacks, Sweets': [
      {label: 'Sweets', value: 'Sweets'},
      {label: 'Baked Goods', value: 'Baked Goods'},
      {label: 'Snacks', value: 'Snacks'},
      {label: 'Candy', value: 'Candy'},
      {label: 'Frozen Dessert', value: 'Frozen Dessert'},
    ],
    'Vegetables, Fruits': [
      {label: 'Vegetables', value: 'Vegetables'},
      {label: 'Processed Vegetables', value: 'Processed Vegetables'},
      {label: 'Fruits', value: 'Fruits'},
    ],
    'Ready to Eat / Cooked Products': [
      {label: 'Ready to Eat', value: 'Ready to Eat'},
      {label: 'Bento Box', value: 'Bento Box'},
      {label: 'Side Dishes', value: 'Side Dishes'},
      {
        label: 'Packed Steamed Rice, Rice Dish',
        value: 'Packed Steamed Rice, Rice Dish',
      },
      {label: 'Soup, Miso Soup', value: 'Soup, Miso Soup'},
    ],
    'Kitchen Items': [{label: 'Kitchen Items', value: 'Kitchen Items'}],
  },
};

export const SaleTarget = [
  {label: 'Retail', value: 'Retail'},
  {label: 'Wholesale', value: 'Wholesale'},
  {
    label: 'Both retail and wholesale',
    value: 'Both retail and wholesale',
  },
];

export const ShelfLifeUnit = [
  {label: 'Days', value: 'Days'},
  {label: 'Months', value: 'Months'},
  {label: 'Years', value: 'Years'},
];

export const StorageTemperature = [
  {label: 'Room Temperature', value: 'Room Temperature'},
  {label: 'Cool', value: 'Cool'},
  {label: 'Frozen', value: 'Frozen'},
];

export const ManfactureLocation = [
  {label: 'Hokkaido', value: 'Hokkaido'},
  {label: 'Aomori', value: 'Aomori'},
  {label: 'Iwate', value: 'Iwate'},
  {label: 'Miyagi', value: 'Miyagi'},
  {label: 'Akita', value: 'Akita'},
  {label: 'Yamagata', value: 'Yamagata'},
  {label: 'Fukushima', value: 'Fukushima'},
  {label: 'Ibaraki', value: 'Ibaraki'},
  {label: 'Tochigi', value: 'Tochigi'},
  {label: 'Gunma', value: 'Gunma'},
  {label: 'Saitama', value: 'Saitama'},
  {label: 'Chiba', value: 'Chiba'},
  {label: 'Tokyo', value: 'Tokyo'},
  {label: 'Kanagawa', value: 'Kanagawa'},
  {label: 'Niigata', value: 'Niigata'},
  {label: 'Toyama', value: 'Toyama'},
  {label: 'Ishikawa', value: 'Ishikawa'},
  {label: 'Fukui', value: 'Fukui'},
  {label: 'Yamanashi', value: 'Yamanashi'},
  {label: 'Nagano', value: 'Nagano'},
  {label: 'Gifu', value: 'Gifu'},
  {label: 'Shizuoka', value: 'Shizuoka'},
  {label: 'Aichi', value: 'Aichi'},
  {label: 'Mie', value: 'Mie'},
  {label: 'Shiga', value: 'Shiga'},
  {label: 'Kyoto', value: ''},
  {label: 'Kyoto', value: ''},
  {label: 'Osaka', value: 'Osaka'},
  {label: 'Hyogo', value: 'Hyogo'},
  {label: 'Nara', value: 'Nara'},
  {label: 'Wakayama', value: 'Wakayama'},
  {label: 'Tottori', value: 'Tottori'},
  {label: 'Shimane', value: 'Shimane'},
  {label: 'Okayama', value: 'Okayama'},
  {label: 'Hiroshima', value: 'Hiroshima'},
  {label: 'Yamaguchi', value: 'Yamaguchi'},
  {label: 'Tokushima', value: 'Tokushima'},
  {label: 'Kagawa', value: 'Kagawa'},
  {label: 'Ehime', value: 'Ehime'},
  {label: 'Kochi', value: 'Kochi'},
  {label: 'Fukuoka', value: 'Fukuoka'},
  {label: 'Saga', value: 'Saga'},
  {label: 'Nagasaki', value: 'Nagasaki'},
  {label: 'Kumamoto', value: 'Kumamoto'},
  {label: 'Oita', value: 'Oita'},
  {label: 'Miyazaki', value: 'Miyazaki'},
  {label: 'Kagoshima', value: 'Kagoshima'},
  {label: 'Okinawa', value: 'Okinawa'},
];

export const ContentWeightUnit = [
  {label: 'grams (g)', value: 'grams (g)'},
  {label: 'kilograms (kg)', value: 'kilograms (kg)'},
  {label: 'milliliters (ml)', value: 'milliliters (ml)'},
  {label: 'liters (l)', value: 'liters (l)'},
];

export const WeightUnit = [
  {label: 'grams (g)', value: 'grams (g)'},
  {label: 'kilograms (kg)', value: 'kilograms (kg)'},
];

export const DeliveryTimeUnit = [
  {label: 'Days', value: 'Days'},
  {label: 'Months', value: 'Months'},
];

export const OEMPossibility = [
  {label: 'Yes', value: 'Yes'},
  {
    label: 'Yes, as long as conditions are met',
    value: 'Yes, as long as conditions are met',
  },
  {label: 'No', value: 'No'},
];

export const YesNo = [
  {label: 'Yes', value: 'Yes'},
  {label: 'No', value: 'No'},
];
