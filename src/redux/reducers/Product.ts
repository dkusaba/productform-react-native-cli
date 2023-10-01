import {createSlice} from '@reduxjs/toolkit';

export type Product = {
  id: number | string;
  name_en: string;
  name_jp: string;
  jan_code: string;
  category_1_main: string;
  category_1_sub: string;
  category_2_main: string;
  category_2_sub: string;
  intro_en: string;
  intro_jp: string;
  image1: string;
  image2: string;
  image_path_1: string;
  image_path_2: string;
  youtube_url: string;
  sale_for: string;
  specialty_diets: string | string[] | null | undefined;
  ingredients_en: string;
  ingredients_jp: string;
  allergens_en: string;
  allergens_jp: string;
  shelf_life: number | string;
  shelf_life_unit: string;
  storage_temperature: string;
  manufacture_location: string;
  width: number | string;
  depth: number | string;
  height: number | string;
  net_weight: number | string;
  net_weight_unit: string;
  weight: string;
  weight_unit: string;
  item_price: string;
  case_width: number | string;
  case_depth: number | string;
  case_height: number | string;
  total_weight: number | string;
  total_weight_unit: string;
  quantity_per_case: number | string;
  lead_time: number | string;
  lead_time_unit: string;
  minimum_order_quantity: number | string;
  oem_possibility: string;
  manufacturer_certification: string | string[] | null | undefined;
  product_certification: string | string[] | null | undefined;
  usa_importer: string;
  fda_id: string;
  duns_number: string;
  recipe: string;
  cooked: string;
  label_handling: string;
  import_experience: string;
};

export type ProductState = {
  items: Product[];
};

const initialState: ProductState = {
  items: [],
};

export const Product = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    updateProduct: (state, action) => {
      state.items.map((item, i) => {
        if (item.id === action.payload.id) {
          state.items[i] = action.payload;
        }
      });
    },
    setInitialProducts: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const {addProduct, updateProduct, setInitialProducts} = Product.actions;
export default Product.reducer;
