import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';

import type {ProductScreenNavigationProp} from '../types/navigation';
import {horizontalScale, verticalScale, scaleFontSize} from '../util/scaling';
import {Colors} from '../constants/colors';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import {
  ManfactureLocation,
  ContentWeightUnit,
  ProductCategories,
  SaleTarget,
  ShelfLifeUnit,
  StorageTemperature,
  WeightUnit,
  DeliveryTimeUnit,
} from '../constants/product-options';

function Product(): JSX.Element {
  const ProductSchema = Yup.object().shape({
    name_en: Yup.string().required('Please enter above field'),
    name_jp: Yup.string().required('Please enter above field'),
    jan_code: Yup.string().required('Please enter above field'),
    category_1_main: Yup.string().required('Please enter above field'),
    category_1_sub: Yup.string().required('Please enter above field'),
    category_2_main: Yup.string().required('Please enter above field'),
    category_2_sub: Yup.string().required('Please enter above field'),
    intro_en: Yup.string().required('Please enter above field'),
    intro_jp: Yup.string().required('Please enter above field'),
    image_path_1: Yup.string().required('Please enter above field'),
    image_path_2: Yup.string().required('Please enter above field'),
    youtube_url: Yup.string().required('Please enter above field'),
    sale_for: Yup.string().required('Please enter above field'),
    specialty_diets: Yup.string().required('Please enter above field'),
    ingredients_en: Yup.string().required('Please enter above field'),
    ingredients_jp: Yup.string().required('Please enter above field'),
    allergens_en: Yup.string().required('Please enter above field'),
    allergens_jp: Yup.string().required('Please enter above field'),
    shelf_life: Yup.string().required('Please enter above field'),
    shelf_life_unit: Yup.string().required('Please enter above field'),
    storage_temperature: Yup.string().required('Please enter above field'),
    manufacture_location: Yup.string().required('Please enter above field'),
    width: Yup.string().required('Please enter above field'),
    depth: Yup.string().required('Please enter above field'),
    height: Yup.string().required('Please enter above field'),
    net_weight: Yup.string().required('Please enter above field'),
    net_weight_unit: Yup.string().required('Please enter above field'),
    weight: Yup.string().required('Please enter above field'),
    weight_unit: Yup.string().required('Please enter above field'),
    item_price: Yup.string().required('Please enter above field'),
    case_width: Yup.string().required('Please enter above field'),
    case_depth: Yup.string().required('Please enter above field'),
    case_height: Yup.string().required('Please enter above field'),
    total_weight: Yup.string().required('Please enter above field'),
    total_weight_unit: Yup.string().required('Please enter above field'),
    quantity_per_case: Yup.string().required('Please enter above field'),
    lead_time: Yup.string().required('Please enter above field'),
    lead_time_unit: Yup.string().required('Please enter above field'),
    minimum_order_quantity: Yup.string().required('Please enter above field'),
    oem_possibility: Yup.string().required('Please enter above field'),
    manufacturer_certification: Yup.string().required(
      'Please enter above field',
    ),
    product_certification: Yup.string().required('Please enter above field'),
    usa_importer: Yup.string().required('Please enter above field'),
    fda_id: Yup.string().required('Please enter above field'),
    duns_number: Yup.string().required('Please enter above field'),
    recipe: Yup.string().required('Please enter above field'),
    cooked: Yup.string().required('Please enter above field'),
    label_handling: Yup.string().required('Please enter above field'),
    import_experience: Yup.string().required('Please enter above field'),
    sent: Yup.string().required('Please enter above field'),
    user_id: Yup.string().required('Please enter above field'),
  });

  const mainCategory = ProductCategories.mainCategory;
  const subCategories: any = ProductCategories.subCategories;
  const navigation = useNavigation<ProductScreenNavigationProp>();

  const [mainCategory1, setMainCategory1] = useState('');
  const [subCategory1, setSubCategory1] = useState('');
  const [mainCategory2, setMainCategory2] = useState('');
  const [subCategory2, setSubCategory2] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Formik
            initialValues={{
              name_en: '',
              name_jp: '',
              jan_code: '',
              category_1_main: '',
              category_1_sub: '',
              category_2_main: '',
              category_2_sub: '',
              intro_en: '',
              intro_jp: '',
              image_path_1: '',
              image_path_2: '',
              youtube_url: '',
              sale_for: '',
              specialty_diets: '',
              ingredients_en: '',
              ingredients_jp: '',
              allergens_en: '',
              allergens_jp: '',
              shelf_life: '',
              shelf_life_unit: '',
              storage_temperature: '',
              manufacture_location: '',
              width: '',
              depth: '',
              height: '',
              net_weight: '',
              net_weight_unit: '',
              weight: '',
              weight_unit: '',
              item_price: '',
              case_width: '',
              case_depth: '',
              case_height: '',
              total_weight: '',
              total_weight_unit: '',
              quantity_per_case: '',
              lead_time: '',
              lead_time_unit: '',
              minimum_order_quantity: '',
              oem_possibility: '',
              manufacturer_certification: '',
              product_certification: '',
              usa_importer: '',
              fda_id: '',
              duns_number: '',
              recipe: '',
              cooked: '',
              label_handling: '',
              import_experience: '',
              sent: '',
              user_id: '',
            }}
            validationSchema={ProductSchema}
            onSubmit={() => {}}>
            {({
              values,
              touched,
              errors,
              setFieldTouched,
              setFieldValue,
              handleChange,
              handleSubmit,
              isValid,
            }) => (
              <>
                <Header type={1}>Product Information</Header>
                <Text style={styles.instructions}>
                  Fields labeled (Japanese) are not forced. You may enter
                  English instead.
                </Text>
                <Input
                  value={values.name_en}
                  label={'Product Name'}
                  onBlur={() => setFieldTouched('name_en')}
                  onChangeText={handleChange('name_en')}
                />
                {touched.name_en && errors.name_en && (
                  <Text style={styles.errorText}>{errors.name_en}</Text>
                )}
                <Input
                  value={values.name_jp}
                  label={'Product Name (Japanese)'}
                  onBlur={() => setFieldTouched('name_jp')}
                  onChangeText={handleChange('name_jp')}
                />
                {touched.name_jp && errors.name_jp && (
                  <Text style={styles.errorText}>{errors.name_jp}</Text>
                )}
                <Input
                  value={values.jan_code}
                  label={'JAN Code'}
                  onBlur={() => setFieldTouched('jan_code')}
                  onChangeText={handleChange('jan_code')}
                />
                {touched.jan_code && errors.jan_code && (
                  <Text style={styles.errorText}>{errors.jan_code}</Text>
                )}
                <Text style={styles.label}>Main Category 1</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={mainCategory}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('category_1_main')}
                  onChange={item => {
                    setMainCategory1(item.value);
                    setFieldValue('category_1_main', item.value);
                  }}
                />
                {mainCategory1 && (
                  <>
                    <Text style={styles.label}>Sub Category 1</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={subCategories[mainCategory1]}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('category_1_sub')}
                      onChange={item => {
                        setSubCategory1(item.value);
                        setFieldValue('category_1_sub', item.value);
                      }}
                    />
                  </>
                )}
                <Text style={styles.label}>Main Category 2</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={mainCategory}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onChange={item => {
                    setMainCategory2(item.value);
                    setFieldValue('category_2_main', item.value);
                  }}
                />
                {mainCategory2 && (
                  <>
                    <Text style={styles.label}>Sub Category 2</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={subCategories[mainCategory2]}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onChange={item => {
                        setSubCategory2(item.value);
                        setFieldValue('category_2_sub', item.value);
                      }}
                    />
                  </>
                )}
                <Input
                  value={values.intro_en}
                  label={'Introduction'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_en')}
                  onChangeText={handleChange('intro_en')}
                />
                {touched.intro_en && errors.intro_en && (
                  <Text style={styles.errorText}>{errors.intro_en}</Text>
                )}
                <Input
                  value={values.intro_jp}
                  label={'Introduction (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('intro_jp')}
                  onChangeText={handleChange('intro_jp')}
                />
                {touched.intro_jp && errors.intro_jp && (
                  <Text style={styles.errorText}>{errors.intro_jp}</Text>
                )}
                {/* 
                image_path_1
                image_path_2
              */}
                <Input
                  value={values.jan_code}
                  label={'Introduction Video (YouTube URL)'}
                  onBlur={() => setFieldTouched('youtube_url')}
                  onChangeText={handleChange('youtube_url')}
                />
                {touched.youtube_url && errors.youtube_url && (
                  <Text style={styles.errorText}>{errors.youtube_url}</Text>
                )}
                <Text style={styles.label}>Sale Target</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={SaleTarget}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('sale_for')}
                  onChange={item => {
                    setFieldValue('sale_for', item.value);
                  }}
                />
                {/*
                specialty_diets
              */}
                <Input
                  value={values.ingredients_en}
                  label={'Ingredients'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_en')}
                  onChangeText={handleChange('ingredients_en')}
                />
                {touched.ingredients_en && errors.ingredients_en && (
                  <Text style={styles.errorText}>{errors.ingredients_en}</Text>
                )}
                <Input
                  value={values.ingredients_jp}
                  label={'Ingredients (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('ingredients_jp')}
                  onChangeText={handleChange('ingredients_jp')}
                />
                {touched.ingredients_jp && errors.ingredients_jp && (
                  <Text style={styles.errorText}>{errors.ingredients_jp}</Text>
                )}
                <Input
                  value={values.allergens_en}
                  label={'Allergens'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_en')}
                  onChangeText={handleChange('allergens_en')}
                />
                {touched.allergens_en && errors.allergens_en && (
                  <Text style={styles.errorText}>{errors.allergens_en}</Text>
                )}
                <Input
                  value={values.ingredients_jp}
                  label={'Allergens (Japanese)'}
                  multiline={true}
                  onBlur={() => setFieldTouched('allergens_jp')}
                  onChangeText={handleChange('allergens_jp')}
                />
                {touched.allergens_jp && errors.allergens_jp && (
                  <Text style={styles.errorText}>{errors.allergens_jp}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.shelf_life}
                      keyboardType={'numeric'}
                      label={'Shelf Life'}
                      onBlur={() => setFieldTouched('shelf_life')}
                      onChangeText={handleChange('shelf_life')}
                    />
                    {touched.shelf_life && errors.shelf_life && (
                      <Text style={styles.errorText}>{errors.shelf_life}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Shelf Life Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={ShelfLifeUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('shelf_life_unit')}
                      onChange={item => {
                        setFieldValue('shelf_life_unit', item.value);
                      }}
                    />
                    {touched.shelf_life_unit && errors.shelf_life_unit && (
                      <Text style={styles.errorText}>
                        {errors.shelf_life_unit}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.label}>Storage Temperature Range</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={StorageTemperature}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('storage_temperature')}
                  onChange={item => {
                    setFieldValue('storage_temperature', item.value);
                  }}
                />
                {touched.storage_temperature && errors.storage_temperature && (
                  <Text style={styles.errorText}>
                    {errors.storage_temperature}
                  </Text>
                )}
                <Text style={styles.label}>Manufacture Location</Text>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  itemTextStyle={styles.ddItemTextStyle}
                  data={ManfactureLocation}
                  search={false}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select item"
                  fontFamily={'Poppins'}
                  onBlur={() => setFieldTouched('manufacture_location')}
                  onChange={item => {
                    setFieldValue('manufacture_location', item.value);
                  }}
                />
                {touched.manufacture_location &&
                  errors.manufacture_location && (
                    <Text style={styles.errorText}>
                      {errors.manufacture_location}
                    </Text>
                  )}
                <Input
                  value={values.width}
                  label={'Width'}
                  onBlur={() => setFieldTouched('width')}
                  onChangeText={handleChange('width')}
                />
                {touched.width && errors.width && (
                  <Text style={styles.errorText}>{errors.width}</Text>
                )}
                <Input
                  value={values.depth}
                  label={'Depth'}
                  onBlur={() => setFieldTouched('depth')}
                  onChangeText={handleChange('depth')}
                />
                {touched.depth && errors.depth && (
                  <Text style={styles.errorText}>{errors.depth}</Text>
                )}
                <Input
                  value={values.height}
                  label={'Height'}
                  onBlur={() => setFieldTouched('height')}
                  onChangeText={handleChange('height')}
                />
                {touched.height && errors.height && (
                  <Text style={styles.errorText}>{errors.height}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.net_weight}
                      label={'Content Weight'}
                      keyboardType={'decimal-pad'}
                      onBlur={() => setFieldTouched('net_weight')}
                      onChangeText={handleChange('net_weight')}
                    />
                    {touched.net_weight && errors.net_weight && (
                      <Text style={styles.errorText}>{errors.net_weight}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Content Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={ContentWeightUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('net_weight_unit')}
                      onChange={item => {
                        setFieldValue('net_weight_unit', item.value);
                      }}
                    />
                    {touched.net_weight_unit && errors.net_weight_unit && (
                      <Text style={styles.errorText}>
                        {errors.net_weight_unit}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.weight}
                      label={'Weight'}
                      onBlur={() => setFieldTouched('weight')}
                      onChangeText={handleChange('weight')}
                    />
                    {touched.weight && errors.weight && (
                      <Text style={styles.errorText}>{errors.weight}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={WeightUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('weight_unit')}
                      onChange={item => {
                        setFieldValue('weight_unit', item.value);
                      }}
                    />
                    {touched.weight_unit && errors.weight_unit && (
                      <Text style={styles.errorText}>{errors.weight_unit}</Text>
                    )}
                  </View>
                </View>
                <Input
                  value={values.item_price}
                  label={'Item Price (Yen)'}
                  onBlur={() => setFieldTouched('item_price')}
                  onChangeText={handleChange('item_price')}
                />
                {touched.item_price && errors.item_price && (
                  <Text style={styles.errorText}>{errors.item_price}</Text>
                )}
                <Input
                  value={values.case_width}
                  label={'Case Width (centimeters)'}
                  onBlur={() => setFieldTouched('case_width')}
                  onChangeText={handleChange('case_width')}
                />
                {touched.case_width && errors.case_width && (
                  <Text style={styles.errorText}>{errors.case_width}</Text>
                )}
                <Input
                  value={values.case_depth}
                  label={'Case Depth (centimeters)'}
                  onBlur={() => setFieldTouched('case_depth')}
                  onChangeText={handleChange('case_depth')}
                />
                {touched.case_depth && errors.case_depth && (
                  <Text style={styles.errorText}>{errors.case_depth}</Text>
                )}
                <Input
                  value={values.case_height}
                  label={'Case Height (centimeters)'}
                  onBlur={() => setFieldTouched('case_height')}
                  onChangeText={handleChange('case_height')}
                />
                {touched.case_height && errors.case_height && (
                  <Text style={styles.errorText}>{errors.case_height}</Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.total_weight}
                      label={'Case Weight'}
                      onBlur={() => setFieldTouched('total_weight')}
                      onChangeText={handleChange('total_weight')}
                    />
                    {touched.total_weight && errors.total_weight && (
                      <Text style={styles.errorText}>
                        {errors.total_weight}
                      </Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Case Weight Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={WeightUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('total_weight_unit')}
                      onChange={item => {
                        setFieldValue('total_weight_unit', item.value);
                      }}
                    />
                    {touched.total_weight_unit && errors.total_weight_unit && (
                      <Text style={styles.errorText}>
                        {errors.total_weight_unit}
                      </Text>
                    )}
                  </View>
                </View>
                <Input
                  value={values.quantity_per_case}
                  label={'Quantity Per Case'}
                  onBlur={() => setFieldTouched('quantity_per_case')}
                  onChangeText={handleChange('quantity_per_case')}
                />
                {touched.quantity_per_case && errors.quantity_per_case && (
                  <Text style={styles.errorText}>
                    {errors.quantity_per_case}
                  </Text>
                )}
                <View style={styles.twoItems}>
                  <View style={styles.halfWidth}>
                    <Input
                      value={values.lead_time}
                      label={'Delivery Time'}
                      onBlur={() => setFieldTouched('lead_time')}
                      onChangeText={handleChange('lead_time')}
                    />
                    {touched.lead_time && errors.lead_time && (
                      <Text style={styles.errorText}>{errors.lead_time}</Text>
                    )}
                  </View>
                  <View style={styles.halfWidth}>
                    <Text style={styles.label}>Delivery Time Unit</Text>
                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      iconStyle={styles.iconStyle}
                      itemTextStyle={styles.ddItemTextStyle}
                      data={DeliveryTimeUnit}
                      search={false}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Select item"
                      fontFamily={'Poppins'}
                      onBlur={() => setFieldTouched('lead_time_unit')}
                      onChange={item => {
                        setFieldValue('lead_time_unit', item.value);
                      }}
                    />
                    {touched.lead_time_unit && errors.lead_time_unit && (
                      <Text style={styles.errorText}>
                        {errors.lead_time_unit}
                      </Text>
                    )}
                  </View>
                </View>
                <Input
                  value={values.minimum_order_quantity}
                  label={'Minimum order quantity'}
                  onBlur={() => setFieldTouched('minimum_order_quantity')}
                  onChangeText={handleChange('minimum_order_quantity')}
                />
                {touched.minimum_order_quantity &&
                  errors.minimum_order_quantity && (
                    <Text style={styles.errorText}>
                      {errors.minimum_order_quantity}
                    </Text>
                  )}
                {/* 
                oem_possibility
                manufacturer_certification
                product_certification
              */}
                <Input
                  value={values.usa_importer}
                  label={'Importer Name'}
                  onBlur={() => setFieldTouched('usa_importer')}
                  onChangeText={handleChange('usa_importer')}
                />
                {touched.usa_importer && errors.usa_importer && (
                  <Text style={styles.errorText}>{errors.usa_importer}</Text>
                )}
                <Input
                  value={values.fda_id}
                  label={'FDA Registration ID'}
                  onBlur={() => setFieldTouched('fda_id')}
                  onChangeText={handleChange('fda_id')}
                />
                {touched.fda_id && errors.fda_id && (
                  <Text style={styles.errorText}>{errors.fda_id}</Text>
                )}
                <Input
                  value={values.duns_number}
                  label={'D-U-N-S® Number'}
                  onBlur={() => setFieldTouched('duns_number')}
                  onChangeText={handleChange('duns_number')}
                />
                {touched.duns_number && errors.duns_number && (
                  <Text style={styles.errorText}>{errors.duns_number}</Text>
                )}
                {/* 
                recipe
                cooked
                label_handling
                import_experience
              */}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: horizontalScale(18),
    marginVertical: verticalScale(24),
  },
  companyProfileContainer: {
    marginTop: verticalScale(15),
  },
  userProfileContainer: {
    marginTop: verticalScale(15),
  },
  instructions: {
    marginVertical: verticalScale(14),
    fontFamily: 'Poppins',
    fontSize: scaleFontSize(14),
    color: Colors.grayPrimary,
  },
  label: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(5),
    fontFamily: 'Monteserrat',
    fontWeight: '600',
    fontSize: scaleFontSize(12),
    lineHeight: scaleFontSize(15),
    textTransform: 'uppercase',
    color: Colors.grayPrimary,
  },
  browse: {
    width: horizontalScale(150),
    padding: horizontalScale(10),
    backgroundColor: Colors.gray600,
    color: Colors.grayPrimary,
    borderRadius: horizontalScale(10),
    borderWidth: 1,
    borderColor: Colors.grayPrimary,
  },
  browseText: {
    color: Colors.grayPrimary,
    fontSize: scaleFontSize(14),
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  image: {
    marginTop: verticalScale(12),
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    fontFamily: 'Poppins',
    marginTop: verticalScale(3),
    color: '#f00',
  },
  dropdown: {
    padding: horizontalScale(5),
    height: verticalScale(30),
    borderColor: Colors.gray600,
    borderWidth: 1,
    borderRadius: horizontalScale(10),
  },
  ddItemTextStyle: {
    padding: 0,
    margin: 0,
    lineHeight: verticalScale(0),
    fontSize: scaleFontSize(14),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: scaleFontSize(14),
  },
  selectedTextStyle: {
    fontSize: scaleFontSize(14),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  twoItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '49%',
  },
});
